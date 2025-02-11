import { LuPackage2 } from "react-icons/lu";
import { GoLocation } from "react-icons/go";
import { LiaExpandSolid } from "react-icons/lia";
import { SiSubtitleedit } from "react-icons/si";
import { RiCalendarScheduleLine } from "react-icons/ri"
import { TbMoneybag } from "react-icons/tb";

const StudentCardMin = () => {
    return (
        <div className="flex flex-col pt-3 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="px-5 flex justify-between">
                <div className="font-semibold flex gap-2 items-center">
                    <img
                        className="size-6 rounded-full object-cover"
                        src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
                    />
                    Sayed Rafi
                </div>
                <div className="flex gap-.5">
                    <div className="tooltip tooltip-info" data-tip="Write memo">
                        <button className="btn btn-sm btn-square btn-ghost">
                            <RiCalendarScheduleLine className="size-4" />
                        </button>
                    </div>
                    <div className="tooltip tooltip-success" data-tip="Open Class">
                        <button className="btn btn-sm btn-square btn-ghost">
                            <LiaExpandSolid className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 text-sm mt-3 border-t border-base-300 divide-x divide-y divide-base-300">
                <div className="flex py-3 px-5 items-center gap-2">
                    <SiSubtitleedit className="size-4" />
                    <div className="line-clamp-1">Eng Class Min</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <LuPackage2 className="size-4" />
                    <div>30 Minutes</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <TbMoneybag className="size-4" />
                    <div>150TK / Class</div>
                </div>
                <div className="flex py-3 px-5 items-center gap-2">
                    <GoLocation className="size-4" />
                    <div>Bangladesh</div>
                </div>
            </div>
        </div>
    )
}

export default StudentCardMin