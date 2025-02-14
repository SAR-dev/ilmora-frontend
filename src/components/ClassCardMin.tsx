import { FaCircleCheck, FaRegClock } from "react-icons/fa6";
import { LuPackage2 } from "react-icons/lu";
import { GoLocation } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LiaExpandSolid } from "react-icons/lia";
import { TbMessage2Star } from "react-icons/tb";
import { FaCircleNotch, FaWhatsapp } from "react-icons/fa";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { ClassLogDataType } from "types/response";
import { getWhatsappUrl, timeViewFormatter } from "helpers";
import { useClassNote } from "contexts/ClassNoteContext";
import { Link } from "react-router";

const ClassCardMin = ({ data }: { data: ClassLogDataType }) => {
    const { openNoteModal } = useClassNote()

    return (
        <div className="flex flex-col pt-3 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="px-5 flex justify-between">
                <div className="font-semibold flex gap-2 items-center">
                    {data.studentUserAvatar?.length > 0 ? (
                        <img
                            className="size-6 rounded-full object-cover"
                            src={`${import.meta.env.VITE_API_URL}/api/files/_pb_users_auth_/${data.studentUserId}/${data.studentUserAvatar}`}
                        />
                    ) : (
                        <div className="size-6 rounded-full bg-base-300 animate-pulse" />
                    )}
                    {data.studentName}
                </div>
                <div className="flex gap-.5">
                    <div className="tooltip tooltip-error" data-tip="Delete">
                        <button className="btn btn-sm btn-square btn-ghost">
                            <FiTrash className="size-4" />
                        </button>
                    </div>
                    <div className="tooltip tooltip-info" data-tip={`${data.studentWhtsAppNo}`}>
                        <a href={getWhatsappUrl(data.studentWhtsAppNo)} target="_blank" className="btn btn-sm btn-square btn-ghost">
                            <FaWhatsapp className="size-4" />
                        </a>
                    </div>
                    <div className="tooltip tooltip-info" data-tip="Write note" onClick={() => openNoteModal(data.id)}>
                        <button className="btn btn-sm btn-square btn-ghost">
                            <TbMessage2Star className="size-4" />
                        </button>
                    </div>
                    <div className="tooltip tooltip-success" data-tip="Open Class">
                        <Link to={`/t/classes/${data.id}`} className="btn btn-sm btn-square btn-ghost">
                            <LiaExpandSolid className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 text-sm mt-3 border-t border-base-300 divide-x divide-y divide-base-300">
                {data.status == 'CREATED' && (
                    <div className="flex py-3 px-5 items-center gap-2">
                        <FaCircleNotch className="size-4" />
                        CREATED
                    </div>
                )}
                {data.status == 'STARTED' && (
                    <div className="flex py-3 px-5 items-center gap-2 text-info">
                        <MdOutlineSignalWifiStatusbar4Bar className="size-4" />
                        STARTED
                    </div>
                )}
                {data.status == 'FINISHED' && (
                    <div className="flex py-3 px-5 items-center gap-2 text-success">
                        <FaCircleCheck className="size-4" />
                        COMPLETED
                    </div>
                )}
                <div className="flex py-3 px-5 items-center gap-2">
                    <FaRegClock className="size-3 md:size-4" />
                    <div className="uppercase">{timeViewFormatter.format(new Date(data.startedAt))}</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <LuPackage2 className="size-3 md:size-4" />
                    <div>{data.classMins} Minutes</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <GoLocation className="size-3 md:size-4" />
                    <div>{data.studentCountry}</div>
                </div>
            </div>
        </div>
    )
}

export default ClassCardMin