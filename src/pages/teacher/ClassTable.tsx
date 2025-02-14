import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import { TbTableDashed } from 'react-icons/tb';
import { useEffect, useMemo, useState } from 'react';
import { PaginatedClassLogDataType, StudentDataType } from 'types/response';
import { useSearchParams } from 'react-router';
import { constants } from 'constants';
import { api, convertToOffset, dateViewFormatter, getLocalTimezoneInfo, timeViewFormatter } from 'helpers';
import { useLocalStorage } from 'usehooks-ts';
import { FaCircleNotch } from 'react-icons/fa';
import { MdOutlineSignalWifiStatusbar4Bar } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';

const ClassTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false)
    const [studentRoutineList, setStudentRoutineList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [classLogs, setClassLogs] = useState<PaginatedClassLogDataType | null>(null)

    const selectedStudent = useMemo(
        () => studentRoutineList.find(e => e.id == searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID)) ?? null
        , [searchParams, studentRoutineList]
    )

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentRoutineList([...res.data]))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        api
            .post(`/api/t/classes/filter?pageNo=${searchParams.get(constants.SEARCH_PARAMS.PAGE_NO) ?? 1}`, {
                utcOffset: getLocalTimezoneInfo().offset,
                studentId: selectedStudent ? selectedStudent.id : ""
            })
            .then((res) => setClassLogs(res.data))
            .catch(() => setClassLogs(null))
            .finally(() => setIsLoading(false))
    }, [selectedStudent, searchParams])

    const handleStudentIdChange = (studentId: string) => {
        setSearchParams({
            pageNo: (searchParams.get(constants.SEARCH_PARAMS.PAGE_NO) ?? 1).toString(),
            [constants.SEARCH_PARAMS.STUDENT_ID]: studentId
        })
    }

    const handleNext = () => {
        setSearchParams({
            [constants.SEARCH_PARAMS.STUDENT_ID]: searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID) ?? "",
            pageNo: (Number(searchParams.get(constants.SEARCH_PARAMS.PAGE_NO) ?? 1) + 1).toString()
        })
    }

    const handlePrev = () => {
        setSearchParams({
            [constants.SEARCH_PARAMS.STUDENT_ID]: searchParams.get(constants.SEARCH_PARAMS.STUDENT_ID) ?? "",
            pageNo: (Number(searchParams.get(constants.SEARCH_PARAMS.PAGE_NO) ?? 2) - 1).toString()
        })
    }

    const getTeacherDateTime = (dateString?: string) => {
        if (!dateString || dateString?.length == 0) return "N/A";
        const formatted = new Date(dateString)
        if (formatted) return `${dateViewFormatter.format(formatted)} ${timeViewFormatter.format(formatted).toUpperCase()}`
        return "N/A"
    }

    const getStudentDateTime = (dateString?: string, utcOffset?: string) => {
        if (!dateString || dateString?.length == 0 || !utcOffset || utcOffset?.length == 0) return "N/A";
        const formatted = convertToOffset(new Date(dateString), utcOffset)
        if (formatted) return `${dateViewFormatter.format(formatted)} ${timeViewFormatter.format(formatted).toUpperCase()}`
        return "N/A"
    }

    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<TbTableDashed className='size-5' />}
                    headerTitle='Student Class Table'
                >
                    <div className="grid grid-cols-1 gap-5 p-5">
                        <div className="flex flex-row gap-5">
                            <label className="form-control max-w-md">
                                <div className="label pb-2">
                                    <span className="label-text">Select Student</span>
                                </div>
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedStudent?.id ?? ""}
                                    onChange={e => handleStudentIdChange(e.target.value)}
                                    disabled={isLoading}
                                >
                                    <option value="">All</option>
                                    {studentRoutineList.map((e, i) => (
                                        <option value={e.id} key={i}>{e.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="overflow-auto scrollbar" style={{height: "calc(100vh - 7rem)"}}>
                            <table className="table table-auto table-zebra table-pin-rows table-pin-cols w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Student</th>
                                        <th>Country</th>
                                        <th>WhatsApp</th>
                                        <th>Status</th>
                                        <th>Teacher Start</th>
                                        <th>Teacher Finish</th>
                                        <th>Student Start</th>
                                        <th>Student Finish</th>
                                        <th>Package</th>
                                        <th>Class Mins</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classLogs?.items.map((data, i) => (
                                        <tr key={i}>
                                            <th>{(i + 1).toString().padStart(2, "0")}</th>
                                            <th>
                                                {data.studentUserAvatar?.length > 0 ? (
                                                    <img
                                                        className="size-10 object-cover rounded-full"
                                                        src={`${import.meta.env.VITE_API_URL}/api/files/_pb_users_auth_/${data.studentUserId}/${data.studentUserAvatar}`}
                                                    />
                                                ) : (
                                                    <div className="size-10 rounded-full bg-base-300 animate-pulse" />
                                                )}
                                            </th>
                                            <td className='whitespace-nowrap'>
                                                {data.studentName}
                                            </td>
                                            <td>
                                                {data.studentCountry}
                                            </td>
                                            <td>
                                                {data.studentWhtsAppNo}
                                            </td>
                                            <td>
                                                {data.status == 'CREATED' && (
                                                    <div className="flex text-xs items-center gap-1">
                                                        <FaCircleNotch className="size-4" />
                                                        CREATED
                                                    </div>
                                                )}
                                                {data.status == 'STARTED' && (
                                                    <div className="flex text-xs items-center gap-1 text-info">
                                                        <MdOutlineSignalWifiStatusbar4Bar className="size-4" />
                                                        STARTED
                                                    </div>
                                                )}
                                                {data.status == 'FINISHED' && (
                                                    <div className="flex text-xs items-center gap-1 text-success">
                                                        <FaCircleCheck className="size-4" />
                                                        COMPLETED
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {getTeacherDateTime(data.startedAt)}
                                            </td>
                                            <td>
                                                {getTeacherDateTime(data.finishedAt)}
                                            </td>
                                            <td>
                                                {getStudentDateTime(data.startedAt, data.utcOffset)}
                                            </td>
                                            <td>
                                                {getStudentDateTime(data.finishedAt, data.utcOffset)}
                                            </td>
                                            <td className='whitespace-nowrap'>
                                                {data.packageName}
                                            </td>
                                            <td className='whitespace-nowrap'>
                                                {data.classMins} Mins
                                            </td>
                                            <td className='whitespace-nowrap'>
                                                {data.teachersPrice} TK
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-5 md:items-center md:justify-between">
                            <div className="opacity-50">
                                Total {classLogs?.totalItems ?? 0} classes found . Showing page {classLogs?.pageNo ?? 1} of {classLogs?.totalPages ?? 1}
                            </div>
                            <div className="join grid grid-cols-2">
                                <button className="join-item btn btn-outline" disabled={!classLogs?.hasPrev} onClick={handlePrev}>Previous page</button>
                                <button className="join-item btn btn-outline" disabled={!classLogs?.hasNext} onClick={handleNext}>Next Page</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                        <DayPicker
                            mode="range"
                            min={1}
                            max={constants.MAX_DAY_COUNT_IN_ROUTINE}
                            excludeDisabled
                            weekStartsOn={6}
                            selected={{
                                from: formData.startDate ? new Date(formData.startDate) : undefined,
                                to: formData.endDate ? new Date(formData.endDate) : undefined
                            }}
                            onSelect={e => {
                                setFormData({
                                    ...formData,
                                    startDate: e?.from,
                                    endDate: e?.to
                                })
                            }}
                        />
                        <div className="flex justify-between items-center">
                            <div className='flex flex-col gap-1'>
                                <div className='text-xs'>{formData.startDate && dateViewFormatter.format(formData.startDate)} ~ {formData.endDate && dateViewFormatter.format(formData.endDate)}</div>
                                <div className='text-xs'>Maximum {constants.MAX_DAY_COUNT_IN_ROUTINE} days can be selected</div>
                            </div>
                            <button className="btn" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog> */}
        </NavLayout>
    )
}

export default ClassTable