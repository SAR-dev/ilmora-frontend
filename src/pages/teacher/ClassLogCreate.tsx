import { Dialog, DialogPanel } from '@headlessui/react';
import Card from 'components/Card';
import { constants } from 'constants';
import { api, dateViewFormatter, getDateInYYYYMMDD, getLocalTimezoneInfo } from 'helpers';
import NavLayout from 'layouts/NavLayout'
import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FaInfo, FaPlus, FaRegCalendarPlus, FaTrash } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { StudentDataType } from 'types/response';
import { useLocalStorage } from 'usehooks-ts';
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { ClassLogCreateType } from 'types/payload';

const ClassDateInput = ({
    date,
    setDate,
    time,
    setTime,
    remove
}: {
    date?: Date,
    setDate: (props: Date | undefined) => void,
    time: string,
    setTime: (props: string) => void,
    remove: () => void
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const setHours = (hh: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, mm] = time.split(":");
        const newTime = `${String(hh).padStart(2, "0")}:${mm.length > 0 ? mm : "00"}`;
        setTime(newTime);
    };

    const setMinutes = (mm: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [hh, _] = time.split(":");
        const newTime = `${hh.length > 0 ? hh : "00"}:${String(mm).padStart(2, "0")}`;
        setTime(newTime);
    };

    return (
        <div className="card flex-col sm:flex-row sm:divide-none divide-y divide-base-300">
            <div className="w-full p-3 flex gap-3 items-center">
                <FaRegCalendar className='size-5 opacity-50' />
                <input
                    type="text"
                    placeholder='Select Date'
                    value={date ? dateViewFormatter.format(date) : ""}
                    className="input input-bordered w-48"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <div className="flex gap-3 p-3 items-center">
                <MdOutlineAccessTime className='size-5 opacity-50' />
                <select
                    className="select select-sm w-22 select-bordered"
                    value={time.split(":")[0] ?? ""}
                    onChange={e => setHours(e.target.value)}
                >
                    <option disabled value="">HH</option>
                    {[...Array(24)].map((_, i) => (
                        <option
                            value={i.toString().padStart(2, '0')}
                            key={i}
                        >
                            {i.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-sm w-22 select-bordered"
                    value={time.split(":")[1] ?? ""}
                    onChange={e => setMinutes(e.target.value)}
                >
                    <option disabled value="">MM</option>
                    {[...Array(60)].map((_, i) => (
                        <option
                            value={i.toString().padStart(2, '0')}
                            key={i}
                        >
                            {i.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
                <button className="btn btn-error btn-ghost btn-square btn-sm" onClick={remove}>
                    <FaTrash className='size-5' />
                </button>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                        <DayPicker
                            mode="single"
                            weekStartsOn={6}
                            selected={date}
                            onSelect={e => setDate(e)}
                        />
                        <div className="flex justify-between items-center">
                            <div className='flex flex-col gap-1'>
                                <div className='text-xs'>{date && dateViewFormatter.format(date)}</div>
                            </div>
                            <button className="btn" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

interface FormDataType {
    studentId: string
    utcOffset: string
}

const initialDateData = {
    date: undefined,
    time: ":"
}

const ClassLogCreate = () => {
    const navigate = useNavigate()
    const localTimeZoneInfo = getLocalTimezoneInfo()
    const [studentRoutineList, setStudentRoutineList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [formData, setFormData] = useState<FormDataType>({
        studentId: "",
        utcOffset: localTimeZoneInfo.offset
    })
    const [dates, setDates] = useState<{ date: Date | undefined, time: string }[]>([{ ...initialDateData }])
    const [isLoading, setIsLoading] = useState(false)

    const selectedStudent = useMemo(
        () => studentRoutineList.find(e => e.id == formData.studentId) ?? null
        , [formData, studentRoutineList]
    )

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentRoutineList([...res.data]))
    }, [])

    const handleStudentIdChange = (studentId: string) => {
        const found = studentRoutineList.find(e => e.id == studentId) ?? null
        if (!found) return;
        setFormData({
            ...formData,
            studentId
        })
    }

    const handleSubmit = () => {
        if (!selectedStudent) {
            toast.error("Select a student.")
            return;
        }

        const timeRegex = new RegExp('^([01][0-9]|2[0-3]):([0-5][0-9])$')
        const incorrectTime = dates.filter(e => !e.date || !timeRegex.test(e.time)).length > 0
        if(incorrectTime){
            toast.error("Select times correctly")
            return;
        }
        
        setIsLoading(true)
        const payload: ClassLogCreateType = {
            studentId: selectedStudent.id,
            utcOffset: formData.utcOffset,
            logs: dates.map(e => {
                return {
                    date: e.date ? getDateInYYYYMMDD(e.date) : "",
                    time: e.time
                }
            })
        }
        api
            .post("/api/t/class-logs", { ...payload })
            .then(() => {
                toast.success("Classes has created sucessfully.")
                navigate(`/t/classes?${constants.SEARCH_PARAMS.STUDENT_ID}=${selectedStudent.id}`)
            })
            .catch(() => {
                toast.error("Class create failed. Please check inputs again.")
            })
            .finally(() => setIsLoading(false))
        }

    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<FaRegCalendarPlus className='size-5' />}
                    headerTitle='Plan Routine for a Student'
                >
                    <div className="p-5 flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <label className="form-control max-w-sm">
                                <div className="label pb-2">
                                    <span className="label-text">Select Student</span>
                                </div>
                                <select
                                    className="select select-bordered"
                                    value={formData.studentId}
                                    onChange={e => handleStudentIdChange(e.target.value)}
                                >
                                    <option disabled value="">-</option>
                                    {studentRoutineList.map((e, i) => (
                                        <option value={e.id} key={i}>{e.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control max-w-sm">
                                <div className="label pb-2">
                                    <span className="label-text">Your Timezone</span>
                                </div>
                                <input
                                    type='text'
                                    disabled
                                    className="input input-bordered"
                                    value={`${localTimeZoneInfo.timeZone} (${localTimeZoneInfo.offset})`}
                                />
                            </label>
                        </div>
                        <div className="bg-info/10 border-s-4 border-info/50 p-4">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-info/10 bg-info/30 text-info">
                                        <FaInfo className='shrink-0 size-4' />
                                    </span>
                                </div>
                                <div className="ms-3">
                                    <h3 className="font-semibold" >
                                        {selectedStudent ? selectedStudent.packageName : "Package Info"}
                                    </h3>
                                    <p className="text-sm text-base-content/50">
                                        {selectedStudent ? `Class duration is ${selectedStudent.packageClassMins} Mins per class.` : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border border-base-300 divide-y divide-base-300">
                            {dates.map((date, i) => (
                                <ClassDateInput
                                    date={date.date}
                                    setDate={(val: Date | undefined) => setDates((prevDates) =>
                                        prevDates.map((date, index) =>
                                            i === index ? { ...date, date: val } : date
                                        )
                                    )}
                                    time={date.time}
                                    setTime={(val: string) => setDates((prevDates) =>
                                        prevDates.map((date, index) =>
                                            i === index ? { ...date, time: val } : date
                                        )
                                    )}
                                    remove={() => setDates((prevDates) => prevDates.filter((_, index) => i !== index))}
                                    key={i}
                                />
                            ))}
                            <div className="card flex-col sm:flex-row divide-y divide-base-300">
                                <div className="w-full p-3">
                                    <button className="btn btn-sm" onClick={() => setDates([...dates, { ...initialDateData }])}>
                                        <FaPlus className='size-3' />
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button className="btn" onClick={() => navigate(-1)}>
                                <IoIosArrowRoundBack className='size-5' />
                                Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                <IoSaveOutline className='size-5' />
                                Add Class Plans
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            {isLoading && (
                <div className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-base-300/75">
                    <div className="flex flex-col gap-2 items-center">
                        <span className="loading loading-spinner text-primary loading-lg" />
                        <div className="flex gap-2">
                            <span className="loading loading-dots loading-xs" />
                            Submitting Data
                            <span className="loading loading-dots loading-xs" />
                        </div>
                    </div>
                </div>
            )}
        </NavLayout>
    )
}

export default ClassLogCreate