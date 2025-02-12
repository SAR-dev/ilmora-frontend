import { FaArrowRight } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { ClassLogDataType } from "types/response";
import { timeViewFormatter } from "helpers";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import classNames from "classnames";
import { BsAlarmFill } from "react-icons/bs";

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
                <div className="hidden sm:flex tooltip tooltip-primary tooltip-left" data-tip={data.classNote.length > 0 ? data.classNote : "N/A"}>
                    <button className="btn btn-square">
                        <CiMemoPad className="size-5" />
                    </button>
                </div>
                <button className="btn btn-square">
                    <FaArrowRight className='size-5' />
                </button>
            </div>
        </div>
    )
}

export default RoutineClassLog;