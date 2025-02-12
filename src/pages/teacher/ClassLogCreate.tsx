import { Dialog, DialogPanel } from '@headlessui/react';
import Card from 'components/Card';
import { constants } from 'constants';
import { api, dateViewFormatter, getLocalTimezoneInfo } from 'helpers';
import NavLayout from 'layouts/NavLayout'
import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FaInfo, FaPlus, FaRegCalendarPlus } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { StudentDataType } from 'types/response';
import { useLocalStorage } from 'usehooks-ts';

const ClassDateInput = ({
    date,
    setDate,
    time,
    setTime,
}: {
    date?: Date,
    setDate: (props: Date | undefined) => void,
    time: string,
    setTime: (props: string) => void
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
        <div className="card flex-col sm:flex-row border border-base-300 sm:divide-none divide-y divide-base-300">
            <div className="w-full p-3">
                <input
                    type="text"
                    placeholder='Select Date'
                    value={date ? dateViewFormatter.format(date) : ""}
                    className="input input-bordered w-48"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <div className="flex gap-2 p-3 items-center">
                <select
                    className="select select-sm w-20 select-bordered"
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
                    className="select select-sm w-20 select-bordered"
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
    const localTimeZoneInfo = getLocalTimezoneInfo()
    const [studentList, setStudentList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [formData, setFormData] = useState<FormDataType>({
        studentId: "",
        utcOffset: localTimeZoneInfo.offset
    })
    const [dates, setDates] = useState<{ date: Date | undefined, time: string }[]>([{ ...initialDateData }])

    const selectedStudent = useMemo(
        () => studentList.find(e => e.id == formData.studentId) ?? null
        , [formData, studentList]
    )

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentList([...res.data]))
    }, [])

    const handleStudentIdChange = (studentId: string) => {
        const found = studentList.find(e => e.id == studentId) ?? null
        if (!found) return;
        setFormData({
            ...formData,
            studentId
        })
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
                                    {studentList.map((e, i) => (
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
                        <div className="flex flex-col gap-5">
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
                                    key={i}
                                />
                            ))}
                            <div className="card flex-col sm:flex-row border border-base-300 divide-y divide-base-300">
                                <div className="w-full p-3">
                                    <button className="btn btn-sm" onClick={() => setDates([...dates, { ...initialDateData }])}>
                                        <FaPlus className='size-3' />
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button className="btn">
                                <IoIosArrowRoundBack className='size-5' />
                                Back
                            </button>
                            <button className="btn btn-primary">
                                <IoSaveOutline className='size-5' />
                                Add Class Plans
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogCreate