import { FaArrowRight, FaCheckCircle, FaDotCircle } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { ClassLogDataType } from "types/response";
import { timeViewFormatter } from "helpers";

const RoutineClassLog = ({ data }: { data: ClassLogDataType }) => {
    return (
        <div className="flex justify-between py-2 px-5 w-full hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    {data.status == 'CREATED' && <FaDotCircle className="size-4 text-base-content" />}
                    {data.status == 'STARTED' && <span className="loading loading-spinner loading-xs text-info" />}
                    {data.status == 'FINISHED' && <FaCheckCircle className="size-4 text-success" />}
                    <div className="text-sm opacity-50 font-semibold uppercase">{timeViewFormatter.format(new Date(data.startedAt))} {data.finishedAt.length > 0 && "~"} {data.finishedAt.length > 0 && timeViewFormatter.format(new Date(data.finishedAt))}</div>
                </div>
                <div className='text-lg font-semibold'>{data.studentName}</div>
                <div className="text-sm opacity-80">
                    {data.studentCountry} . {data.teachersPrice} TK / Class . {data.classMins} Mins
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className="tooltip tooltip-primary tooltip-left" data-tip={data.classNote.length > 0 ? data.classNote : "N/A"}>
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