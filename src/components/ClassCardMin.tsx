import { FaRegClock } from "react-icons/fa6";
import { LuPackage2 } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LiaExpandSolid } from "react-icons/lia";
import { TbMessage2Star } from "react-icons/tb";

const ClassCardMin = () => {
    return (
        <div className="card px-5 pt-3">
            <div className="flex justify-between">
                <div className="font-semibold flex gap-2 items-center">
                    <img
                        className="size-6 rounded-full object-cover"
                        src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
                    />
                    Sayed Rafi
                </div>
                <div className="flex gap-.5">
                    <button className="btn btn-sm btn-square btn-ghost">
                        <FiTrash className="size-4" />
                    </button>
                    <button className="btn btn-sm btn-square btn-ghost">
                        <TbMessage2Star className="size-4" />
                    </button>
                    <button className="btn btn-sm btn-square btn-ghost">
                        <LiaExpandSolid className="size-4" />
                    </button>
                </div>
            </div>
            <div className="flex text-sm mt-3 border-x border-t border-base-300 divide-x divide-base-300">
                <div className="flex flex-1 pl-3 py-3 items-center gap-2">
                    <FaRegClock className="size-4" />
                    <div>12:00 PM</div>
                </div>
                <div className="flex flex-1 pl-3 py-3 items-center gap-2">
                    <LuPackage2 className="size-4" />
                    <div>30 Minutes</div>
                </div>
                <div className="flex flex-1 pl-3 py-3 items-center gap-2">
                    <TbMoneybag className="size-4" />
                    <div>120 TK</div>
                </div>
                <div className="flex flex-1 pl-3 py-3 items-center gap-2">
                    <GoLocation className="size-4" />
                    <div>Bangladesh</div>
                </div>
            </div>
        </div>
    )
}

export default ClassCardMin