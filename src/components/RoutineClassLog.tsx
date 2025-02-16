import { FaCircleNotch, FaWhatsapp } from "react-icons/fa";
import { ClassLogDataType } from "types/response";
import { getWhatsappUrl, timeViewFormatter } from "helpers";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { BsAlarmFill } from "react-icons/bs";
import { TbMessage2Star } from "react-icons/tb";
import { useClassNote } from "contexts/ClassNoteContext";
import { Link } from "react-router";
import { LiaExpandSolid } from "react-icons/lia";
import { FaCircleCheck } from "react-icons/fa6";

const RoutineClassLog = ({ data }: { data: ClassLogDataType }) => {
    const { openNoteModal } = useClassNote()

    return (
        <div className="flex justify-between pt-2 pb-4 px-5 w-full hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="flex gap-5 items-start">
                <div className="w-14 pt-1">
                    {data.studentUserAvatar?.length > 0 ? (
                        <img
                            className="size-14 object-cover rounded-full"
                            src={`${import.meta.env.VITE_API_URL}/api/files/_pb_users_auth_/${data.studentUserId}/${data.studentUserAvatar}`}
                        />
                    ) : (
                        <div className="size-14 rounded-full bg-base-300 animate-pulse" />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <div className='text-lg font-semibold'>{data.studentName}</div>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm opacity-80">
                            {data.studentLocation} . {data.teachersPrice} TK . {data.classMins} Mins
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="text-xs flex items-center gap-1 uppercase">
                                <BsAlarmFill className="size-4" />
                                {timeViewFormatter.format(new Date(data.startedAt))} {data.finishedAt.length > 0 && "~"} {data.finishedAt.length > 0 && timeViewFormatter.format(new Date(data.finishedAt))}
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <div className="tooltip tooltip-info" data-tip={`${data.studentWhtsAppNo}`}>
                    <a href={getWhatsappUrl(data.studentWhtsAppNo)} target="_blank" className="btn btn-sm btn-square btn-ghost">
                        <FaWhatsapp className="size-4" />
                    </a>
                </div>
                <div className="tooltip tooltip-info" data-tip="Update note">
                    <button className="btn btn-sm btn-square btn-ghost" onClick={() => openNoteModal(data.id)}>
                        <TbMessage2Star className="size-4" />
                    </button>
                </div>
                <div className="tooltip tooltip-success" data-tip="Open Class">
                    <Link to={`/t/classes/${data.id}`} className="btn btn-sm btn-square btn-ghost">
                        <LiaExpandSolid className='size-4' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RoutineClassLog;