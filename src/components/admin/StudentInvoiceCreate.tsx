import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import PaginateRes from "./PaginateRes"
import { api, daysDifference } from "helpers";
import { AdminStudentLastInvoiceListType } from "types/response";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAlert } from "contexts/AlertContext";

const StudentInvoiceCreate = () => {
    const { openAlert } = useAlert()
    const [count, setCount] = useState(1)
    const [studentIds, setStudentIds] = useState<string[]>([])
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState<AdminStudentLastInvoiceListType>()

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        api
            .get("/api/a/student-last-invoices", {
                params: {
                    studentId: searchText,
                    pageNo
                }
            })
            .then(res => setData(res.data))
            .finally(() => setIsLoading(false))
    }, [pageNo, searchText, show, count])

    const handleNext = () => {
        setPageNo(pageNo + 1)
        setStudentIds([])
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
        setStudentIds([])
    }

    const handleCheck = (id: string) => {
        if (studentIds.includes(id)) {
            setStudentIds([...studentIds.filter(e => e != id)])
        } else {
            setStudentIds([...studentIds, id])
        }
    }

    const handleGenerateInvoice = () => {
        setIsLoading(true)
        api
            .post("/api/a/student-invoices", {
                studentIds
            })
            .then(() => {
                toast.success("Invoices has been issued")
                setStudentIds([])
                setCount(count + 1)
            })
            .catch(() => toast.error("Invoice issue failed"))
            .finally(() => setIsLoading(false))
    }

    return (
        <AdminAccordion title="Create Student Invoice" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <input
                        placeholder='Student Id'
                        type="text"
                        className='input input-bordered w-48'
                        ref={inputRef}
                    />
                    <button className="btn btn-square" onClick={() => setSearchText(inputRef.current?.value ?? "")}>
                        <FaSearch className="size-5" />
                    </button>
                </div>
                <div className="flex gap-5">
                    <button className="btn" onClick={() => openAlert(handleGenerateInvoice)}>
                        Generate Invoice
                    </button>
                    <button className="btn" onClick={() => setCount(count + 1)}>
                        Refresh Data
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Id</th>
                            <th>Student Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Location</th>
                            <th>Last Invoiced At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={studentIds.includes(item.studentId)}
                                        onChange={() => handleCheck(item.studentId)}
                                    />
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.userId}</code>
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.studentId}</code>
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
                                    {item.created.length > 0 && `${daysDifference(new Date(item.created))} days ago`}
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data?.items.length == 0 && (
                            <tr>
                                <td colSpan={10} className='p-5 bg-base-200 text-center'>
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

export default StudentInvoiceCreate