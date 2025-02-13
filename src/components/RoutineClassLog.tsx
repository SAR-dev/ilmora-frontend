import { FaArrowRight } from "react-icons/fa";
import { ClassLogDataType } from "types/response";
import { timeViewFormatter } from "helpers";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import classNames from "classnames";
import { BsAlarmFill } from "react-icons/bs";
import { TbMessage2Star } from "react-icons/tb";

const RoutineClassLog = ({ data }: { data: ClassLogDataType }) => {
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
                            {data.studentCountry} . {data.teachersPrice} TK . {data.classMins} Mins
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="text-xs flex items-center gap-1 uppercase">
                                <BsAlarmFill className="size-4" />
                                {timeViewFormatter.format(new Date(data.startedAt))} {data.finishedAt.length > 0 && "~"} {data.finishedAt.length > 0 && timeViewFormatter.format(new Date(data.finishedAt))}
                            </div>
                            <div className={classNames("text-xs flex items-center gap-1", {
                                "text-info": data.status == 'STARTED',
                                "text-success": data.status == 'FINISHED',
                            })}>
                                <MdOutlineSignalWifiStatusbar4Bar className="size-4" />
                                {data.status}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className="tooltip tooltip-info" data-tip="Write a memo">
                    <button className="btn btn-sm btn-square">
                        <TbMessage2Star className="size-4" />
                    </button>
                </div>
                <div className="tooltip tooltip-success" data-tip="Open Class">
                    <button className="btn btn-sm btn-square">
                        <FaArrowRight className='size-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoutineClassLog;