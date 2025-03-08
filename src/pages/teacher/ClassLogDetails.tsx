import DataFetchError from 'components/DataFetchError';
import NotFoundError from 'components/NotFoundError';
import { api, convertToOffset, dateViewFormatter, getWhatsappUrl } from 'helpers';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useMemo, useState } from 'react';
import { FaPlay, FaStop, FaWhatsapp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { ClassLogDetailsDataType } from 'types/response';
import { timeViewFormatter } from 'helpers';
import { TbMessage2Star } from 'react-icons/tb';
import { Dialog, DialogPanel } from '@headlessui/react';
import toast from 'react-hot-toast';
import { FaLink } from 'react-icons/fa6';
import { GoPackageDependencies } from "react-icons/go";
import { pb } from 'contexts/PocketContext';
import { Collections, DailyClassPackagesResponse } from 'types/pocketbase';
import { useLocalStorage } from 'usehooks-ts';
import { constants } from 'constants';
import { FiTrash } from 'react-icons/fi';
import { useAlert } from 'contexts/AlertContext';

const ClassLogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { openAlert } = useAlert()

    const [classDetails, setClassDetails] = useState<ClassLogDetailsDataType | null>(null)

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [note, setNote] = useState<string>(classDetails?.classNote ?? "")

    const [isPacModalOpen, setIsPacModalOpen] = useState(false)
    const [classPackageList, setClassPackageList] = useLocalStorage<DailyClassPackagesResponse[]>(constants.PACKAGE_DATA_KEY, [])
    const [classPackage, setClassPackage] = useState(classDetails?.packageId ?? "")

    const [isLoading, setIsLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    const [time, setTime] = useState(new Date());
    const studentTime = useMemo(() => {
        if (!classDetails || classDetails.studentOffset?.length == 0) return "N/A";
        const formatted = convertToOffset(time, classDetails.studentOffset)
        if (formatted) return timeViewFormatter.format(formatted)
        return "N/A"
    }, [time])

    const classDisabled = useMemo(() => classDetails?.disableClass == "1", [classDetails])

    const classPackageDetails = useMemo(() => {
        return classPackageList.find(e => e.id == classDetails?.packageId)
    }, [classDetails])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getClassDetails = async () => {
        if (!id || id?.length == 0) return;
        api
            .get(`/api/t/class-logs/${id}`)
            .then(res => setClassDetails(res.data))
            .catch(err => {
                if (err.status == 404) {
                    setNotFound(true)
                    return;
                }
                setFetchError(err.status != 0)
            })
    }

    useEffect(() => {
        getClassDetails()
    }, [id])

    useEffect(() => {
        if (!classDetails) return;
        pb
            .collection(Collections.DailyClassPackages).getFullList({
                filter: `hidden = false`
            })
            .then(res => setClassPackageList(res))
    }, [classDetails])

    const startClass = async () => {
        if(classDisabled) return;
        setIsLoading(true)
        await api
            .post(`/api/t/class-logs/${id}/start`)
            .then(() => toast.success("Class has started"))
            .catch(() => toast.error("Class start failed"))
        await getClassDetails()
        setIsLoading(false)
    }

    const finishClass = async () => {
        if (classDetails?.status == 'CREATED') {
            toast.error("Please start class first")
            return;
        }
        if (classDetails?.status == 'FINISHED') {
            toast.error("Class has already finished")
            return;
        }
        setIsLoading(true)
        await api
            .post(`/api/t/class-logs/${id}/finish`)
            .then(() => toast.success("Class has finished"))
            .catch(() => toast.error("Class finish failed"))
        await getClassDetails()
        setIsLoading(false)
    }

    const deleteClass = () => {
        setIsLoading(true)
        api
            .post(`/api/t/class-logs/${id}/delete`)
            .then(() => {
                toast.success("Class has been deleted")
                navigate(-1)
            })
            .catch(() => toast.error("This class can not be deleted"))
            .finally(() => setIsLoading(false))
    }

    const saveClassPackage = async () => {
        if(classDisabled) return;
        if (classDetails?.status != 'FINISHED') {
            toast.error("Class not finished yet")
            return;
        }
        setIsLoading(true)
        await api
            .post(`/api/t/class-logs/${id}/package`, {
                dailyClassPackageId: classPackage
            })
            .then(() => {
                toast.success("Class package updated")
                setIsPacModalOpen(false)
            })
            .catch(() => toast.error("Class package update failed"))
        await getClassDetails()
        setIsLoading(false)
    }

    const saveClassNote = async () => {
        if(classDisabled) return;
        if (!classDetails) return;
        setIsLoading(true)
        await api
            .post(`/api/t/class-notes/${classDetails.id}`, {
                classNote: note
            })
            .then(() => {
                toast.success("CLass note saved.")
                setIsNoteModalOpen(false)
            })
            .catch(() => toast.error("Class not save failed!"))
        await getClassDetails()
        setIsLoading(false)
    }

    const openNoteModal = () => {
        if(classDisabled) return;
        setIsNoteModalOpen(true)
        setNote(classDetails?.classNote ?? "")
    }

    const openClassPacModal = () => {
        if(classDisabled) return;
        setIsPacModalOpen(true)
        setClassPackage(classDetails?.packageId ?? "")
    }

    if (notFound) return (
        <TeacherNavLayout>
            <NotFoundError />
        </TeacherNavLayout>
    )

    if (fetchError) return (
        <TeacherNavLayout>
            <DataFetchError />
        </TeacherNavLayout>
    )

    return (
        <TeacherNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                {classDetails && (
                    <div className="card m-5 p-5 border border-base-300 bg-base-100 w-fit mx-auto flex justify-center items-center">
                        <div className="size-20">
                            {classDetails.studentAvatar?.length > 0 ? (
                                <img
                                    className="size-20 object-cover rounded-full"
                                    src={`${import.meta.env.VITE_API_URL}/api/files/_pb_users_auth_/${classDetails.studentUserId}/${classDetails.studentAvatar}`}
                                />
                            ) : (
                                <div className="size-20 object-cover rounded-full bg-base-300 animate-pulse" />
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center my-2">
                            <div className='font-semibold text-primary text-lg'>{classDetails.studentName}</div>
                            <div className="opacity-50 text-sm">
                                {classDetails.studentLocation}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 border border-base-300 divide-x divide-y divide-base-300 w-fit max-w-96 text-sm">
                            <div className='px-5 py-2'>Your Time</div>
                            <div className='px-5 py-2 uppercase'>{timeViewFormatter.format(time)}</div>
                            <div className='px-5 py-2'>Student Time</div>
                            <div className='px-5 py-2 uppercase'>{studentTime}</div>
                            <div className='px-5 py-2'>Package Name</div>
                            <div className='px-5 py-2'>{classDetails.packageTitle}</div>
                            <div className='px-5 py-2'>Package Details</div>
                            <div className='px-5 py-2'>{classDetails.classMins} Mins . {classDetails.teachersPrice} TK</div>
                            <div className="col-span-2 px-5 pt-2 pb-3">
                                <div className="text-xs opacity-50">Note </div>
                                <div>
                                    {classDetails.classNote.length > 0 ? classDetails.classNote : "N/A"}
                                </div>
                            </div>
                            <div className="col-span-2 text-center py-2 px-5 text-sm">
                                {classDetails.status == 'CREATED' && (
                                    <div className='text-primary'>
                                        Class starts from
                                        <span className='ml-1'>{dateViewFormatter.format(new Date(classDetails.startedAt))}</span>
                                        <span className="uppercase ml-1">{timeViewFormatter.format(new Date(classDetails.startedAt))}</span>
                                    </div>
                                )}
                                {classDetails.status == 'STARTED' && (
                                    <div className='text-success'>
                                        Class started from
                                        <span className='ml-1'>{dateViewFormatter.format(new Date(classDetails.startedAt))}</span>
                                        <span className="uppercase ml-1">{timeViewFormatter.format(new Date(classDetails.startedAt))}</span>
                                    </div>
                                )}
                                {classDetails.status == 'FINISHED' && (
                                    <div className='text-success'>
                                        Class Completed
                                        <span className="uppercase mx-1">{timeViewFormatter.format(new Date(classDetails.startedAt))}</span>
                                        ~
                                        <span className="uppercase mx-1">{timeViewFormatter.format(new Date(classDetails.finishedAt))}</span>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2">
                                <div className="flex divide-x divide-base-300 relative">
                                    {classDisabled && (
                                        <div className="absolute bg-error h-full w-full flex justify-center items-center z-[1]">
                                            <div className='text-error-content'>Class has been disabled by admin !</div>
                                        </div>
                                    )}
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        {classDetails.status == 'CREATED' ? (
                                            <div className="tooltip tooltip-info" data-tip="Start Class">
                                                <button
                                                    className="w-full btn btn-ghost h-10 btn-sm"
                                                    disabled={isLoading}
                                                    onClick={startClass}
                                                >
                                                    <FaPlay className='size-4' />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="tooltip tooltip-info" data-tip="Open Class">
                                                <a
                                                    href={classDetails.classLink}
                                                    target='_blank'
                                                    className="w-full btn btn-ghost h-10 btn-sm"
                                                >
                                                    <FaLink className='size-4' />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        <div className="tooltip tooltip-info" data-tip="Finish Class">
                                            <button
                                                className="w-full btn btn-ghost h-10 btn-sm"
                                                disabled={isLoading || classDetails.status != 'STARTED'}
                                                onClick={finishClass}
                                            >
                                                <FaStop className='size-4' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        <div className="tooltip tooltip-info" data-tip="Update Class Package">
                                            <button
                                                className="w-full btn btn-ghost h-10 btn-sm"
                                                disabled={isLoading || classDetails.status != 'FINISHED'}
                                                onClick={openClassPacModal}
                                            >
                                                <GoPackageDependencies className='size-4' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        <div className="tooltip tooltip-info" data-tip="Update note">
                                            <button className="w-full btn btn-ghost h-10 btn-sm" disabled={isLoading} onClick={openNoteModal}>
                                                <TbMessage2Star className='size-4' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        <div className="tooltip tooltip-info" data-tip={`${classDetails.studentWhatsAppNo}`}>
                                            <a href={getWhatsappUrl(classDetails.studentWhatsAppNo)} target="_blank" className="w-full btn btn-ghost h-10 btn-sm">
                                                <FaWhatsapp className="size-4" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-1 justify-center items-center">
                                        <div className="tooltip tooltip-error" data-tip="Delete Class">
                                            <button className="w-full btn btn-ghost h-10 btn-sm" disabled={isLoading} onClick={() => openAlert(deleteClass)}>
                                                <FiTrash className='size-4' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Dialog open={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                        <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                            <label className="w-72 lg:w-96">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm">Class Note</div>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered min-h-32 w-full"
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                />
                            </label>
                            <div className="flex gap-5">
                                <button
                                    className="btn w-20"
                                    onClick={() => setIsNoteModalOpen(false)}
                                    disabled={isLoading}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary flex-1"
                                    onClick={saveClassNote}
                                    disabled={isLoading}
                                >
                                    Save
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
                <Dialog open={isPacModalOpen} onClose={() => setIsPacModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                        <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                            <label className="w-72 lg:w-96">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm">Class Package</div>
                                </div>
                                <select
                                    className="select select-bordered w-full my-3"
                                    value={classPackage}
                                    onChange={e => setClassPackage(e.target.value)}
                                >
                                    {classPackageList.map((e, i) => (
                                        <option value={e.id} key={i}>{e.title} ({e.classMins} Mins)</option>
                                    ))}
                                </select>
                                <div className="text-sm text-info">Current Package is: {classPackageDetails?.title} ({classPackageDetails?.classMins} Mins)</div>
                            </label>
                            <div className="flex gap-5">
                                <button
                                    className="btn w-20"
                                    onClick={() => setIsPacModalOpen(false)}
                                    disabled={isLoading}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary flex-1"
                                    onClick={saveClassPackage}
                                    disabled={isLoading}
                                >
                                    Save
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </TeacherNavLayout>
    )
}

export default ClassLogDetails