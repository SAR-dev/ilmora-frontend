import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import PaginateRes from "./PaginateRes"
import { api, dateViewFormatter, timeViewFormatter } from "helpers";
import { AdminTeacherLastInvoiceListType } from "types/response";
import { FaSearch } from "react-icons/fa";

const TeacherInvoiceCreate = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState<AdminTeacherLastInvoiceListType>()

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        api
            .get("/api/a/teacher-last-invoices", {
                params: {
                    teacherId: searchText,
                    pageNo
                }
            })
            .then(res => setData(res.data))
            .finally(() => setIsLoading(false))
    }, [pageNo, searchText, show, count])

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    return (
        <AdminAccordion title="Create Teacher Invoices" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <input
                        placeholder='Teacher Id'
                        type="text"
                        className='input input-bordered w-48'
                        ref={inputRef}
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
                            <th>Location</th>
                            <th>Last Invoice Id</th>
                            <th>Last Invoiced At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.userId}</code>
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherId}</code>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.whatsAppNo}
                                </td>
                                <td>
                                    {item.location}
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherInvoiceId}</code>
                                </td>
                                <td className="uppercase">
                                    {item.created.length > 0 && dateViewFormatter.format(new Date(item.created))} {item.created.length > 0 && timeViewFormatter.format(new Date(item.created))}
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data?.items.length == 0 && (
                            <tr>
                                <td colSpan={9} className='p-5 bg-base-200 text-center'>
                                    No Result Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {data && (
                    <PaginateRes
                        data={{
                            page: data?.pageNo,
                            perPage: data?.pageSize,
                            totalItems: data?.totalItems,
                            totalPages: data?.totalPages,
                            items: data?.items

                        }}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                )}
            </div>
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default TeacherInvoiceCreate