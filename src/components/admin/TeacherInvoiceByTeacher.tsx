import Loading from "components/Loading"
import { useEffect, useMemo, useRef, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { pb } from "contexts/PocketContext";
import {
    Collections,
    TeacherExtraPaymentViewResponse,
    TeacherInvoicePaymentViewResponse,
} from "types/pocketbase";
import { dateTimeViewFormatter, sumArray } from "helpers";

const TeacherInvoiceByTeacher = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")

    const [invoicePaymentData, setInvoicePaymentData] = useState<TeacherInvoicePaymentViewResponse[]>([])
    const [extraPaymentData, setExtraPaymentData] = useState<TeacherExtraPaymentViewResponse[]>([])

    const paymentData = useMemo(() => {
        return [...invoicePaymentData, ...extraPaymentData].sort((a, b) => new Date(a.paidAt).getTime() - new Date(b.paidAt).getTime())
    }, [invoicePaymentData, extraPaymentData])

    useEffect(() => {
        if (!show || searchText.length === 0) return;

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const [invoiceData, extraData] = await Promise.all([
                    pb.collection(Collections.TeacherInvoicePaymentView).getFullList({
                        filter: `teacherId = '${searchText}'`
                    }),
                    pb.collection(Collections.TeacherExtraPaymentView).getFullList({
                        filter: `teacherId = '${searchText}'`
                    })
                ]);

                setInvoicePaymentData(invoiceData);
                setExtraPaymentData(extraData);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_) {
                toast.error("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchText, show, count]);


    return (
        <AdminAccordion title="Teacher Invoice History" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <input
                        placeholder='Teacher Id'
                        type="text"
                        className='input input-bordered w-48'
                        ref={inputRef}
                    />
                    <button className="btn btn-square" onClick={() => setSearchText(inputRef.current?.value ?? "")}>
                        <FaSearch className="size-5" />
                    </button>
                    <div className="border border-base-300 w-48 h-full flex items-center px-2">
                        Total Due: {sumArray(paymentData.map(e => JSON.parse(JSON.stringify(e.totalTeachersPrice))))}
                    </div>
                    <div className="border border-base-300 w-48 h-full flex items-center px-2">
                        Total Paid: {sumArray(paymentData.map(e => e.paidAmount))}
                    </div>
                </div>
                <div className="flex gap-5">
                    <button className="btn">
                        Add Payment
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
                            <th>Invoiced At</th>
                            <th>Paid At</th>
                            <th>User Id</th>
                            <th>Teacher Id</th>
                            <th>Invoice Id</th>
                            <th>Balance Id</th>
                            <th>Due Amount</th>
                            <th>Paid Amount</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Location</th>
                            <th>Payment Method</th>
                            <th>Payment Info</th>
                            <th>Message</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    {JSON.stringify(item.invoicedAt).length > 3 ? dateTimeViewFormatter.format(new Date(JSON.parse(JSON.stringify(item.invoicedAt)))) : "N/A"}
                                </td>
                                <td>
                                    {item.paidAt.length > 3 ? dateTimeViewFormatter.format(new Date(item.paidAt)) : "N/A"}
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.userId}</code>
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherId}</code>
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherInvoiceId}</code>
                                </td>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherBalanceId}</code>
                                </td>
                                <td>
                                    {JSON.stringify(item.totalTeachersPrice)} TK
                                </td>
                                <td>
                                    {item.paidAmount} TK
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
                                    {item.paymentMethod}
                                </td>
                                <td>
                                    {item.paymentInfo}
                                </td>
                                <td>
                                    <button className="btn w-32">Send Message</button>
                                </td>
                                <td>
                                    <button className="btn w-32">View Details</button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && paymentData.length == 0 && (
                            <tr>
                                <td colSpan={16} className='p-5 bg-base-200 text-center'>
                                    No Result Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default TeacherInvoiceByTeacher