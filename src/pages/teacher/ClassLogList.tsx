import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import RoutineClassLog from 'components/RoutineClassLog';
import { TbTableDashed } from 'react-icons/tb';
import { useEffect, useMemo, useState } from 'react';
import { ClassLogDataType, StudentDataType } from 'types/response';
import { useSearchParams } from 'react-router';
import { constants } from 'constants';
import { api, getLocalTimezoneInfo, onlyDateViewFormatter, weekdayViewFormatter } from 'helpers';
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
    const [routineViewType, setRoutineViewType] = useLocalStorage<string>(constants.ROUTINE_VIEW_KEY, constants.ROUTINE_VIEWS.CALENDAR)
    const [studentRoutineList, setStudentRoutineList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [classLogs, setClassLogs] = useState<ClassLogDataType[]>([])

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth())

    const selectedStudent = useMemo(
        () => studentRoutineList.find(e => e.id == searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID)) ?? null
        , [searchParams, studentRoutineList]
    )

    const calendarDates = useMemo(
        () => [...getDatesOfMonth(year, month)]
        , [year, month]
    )

    const classLogsByDate = useMemo(() => {
        return classLogs.reduce<Record<string, ClassLogDataType[]>>((acc, log) => {
            const dateKey = getDateKey(log.startedAt);
            acc[dateKey] = [...(acc[dateKey] || []), log]
            return acc;
        }, {});
    }, [classLogs]);

    const selectedClassLogs = useMemo(() => {
        if (!selectedDate) return [];
        const logs = classLogsByDate[getDateKey(selectedDate.toDateString())]
        if (!logs || logs.length == 0) return [];
        return logs;
    }, [classLogsByDate, selectedDate])

    useEffect(() => {
        api
            .get("/api/t/routines")
            .then(res => setStudentRoutineList([...res.data]))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        api
            .post("/api/t/classes/month", {
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
                    headerInfo={
                        <select
                            className="select select-sm select-bordered w-32"
                            value={routineViewType}
                            onChange={e => setRoutineViewType(e.target.value)}
                        >
                            <option value={constants.ROUTINE_VIEWS.CALENDAR}>Calendar</option>
                            <option value={constants.ROUTINE_VIEWS.DAYS}>Days</option>
                        </select>
                    }
                >
                    <div className={classNames("grid grid-cols-1", {
                        "lg:grid-cols-2": routineViewType == constants.ROUTINE_VIEWS.CALENDAR
                    })}>
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
                                        {studentRoutineList.map((e, i) => (
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
                            {routineViewType == constants.ROUTINE_VIEWS.CALENDAR && (
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
                                                    className={classNames("flex flex-col w-full h-20", {
                                                        "bg-primary text-primary-content": selectedDate?.toDateString() == new Date(year, month, day?.getDate()).toDateString(),
                                                        "cursor-pointer hover:bg-primary/80": !!day
                                                    })}
                                                    onClick={() => setSelectedDate(new Date(year, month, day?.getDate()))}
                                                    disabled={!day}
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
                            )}
                            {routineViewType == constants.ROUTINE_VIEWS.DAYS && (
                                <div className="carousel flex divide-x divide-base-300 border border-base-300 h-fit">
                                    {calendarDates.flatMap(c => c).filter(e => !!e).map((day, i) => (
                                        <button
                                            className={classNames("carousel-item h-14 w-24 flex justify-center items-center flex-col relative", {
                                                "bg-primary text-primary-content": selectedDate?.toDateString() == new Date(year, month, day?.getDate()).toDateString(),
                                                "cursor-pointer hover:bg-primary/80": !!day
                                            })}
                                            onClick={() => setSelectedDate(new Date(year, month, day?.getDate()))}
                                            key={i}
                                        >
                                            <div className='text-sm font-semibold'>{onlyDateViewFormatter.format(day)}</div>
                                            <div className='text-xs'>{weekdayViewFormatter.format(day)}</div>
                                            {day && classLogsByDate[getDateKey(day.toDateString())]?.length > 0 && (
                                                <div className="absolute top-0 right-0 m-1">
                                                    <div className="h-6 w-6 flex justify-center items-center rounded-full bg-info text-info-content text-xs">
                                                        {classLogsByDate[getDateKey(day.toDateString())].length}
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={classNames("w-full px-5", {
                            "lg:px-0": routineViewType == constants.ROUTINE_VIEWS.CALENDAR
                        })}>
                            <div className={classNames("card divide-y divide-base-300 h-[40.2rem] w-full border border-base-300 overflow-y-auto", {
                                "lg:border-t-0": routineViewType == constants.ROUTINE_VIEWS.CALENDAR
                            })}>
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
                                        {selectedClassLogs.sort((a, b) => a.startedAt.localeCompare(b.startedAt)).map((e, i) => (
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
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogList