import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import RoutineClassLog from 'components/RoutineClassLog';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { TbTableDashed } from 'react-icons/tb';
import { useEffect, useMemo, useState } from 'react';
import { ClassLogDataType, StudentDataType } from 'types/response';
import { useSearchParams } from 'react-router';
import { constants } from 'constants';
import { api, dateViewFormatter, getDateInYYYYMMDD, getLocalTimezoneInfo } from 'helpers';
import classNames from 'classnames';
import { useLocalStorage } from 'usehooks-ts';

const ClassLogList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [studentList, setStudentList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [dates, setDates] = useState<Date[]>([...Array(7)].map((_, i) => new Date(new Date().getTime() + 86400000 * i)))
    const [classLogs, setClassLogs] = useState<ClassLogDataType[]>([])

    const selectedStudent = useMemo(
        () => studentList.find(e => e.id == searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID)) ?? null
        , [searchParams, studentList]
    )

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentList([...res.data]))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        api
            .post("/api/t/classLogs/day", {
                utcOffset: getLocalTimezoneInfo().offset,
                date: getDateInYYYYMMDD(selectedDate),
                studentId: selectedStudent ? selectedStudent.id : ""
            })
            .then((res) => setClassLogs(res.data))
            .catch(() => setClassLogs([]))
            .finally(() => setIsLoading(false))
    }, [selectedStudent, selectedDate])

    const handleStudentIdChange = (studentId: string) => {
        setSearchParams({
            ...searchParams,
            [constants.SEARCH_PARAMS.STUDENT_ID]: studentId
        })
    }

    const nextDates = () => {
        const maxDate = dates[dates.length - 1]
        const nDates = [...Array(7)].map((_, i) => new Date(maxDate.getTime() + 86400000 * i))
        setDates([...nDates])
        setSelectedDate(nDates[0])
    }

    const prevDates = () => {
        const minDate = dates[0]
        const pDates = [...Array(7)].map((_, i) => new Date(minDate.getTime() - 86400000 * i))
        setDates([...pDates])
        setSelectedDate(pDates[pDates.length - 1])
    }

    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<TbTableDashed className='size-5' />}
                    headerTitle='Student Class Plans'
                >
                    <div className="p-5">
                        <div className="flex mb-5">
                            <label className="form-control max-w-sm flex flex-col">
                                <div className="label pb-2">
                                    <span className="label-text">Select Student</span>
                                </div>
                                <select
                                    className="select select-bordered min-w-xs"
                                    value={selectedStudent?.id ?? ""}
                                    onChange={e => handleStudentIdChange(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {studentList.map((e, i) => (
                                        <option value={e.id} key={i}>{e.name}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="flex gap-2 ml-auto items-end">
                                <button className="btn btn-sm btn-square" onClick={prevDates}>
                                    <FaArrowLeftLong className='size-4' />
                                </button>
                                <button className="btn btn-sm btn-square" onClick={nextDates}>
                                    <FaArrowRightLong className='size-4' />
                                </button>
                            </div>
                        </div>
                        <div className="card flex-row carousel border border-base-300 flex divide-x divide-base-300">
                            {dates.map((d, i) => (
                                <button
                                    className={classNames("carousel-item flex-1 flex-col gap-1 p-3 min-w-20 justify-center items-center cursor-pointer", {
                                        "bg-primary text-primary-content hover:bg-primary/50 hover:text-base-content": selectedDate.toDateString() == d.toDateString(),
                                        "hover:bg-base-200": selectedDate.toDateString() != d.toDateString()
                                    })
                                    }
                                    onClick={() => setSelectedDate(d)}
                                    key={i}
                                >
                                    <div>{dateViewFormatter.format(d)}</div>
                                    <div className='text-xs opacity-50 uppercase'>{d.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                </button>
                            ))}
                        </div>
                        <div className="card divide-y divide-base-300 h-96 w-full border border-t-0 border-base-300 overflow-y-auto">
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
                                    {classLogs.map((e, i) => (
                                        <RoutineClassLog data={e} key={i} />
                                    ))}
                                    {classLogs.length == 0 && (
                                        <div className="p-5">
                                            No Class found
                                        </div>
                                    )}
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