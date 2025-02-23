import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react"
import AdminAccordion from "./AdminAccordion"
import { pb } from "contexts/PocketContext"
import { Collections } from "types/pocketbase";
import { ListResult } from "pocketbase"
import { TexpandTeacherListWithUser } from "types/extended";
import PaginateRes from "./PaginateRes"
import { FaSearch } from "react-icons/fa";
import CopyToClipboard from "components/CopyToClipboard";

const TeacherList = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState<ListResult<TexpandTeacherListWithUser>>()

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        pb
            .collection(Collections.Teachers).getList(pageNo, 20, {
                filter: `userId.name ~ '${searchText}'`,
                expand: "userId"
            })
            .then(res => setData(res as unknown as ListResult<TexpandTeacherListWithUser>))
            .finally(() => setIsLoading(false))
    }, [pageNo, searchText, show, count])

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.value = searchText
            inputRef.current.focus()
        }
    }, [show])


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchText(inputRef.current?.value ?? "");
        }
    };

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    return (
        <AdminAccordion title="Teacher List" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <input
                        placeholder='Teacher Name'
                        type="text"
                        className='input input-bordered w-48'
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-square" onClick={() => setSearchText(inputRef.current?.value ?? "")}>
                        <FaSearch className="size-5" />
                    </button>
                </div>
                <button className="btn" onClick={() => setCount(count + 1)}>
                    Refresh Data
                </button>
            </div>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Teacher Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Utc Offset</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items.map((item, i) => (
                            <tr key={i}>
                                <th>
                                    <CopyToClipboard text={item.expand.userId.id}>
                                        <code className="code bg-base-200 px-2 py-1">{item.expand.userId.id}</code>
                                    </CopyToClipboard>
                                </th>
                                <td>
                                    <CopyToClipboard text={item.id}>
                                    <code className="code bg-base-200 px-2 py-1">{item.id}</code>
                                    </CopyToClipboard>
                                </td>
                                <td>
                                    {item.expand.userId.name}
                                </td>
                                <td>
                                    {item.expand.userId.email}
                                </td>
                                <td>
                                    {item.expand.userId.whatsAppNo}
                                </td>
                                <td>
                                    {item.expand.userId.utcOffset}
                                </td>
                                <td>
                                    {item.expand.userId.location}
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data?.items.length == 0 && (
                            <tr>
                                <td colSpan={6} className='p-5 bg-base-200 text-center'>
                                    No Result Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <PaginateRes data={data} handleNext={handleNext} handlePrev={handlePrev} />
            </div>
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default TeacherList