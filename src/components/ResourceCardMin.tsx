import { VscLink } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci";

const ResourceCardMin = () => {
    return (
        <div className="card px-5 py-2 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CiFileOn className="size-5" />
                    <div>This is a dark alert</div>
                </div>
                <button className="btn btn-sm">
                    <VscLink className="size-4" />
                    <span className="hidden lg:flex">Open Link</span>
                </button>
            </div>
        </div>
    )
}

export default ResourceCardMin