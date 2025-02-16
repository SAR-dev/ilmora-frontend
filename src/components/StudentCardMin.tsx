import { LuPackage2 } from "react-icons/lu";
import { GoLocation } from "react-icons/go";
import { LiaExpandSolid } from "react-icons/lia";
import { SiSubtitleedit } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { StudentDataType } from "types/response";
import classNames from "classnames";
import { getWhatsappUrl } from "helpers";
import { FaWhatsapp } from "react-icons/fa6";

const StudentCardMin = ({ data }: { data: StudentDataType }) => {
    return (
        <div className="flex flex-col pt-3 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="px-5 flex justify-between">
                <div className="font-semibold flex gap-2 items-center">
                    {data.avatar?.length > 0 ? (
                        <img
                            className="size-6 rounded-full object-cover"
                            src={`${import.meta.env.VITE_API_URL}/api/files/_pb_users_auth_/${data.id}/${data.avatar}`}
                        />
                    ) : (
                        <div className="size-6 rounded-full bg-base-300 animate-pulse" />
                    )}
                    {data.name}
                </div>
                <div className="flex items-center">
                    <div className="tooltip tooltip-info" data-tip={`${data.whatsAppNo}`}>
                        <a href={getWhatsappUrl(data.whatsAppNo)} target="_blank" className="btn btn-sm btn-square btn-ghost">
                            <FaWhatsapp className="size-4" />
                        </a>
                    </div>
                    <div className="tooltip tooltip-info" data-tip="Open Class History">
                        <button className="btn btn-sm btn-square btn-ghost">
                            <LiaExpandSolid className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 text-sm mt-3 border-t border-base-300 divide-x divide-y divide-base-300">
                <div className="flex py-3 px-5 items-center gap-2">
                    <SiSubtitleedit className="size-4" />
                    <div className="line-clamp-1">{data.packageName}</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <LuPackage2 className="size-4" />
                    <div>{data.packageClassMins} Minutes</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <TbMoneybag className="size-4" />
                    <div>{data.teachersPrice}TK / Class</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <GoLocation className="size-4" />
                    <div>{data.location}</div>
                </div>
            </div>
            <div className="grid grid-cols-8 text-xs border-t border-base-300 divide-x divide-base-300">
                <div className="py-2 flex flex-col items-center justify-center">
                    <div>TZ</div>
                    <div>{data.utcOffset}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.satTime.length > 0,
                        "text-base-content/20": data.satTime.length == 0,
                    })}
                >
                    <div>SAT</div>
                    <div>{data.satTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.sunTime.length > 0,
                        "text-base-content/20": data.sunTime.length == 0,
                    })}
                >
                    <div>SUN</div>
                    <div>{data.sunTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.monTime.length > 0,
                        "text-base-content/20": data.monTime.length == 0,
                    })}
                >
                    <div>MON</div>
                    <div>{data.monTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.tueTime.length > 0,
                        "text-base-content/20": data.tueTime.length == 0,
                    })}
                >
                    <div>TUE</div>
                    <div>{data.tueTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.wedTime.length > 0,
                        "text-base-content/20": data.wedTime.length == 0,
                    })}
                >
                    <div>WED</div>
                    <div>{data.wedTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.thuTime.length > 0,
                        "text-base-content/20": data.thuTime.length == 0,
                    })}
                >
                    <div>THU</div>
                    <div>{data.thuTime}</div>
                </div>
                <div
                    className={classNames("py-2 items-center justify-center flex flex-col", {
                        "text-success font-semibold": data.friTime.length > 0,
                        "text-base-content/20": data.friTime.length == 0,
                    })}
                >
                    <div>FRI</div>
                    <div>{data.friTime}</div>
                </div>
            </div>
        </div>
    )
}

export default StudentCardMin