import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import { FaInfo, FaRegCalendarPlus } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { LuBadgeAlert } from "react-icons/lu";
import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { DayPicker } from "react-day-picker"
import { api, dateViewFormatter, getDateInYYYYMMDD, getLocalTimezoneInfo } from 'helpers';
import classNames from 'classnames';
import { StudentDataType } from 'types/response';
import { constants } from 'constants';
import { RoutineCreateType } from 'types/payload';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';

const RoutineDay = ({
    dayName,
    weekDay,
    time,
    setTime,
    disabled
}: {
    dayName: string,
    weekDay: number,
    time: string,
    setTime: (props: string) => void,
    disabled: boolean
}) => {
    const active = useMemo(
        () => time.length > 0
        , [time]
    )

    const handleCheck = (val: boolean) => {
        if (!val) {
            setTime("")
        } else {
            setTime(":")
        }
    }

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
        <div className={classNames("card flex-col sm:items-center sm:flex-row border border-base-300 divide-y sm:divide-none divide-base-300", {
            "bg-info/10": active
        })}>
            <div className={classNames("w-full p-3", {
                "opacity-25": !active
            })}>
                {weekDay}. {dayName}
            </div>
            <div className="flex gap-2 p-3 items-center">
                <select
                    className="select select-sm w-20 select-bordered"
                    disabled={!active || disabled}
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
                    disabled={!active || disabled}
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
                <div className="form-control flex ml-auto">
                    <label className="cursor-pointer label">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-success"
                            onChange={e => handleCheck(e.target.checked)}
                            checked={active}
                            disabled={disabled}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

interface FormDataType {
    studentId: string
    utcOffset: string
    startDate?: Date
    endDate?: Date
    satTime: string
    sunTime: string
    monTime: string
    tueTime: string
    wedTime: string
    thuTime: string
    friTime: string
}

const RoutineCreate = () => {
    const navigate = useNavigate()
    const localTimeZoneInfo = getLocalTimezoneInfo()
    const [isOpen, setIsOpen] = useState(false)
    const [studentList, setStudentList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<FormDataType>({
        studentId: "",
        utcOffset: localTimeZoneInfo.offset,
        startDate: new Date(),
        endDate: new Date((new Date()).setMonth(new Date().getMonth() + 1)),
        satTime: "",
        sunTime: "",
        monTime: "",
        tueTime: "",
        wedTime: "",
        thuTime: "",
        friTime: "",
    })

    const selectedStudent = useMemo(
        () => studentList.find(e => e.id == formData.studentId) ?? null
        , [formData, studentList]
    )

    useEffect(() => {
        api
            .get("/api/t/students")
            .then(res => setStudentList([...res.data]))
    }, [])

    const handleSubmit = () => {
        if (!selectedStudent) {
            toast.error("Select a student.")
            return;
        }
        if (!formData.startDate || !formData.endDate) {
            toast.error("Select date range correctly.")
            return;
        }
        if(formData.startDate < new Date()){
            toast.error("Start date can not be today or in past.")
            return;
        }
        setIsLoading(true)
        const payload: RoutineCreateType = {
            studentId: selectedStudent.id,
            utcOffset: formData.utcOffset,
            startDate: getDateInYYYYMMDD(formData.startDate),
            endDate: getDateInYYYYMMDD(formData.endDate),
            satTime: formData.satTime.trim().length > 1 ? formData.satTime : "",
            sunTime: formData.sunTime.trim().length > 1 ? formData.sunTime : "",
            monTime: formData.monTime.trim().length > 1 ? formData.monTime : "",
            tueTime: formData.tueTime.trim().length > 1 ? formData.tueTime : "",
            wedTime: formData.wedTime.trim().length > 1 ? formData.wedTime : "",
            thuTime: formData.thuTime.trim().length > 1 ? formData.thuTime : "",
            friTime: formData.friTime.trim().length > 1 ? formData.friTime : ""
        }
        api
            .post("/api/t/routine", { ...payload })
            .then(() => {
                toast.success("Routine has created sucessfully.")
                navigate(`/t/classes?${constants.SEARCH_PARAMS.STUDENT_ID}=${selectedStudent.id}`)
            })
            .catch(() => {
                toast.error("Routine create failed. Please check inputs again.")
            })
            .finally(() => setIsLoading(false))
    }

    const handleStudentIdChange = (studentId: string) => {
        const found = studentList.find(e => e.id == studentId) ?? null
        if (!found) return;
        setFormData({
            ...formData,
            studentId,
            satTime: found.satTime,
            sunTime: found.sunTime,
            monTime: found.monTime,
            tueTime: found.tueTime,
            wedTime: found.wedTime,
            thuTime: found.thuTime,
            friTime: found.friTime,
            startDate: found.startDate.length > 0 ? new Date(found.startDate) : formData.startDate,
            endDate: found.startDate.length > 0 ? new Date(found.endDate) : formData.endDate
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
                            <label className="form-control max-w-sm" onClick={() => setIsOpen(true)}>
                                <div className="label pb-2">
                                    <span className="label-text">Start Date</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="DD-MM-YYYY"
                                    className="input input-bordered"
                                    value={dateViewFormatter.format(formData.startDate)}
                                    disabled={!selectedStudent}
                                />
                            </label>
                            <label className="form-control max-w-sm" onClick={() => setIsOpen(true)}>
                                <div className="label pb-2">
                                    <span className="label-text">End Date</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="DD-MM-YYYY"
                                    className="input input-bordered"
                                    value={dateViewFormatter.format(formData.endDate)}
                                    disabled={!selectedStudent}
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
                                    {selectedStudent && selectedStudent.utcOffset.length > 0 && (
                                        <p className="text-sm text-error/50">
                                            Routine exists with timezone offset {selectedStudent.utcOffset}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <RoutineDay
                                dayName="Saturday"
                                weekDay={1}
                                time={formData.satTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    satTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Sunday"
                                weekDay={2}
                                time={formData.sunTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    sunTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Monday"
                                weekDay={3}
                                time={formData.monTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    monTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Tuesday"
                                weekDay={4}
                                time={formData.tueTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    tueTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Wednesday"
                                weekDay={5}
                                time={formData.wedTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    wedTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Thursday"
                                weekDay={6}
                                time={formData.thuTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    thuTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                            <RoutineDay
                                dayName="Friday"
                                weekDay={7}
                                time={formData.friTime}
                                setTime={(val: string) => setFormData({
                                    ...formData,
                                    friTime: val
                                })}
                                disabled={!selectedStudent}
                            />
                        </div>
                        {selectedStudent && selectedStudent.utcOffset.length > 0 && (
                            <div className="bg-info/10 border-s-4 border-error/50 p-4">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-error/10 bg-error/30 text-error">
                                            <LuBadgeAlert className='shrink-0 size-4' />
                                        </span>
                                    </div>
                                    <div className="ms-3">
                                        <h3 className="font-semibold" >
                                            Read Carefully
                                        </h3>
                                        <p className="text-sm text-base-content/50">
                                            If you update routine, incomplete classes will be deleted and created again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex justify-between'>
                            <button className="btn">
                                <IoIosArrowRoundBack className='size-5' />
                                Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                <IoSaveOutline className='size-5' />
                                Update Routine
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
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
            </Dialog>
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

export default RoutineCreate