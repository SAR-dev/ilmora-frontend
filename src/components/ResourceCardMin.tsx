import { VscLink } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci";
import { ResourcesResponse } from "types/pocketbase";

const ResourceCardMin = ({data}:{data: ResourcesResponse}) => {
    return (
        <div className="px-5 py-2 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CiFileOn className="size-5" />
                    <div>{data.title}</div>
                </div>
                <a href={data.link} target="_blank" className="btn btn-sm">
                    <VscLink className="size-4" />
                    <span className="hidden lg:flex">Open Link</span>
                </a>
            </div>
        </div>
    )
}

export default ResourceCardMin