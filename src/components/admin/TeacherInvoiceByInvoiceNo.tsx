import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { pb } from "contexts/PocketContext";
import {
    Collections,
    TeacherExtraPaymentViewResponse,
    TeacherInvoicePaymentViewResponse,
} from "types/pocketbase";
import { dateTimeViewFormatter } from "helpers";
import { Dialog, DialogPanel } from "@headlessui/react";
import { ListResult } from "pocketbase";
import PaginateRes from "./PaginateRes";
import { Link } from "react-router";
import { BsReceiptCutoff } from "react-icons/bs";

const TeacherInvoiceByInvoiceNo = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")
    const [pageNo, setPageNo] = useState(1)

    const [invoicePaymentData, setInvoicePaymentData] = useState<ListResult<TeacherInvoicePaymentViewResponse>>()
    const [extraPaymentData, setExtraPaymentData] = useState<ListResult<TeacherExtraPaymentViewResponse>>()

    const [isOpen, setIsOpen] = useState(false)
    const [paymentAddData, setPaymentAddData] = useState({
        teacherId: "",
        teacherInvoiceId: "",
        paidAmount: 0,
        paymentMethod: "",
        paymentInfo: ""
    })

    const fetchData = async () => {
        try {
            const [invoiceData, extraData] = await Promise.all([
                pb.collection(Collections.TeacherInvoicePaymentView).getList(pageNo, 20, {
                    filter: `teacherInvoiceId = '${searchText}'`
                }),
                pb.collection(Collections.TeacherExtraPaymentView).getList(pageNo, 20, {
                    filter: `teacherId = '${searchText}'`
                })
            ]);

            setInvoicePaymentData(invoiceData);
            setExtraPaymentData(extraData);
        } catch (error) {
            console.log(error)
            toast.error("Error fetching data");
            setInvoicePaymentData(undefined)
            setExtraPaymentData(undefined)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!show || searchText.length === 0) return;
        setIsLoading(true);
        fetchData();
    }, [searchText, show, count, pageNo]);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.value = searchText
            inputRef.current.focus()
        }
    }, [show])

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchText(inputRef.current?.value ?? "");
        }
    };

    const handleOpenModal = (teacherId: string, teacherInvoiceId: string) => {
        setIsOpen(true)
        setPaymentAddData({
            teacherId,
            teacherInvoiceId,
            paidAmount: 0,
            paymentMethod: "",
            paymentInfo: ""
        })
    }

    const handleCloseModal = () => {
        setIsOpen(false)
        setPaymentAddData({
            teacherId: "",
            teacherInvoiceId: "",
            paidAmount: 0,
            paymentMethod: "",
            paymentInfo: ""
        })
    }

    const handleUpdateBalance = () => {
        if (paymentAddData.paidAmount == 0)
            setIsLoading(true)
        pb.collection(Collections.TeacherBalances).create({
            ...paymentAddData
        })
            .then(() => {
                toast.success("Balance added")
                handleCloseModal()
                setCount(count + 1)
            })
            .catch(() => toast.error("Failed to add payment"))
            .finally(() => setIsLoading(false))
    }

    return (
        <AdminAccordion title="Teacher Invoice By Invoice No" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <input
                        placeholder='Teacher Invoice Id'
                        type="text"
                        className='input input-bordered w-48 uppercase placeholder:normal-case'
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-square" onClick={() => setSearchText(inputRef.current?.value ?? "")}>
                        <FaSearch className="size-5" />
                    </button>
                </div>
                <div className="flex gap-5">
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
                            <th>Invoice Id</th>
                            <th>Invoiced At</th>
                            <th>Invoiced Amount</th>
                            <th>Balance Id</th>
                            <th>Balanced At</th>
                            <th>Balanced Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Info</th>
                            <th>User Id</th>
                            <th>Teacher Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoicePaymentData?.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="tooltip tooltip-info tooltip-right" data-tip="View Receipt">
                                        <Link
                                            to={`${import.meta.env.VITE_API_URL}/invoice/teacher/${item.teacherInvoiceId}/${item.teacherId}/html`}
                                            target="_blank"
                                            className="btn btn-square btn-sm"
                                        >
                                            <BsReceiptCutoff className="size-4" />
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    {item.teacherInvoiceId?.length > 0 ? (
                                        <code className="code bg-base-200 px-2 py-1">{item.teacherInvoiceId}</code>
                                    ) : "-"}
                                </td>
                                <td>
                                    {JSON.stringify(item.invoicedAt).length > 3 ?
                                        dateTimeViewFormatter(new Date(JSON.parse(JSON.stringify(item.invoicedAt))))
                                        : "-"
                                    }
                                </td>
                                <td>
                                    {item.teacherInvoiceId?.length > 0 ? `${JSON.stringify(item.totalTeachersPrice)} TK` : "-"}
                                </td>
                                <td>
                                    {item.teacherBalanceId?.length > 0 ? (
                                        <code className="code bg-base-200 px-2 py-1">{item.teacherBalanceId}</code>
                                    ) : <button className="btn btn-info btn-sm" onClick={() => handleOpenModal(item.teacherId ,item.teacherInvoiceId)}>Add Payment</button>}
                                </td>
                                <td>
                                    {item.paidAt.length > 3 ? dateTimeViewFormatter(new Date(item.paidAt)) : "-"}
                                </td>
                                <td>
                                    {item.teacherBalanceId?.length > 0 ? `${item.paidAmount} TK` : "-"}
                                </td>
                                <td>
                                    {item.teacherBalanceId?.length > 0 ? item.paymentMethod : "-"}
                                </td>
                                <td>
                                    {item.userId}
                                </td>
                                <td>
                                    {item.teacherId}
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
                            </tr>
                        ))}
                        {!isLoading && (!invoicePaymentData || invoicePaymentData?.items.length == 0) && (
                            <tr>
                                <td colSpan={15} className='p-5 bg-base-200 text-center'>
                                    No Invoiced Payments Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Balance Id</th>
                            <th>Balanced At</th>
                            <th>Balanced Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Info</th>
                            <th>User Id</th>
                            <th>Teacher Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extraPaymentData?.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{item.teacherBalanceId}</code>
                                </td>
                                <td>
                                    {dateTimeViewFormatter(new Date(item.paidAt))}
                                </td>

                                <td>
                                    {item.paidAmount} TK
                                </td>
                                <td>
                                    {item.paymentMethod}
                                </td>
                                <td>
                                    {item.paymentInfo}
                                </td>
                                <td>
                                    {item.userId}
                                </td>
                                <td>
                                    {item.teacherId}
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
                            </tr>
                        ))}
                        {!isLoading && (!extraPaymentData || extraPaymentData?.items.length == 0) && (
                            <tr>
                                <td colSpan={11} className='p-5 bg-base-200 text-center'>
                                    No Extra Payments Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <PaginateRes data={invoicePaymentData} handleNext={handleNext} handlePrev={handlePrev} />
            </div>
            <Dialog open={isOpen} onClose={handleCloseModal} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <label className="form-control w-full w-48">
                                <div className="label pb-2">
                                    <span className="label-text">Paid Amount</span>
                                </div>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={paymentAddData.paidAmount}
                                    onChange={e => setPaymentAddData({ ...paymentAddData, paidAmount: Number(e.target.value) })}
                                />
                            </label>
                            <label className="form-control w-full w-48">
                                <div className="label pb-2">
                                    <span className="label-text">Payment Method</span>
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={paymentAddData.paymentMethod}
                                    onChange={e => setPaymentAddData({ ...paymentAddData, paymentMethod: e.target.value })}
                                />
                            </label>
                            <label className="form-control w-full w-48">
                                <div className="label pb-2">
                                    <span className="label-text">Payment Info</span>
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={paymentAddData.paymentInfo}
                                    onChange={e => setPaymentAddData({ ...paymentAddData, paymentInfo: e.target.value })}
                                />
                            </label>
                            <button
                                className="btn btn-primary w-full"
                                onClick={handleUpdateBalance}
                                disabled={isLoading}
                            >
                                Submit Payment
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default TeacherInvoiceByInvoiceNo