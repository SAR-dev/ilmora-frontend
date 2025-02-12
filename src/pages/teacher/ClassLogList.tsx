import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import RoutineClassLog from 'components/RoutineClassLog';
import { TbTableDashed } from 'react-icons/tb';
import { useEffect, useMemo, useState } from 'react';
import { ClassLogDataType, StudentDataType } from 'types/response';
import { useSearchParams } from 'react-router';
import { constants } from 'constants';
import { api, getLocalTimezoneInfo } from 'helpers';
import { useLocalStorage } from 'usehooks-ts';
import { getDatesOfMonth } from './../../helpers';
import classNames from 'classnames';

const currentYear = new Date().getFullYear()

const getDateKey = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")}`
}

const ClassLogList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [studentList, setStudentList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [classLogs, setClassLogs] = useState<ClassLogDataType[]>([])

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth())

    const selectedStudent = useMemo(
        () => studentList.find(e => e.id == searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID)) ?? null
        , [searchParams, studentList]
    )

    const calendarDates = useMemo(
        () => [...getDatesOfMonth(year, month)]
        , [year, month]
    )

    const classLogsByDate = useMemo(() => {
        return classLogs.reduce<Record<string, ClassLogDataType[]>>((acc, log) => {
            const dateKey = getDateKey(log.startedAt);
            acc[dateKey] = [...acc[dateKey] || [], log]
            return acc;
        }, {});
    }, [classLogs]);

    const selectedClassLogs = useMemo(() => {
        if (!selectedDate) return [];
        const logs = classLogsByDate[getDateKey(selectedDate.toDateString())]
        if (logs?.length == 0) return [];
        return logs;
    }, [classLogsByDate, selectedDate])

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentList([...res.data]))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        api
            .post("/api/t/classLogs/month", {
                utcOffset: getLocalTimezoneInfo().offset,
                year,
                month,
                studentId: selectedStudent ? selectedStudent.id : ""
            })
            .then((res) => setClassLogs(res.data))
            .catch(() => setClassLogs([]))
            .finally(() => setIsLoading(false))
    }, [selectedStudent, year, month])

    const handleStudentIdChange = (studentId: string) => {
        setSearchParams({
            ...searchParams,
            [constants.SEARCH_PARAMS.STUDENT_ID]: studentId
        })
    }

    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<TbTableDashed className='size-5' />}
                    headerTitle='Student Class Plans'
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="grid grid-cols-1 gap-5 p-5">
                            <div className="grid grid-cols-4 gap-5">
                                <label className="form-control w-full flex flex-col col-span-4 md:col-span-2">
                                    <div className="label pb-2">
                                        <span className="label-text">Select Student</span>
                                    </div>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedStudent?.id ?? ""}
                                        onChange={e => handleStudentIdChange(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        {studentList.map((e, i) => (
                                            <option value={e.id} key={i}>{e.name}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-control max-w-sm flex flex-col col-span-2 md:col-span-1">
                                    <div className="label pb-2">
                                        <span className="label-text">Year</span>
                                    </div>
                                    <select
                                        className="select select-bordered"
                                        value={year}
                                        onChange={e => {
                                            setYear(Number(e.target.value))
                                            setSelectedDate(null)
                                        }}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option value={currentYear - 2 + i} key={i}>{currentYear - 2 + i}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-control max-w-sm flex flex-col col-span-2 md:col-span-1">
                                    <div className="label pb-2">
                                        <span className="label-text">Month</span>
                                    </div>
                                    <select
                                        className="select select-bordered"
                                        value={month}
                                        onChange={e => {
                                            setMonth(Number(e.target.value))
                                            setSelectedDate(null)
                                        }}
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <option value={i} key={i}>{constants.MONTHS[i]}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="card flex-col divide-y divide-base-300 border border-base-300">
                                <div className="flex flex-row divide-x divide-base-300 bg-base-200">
                                    {[...Array(7)].map((_, weekDayIndexFromSat) => (
                                        <div className="w-full h-12 text-sm font-semibold flex justify-center items-center uppercase" key={weekDayIndexFromSat}>
                                            {constants.DAY_NAMES[weekDayIndexFromSat].slice(0, 3)}
                                        </div>
                                    ))}
                                </div>
                                {calendarDates.map((week, i) => (
                                    <div className="flex flex-row divide-x divide-base-300" key={i}>
                                        {week.map((day, j) => (
                                            <button
                                                className={classNames("flex flex-col w-full h-20 cursor-pointer", {
                                                    "bg-primary text-primary-content": selectedDate?.toDateString() == new Date(year, month, day?.getDate()).toDateString()
                                                })}
                                                onClick={() => setSelectedDate(new Date(year, month, day?.getDate()))}
                                                key={j}
                                            >
                                                <div className="p-2">
                                                    {day?.getDate()}
                                                </div>
                                                {day && classLogsByDate[getDateKey(day.toDateString())]?.length > 0 && (
                                                    <div className='flex justify-center w-full'>
                                                        <div className="h-6 w-6 flex justify-center items-center rounded-full bg-info text-info-content">
                                                            {classLogsByDate[getDateKey(day.toDateString())].length}
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card divide-y divide-base-300 h-[40.2rem] w-full mx-5 lg:mx-0 border lg:border-t-0 border-base-300 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-5">
                                    <div className="flex gap-2">
                                        <span className="loading loading-dots loading-xs" />
                                        Fetching Data
                                        <span className="loading loading-dots loading-xs" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {selectedClassLogs.map((e, i) => (
                                        <RoutineClassLog data={e} key={i} />
                                    ))}
                                    {selectedClassLogs.length == 0 && (
                                        <div className="p-5">
                                            No Class found
                                        </div>
                                    )}
                                    <hr className='text-base-300' />
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogList