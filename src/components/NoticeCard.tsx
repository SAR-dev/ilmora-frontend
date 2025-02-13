import { BiSolidChevronRight } from "react-icons/bi";
import { Link } from "react-router";
import { NoticeShortDataType } from "types/response";

const NoticeCard = ({ data }: { data: NoticeShortDataType }) => {
    return (
        <div className="card px-5 py-3 hover:bg-accent/20 transition duration-150 ease-in-out">
            <div className="flex items-center justify-between">
                <div className="font-semibold">{data.title}</div>
                <Link to={`/t/notices/${data.id}`} className="btn btn-sm">
                    Read More
                    <BiSolidChevronRight className="size-4" />
                </Link>
            </div>
        </div>
    )
}

export default NoticeCard