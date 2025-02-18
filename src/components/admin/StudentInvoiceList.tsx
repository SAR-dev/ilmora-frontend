import Loading from "components/Loading"
import { useEffect, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import { pb } from "contexts/PocketContext"
import { Collections, StudentInvoicesResponse } from "types/pocketbase";
import { ListResult } from "pocketbase"
import PaginateRes from "./PaginateRes"
import { api, dateViewFormatter, timeViewFormatter } from "helpers";
import toast from "react-hot-toast";

const StudentInvoiceList = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState<ListResult<StudentInvoicesResponse>>()

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        pb
            .collection(Collections.StudentInvoices).getList(pageNo, 20, {
                expand: "-created"
            })
            .then(res => setData(res as unknown as ListResult<StudentInvoicesResponse>))
            .finally(() => setIsLoading(false))
    }, [pageNo, show, count])

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    const handleRollback = (studentInvoiceId: string) => {
        setIsLoading(true)
        api
        .post("/api/a/student-invoices-rollback", {
            studentInvoiceId
        })
        .then(() => {
            toast.success("Invoice deleted!")
            setCount(count + 1)
        })
        .catch(() => toast.error("Invoice delete failed!"))
        .finally(() => setIsLoading(false))
    }

    return (
        <AdminAccordion title="Student Invoice List" show={show} setShow={setShow}>
            <div>
                <button className="btn" onClick={() => setCount(count + 1)}>
                    Refresh Data
                </button>
            </div>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Invoice Id</th>
                            <th>Generated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.id}</code>
                                </td>
                                <td className="uppercase">
                                    {dateViewFormatter.format(new Date(item.created))} {timeViewFormatter.format(new Date(item.created))}
                                </td>
                                <td>
                                    <button className="btn btn-sm" onClick={() => handleRollback(item.id)}>Rollback</button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data?.items.length == 0 && (
                            <tr>
                                <td colSpan={3} className='p-5 bg-base-200 text-center'>
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

export default StudentInvoiceList