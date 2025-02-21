import Loading from "components/Loading"
import { useEffect, useMemo, useRef, useState } from "react";
import AdminAccordion from "./AdminAccordion"
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { pb } from "contexts/PocketContext";
import { Collections, StudentExtraPaymentViewResponse, StudentInvoicePaymentViewResponse } from "types/pocketbase";
import { dateTimeViewFormatter, sumArray } from "helpers";
import { Dialog, DialogPanel } from "@headlessui/react";
import { TexpandStudentListWithUser } from "types/extended";
import { Link } from "react-router";
import { BsReceiptCutoff } from "react-icons/bs";
import classNames from "classnames";
import { constants } from "constants";

const StudentInvoiceByStudent = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")

    const [invoicePaymentData, setInvoicePaymentData] = useState<StudentInvoicePaymentViewResponse[]>([])
    const [extraPaymentData, setExtraPaymentData] = useState<StudentExtraPaymentViewResponse[]>([])
    const [studentData, setStudentData] = useState<TexpandStudentListWithUser | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [paymentAddData, setPaymentAddData] = useState({
        studentInvoiceId: "",
        paidAmount: 0,
        paymentMethod: "",
        paymentInfo: ""
    })

    const paymentData = useMemo(() => {
        return [
            ...invoicePaymentData.map(e => {
                return { ...e, type: constants.PAYMENT_TYPE.INVOICE_TYPE }
            }),
            ...extraPaymentData.map(e => {
                return { ...e, type: constants.PAYMENT_TYPE.EXTRA_TYPE }
            })
        ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }, [invoicePaymentData, extraPaymentData])

    const fetchData = async () => {
        try {
            const [invoiceData, extraData, student] = await Promise.all([
                pb.collection(Collections.StudentInvoicePaymentView).getFullList({
                    filter: `studentId = '${searchText}'`
                }),
                pb.collection(Collections.StudentExtraPaymentView).getFullList({
                    filter: `studentId = '${searchText}'`
                }),
                pb.collection(Collections.Students).getOne(searchText, {
                    expand: "userId"
                })
            ]);

            setInvoicePaymentData(invoiceData);
            setExtraPaymentData(extraData);
            setStudentData(student as unknown as TexpandStudentListWithUser)
        } catch (error) {
            console.log(error)
            toast.error("Error fetching data");
            setInvoicePaymentData([])
            setExtraPaymentData([])
            setStudentData(null)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!show || searchText.length === 0) return;
        setIsLoading(true);
        fetchData();
    }, [searchText, show, count]);

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

    const handleOpenModal = (studentInvoiceId: string) => {
        if (!studentData) return;
        setIsOpen(true)
        setPaymentAddData({
            studentInvoiceId,
            paidAmount: 0,
            paymentMethod: "",
            paymentInfo: ""
        })
    }

    const handleCloseModal = () => {
        setIsOpen(false)
        setPaymentAddData({
            studentInvoiceId: "",
            paidAmount: 0,
            paymentMethod: "",
            paymentInfo: ""
        })
    }

    const handleUpdateBalance = () => {
        if (!studentData || paymentAddData.paidAmount == 0)
            setIsLoading(true)
        pb.collection(Collections.StudentBalances).create({
            studentId: studentData?.id,
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
        <AdminAccordion title="Student Payments By Student" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <input
                        placeholder='Student Id'
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
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Location</th>
                            <th>Total Due</th>
                            <th>Total Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData && (
                            <tr>
                                <td>
                                    <code className="code bg-base-200 px-2 py-1">{studentData.expand.userId.id}</code>
                                </td>
                                <td>{studentData.expand.userId.name}</td>
                                <td>{studentData.expand.userId.email}</td>
                                <td>{studentData.expand.userId.whatsAppNo}</td>
                                <td>{studentData.expand.userId.location}</td>
                                <td>{sumArray(paymentData.map(e => JSON.parse(JSON.stringify(e.totalStudentsPrice))))} TK</td>
                                <td>{sumArray(paymentData.map(e => e.paidAmount))} TK</td>
                                <td>
                                    <button className="btn btn-sm btn-info" onClick={() => handleOpenModal("")}>
                                        Add Blank Payment
                                    </button>
                                </td>
                            </tr>
                        )}
                        {!studentData && (
                            <tr>
                                <td colSpan={8} className='p-5 bg-base-200 text-center'>
                                    No Student Found
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
                            <th></th>
                            <th>Invoice Id</th>
                            <th>Invoiced At</th>
                            <th>Invoiced Amount</th>
                            <th>Balance Id</th>
                            <th>Balanced At</th>
                            <th>Balanced Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="tooltip tooltip-info tooltip-right" data-tip="View Receipt">
                                        <Link
                                            to={`${import.meta.env.VITE_API_URL}/invoice/student/${item.studentInvoiceId}/${item.studentId}/html`}
                                            target="_blank"
                                            className={classNames("btn btn-square btn-sm", {
                                                "btn-disabled": item.type == constants.PAYMENT_TYPE.EXTRA_TYPE
                                            })}
                                        >
                                            <BsReceiptCutoff className="size-4" />
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    {item.studentInvoiceId?.length > 0 ? (
                                        <code className="code bg-base-200 px-2 py-1">{item.studentInvoiceId}</code>
                                    ) : "-"}
                                </td>
                                <td>
                                    {JSON.stringify(item.invoicedAt).length > 3 ?
                                        dateTimeViewFormatter(new Date(JSON.parse(JSON.stringify(item.invoicedAt))))
                                        : "-"
                                    }
                                </td>
                                <td>
                                    {item.studentInvoiceId?.length > 0 ? `${JSON.stringify(item.totalStudentsPrice)} TK` : "-"}
                                </td>
                                <td>
                                    {item.studentBalanceId?.length > 0 ? (
                                        <code className="code bg-base-200 px-2 py-1">{item.studentBalanceId}</code>
                                    ) : <button className="btn btn-info btn-sm" onClick={() => handleOpenModal(item.studentInvoiceId)}>Add Payment</button>}
                                </td>
                                <td>
                                    {item.paidAt.length > 3 ? dateTimeViewFormatter(new Date(item.paidAt)) : "-"}
                                </td>
                                <td>
                                    {item.studentBalanceId?.length > 0 ? `${item.paidAmount} TK` : "-"}
                                </td>
                                <td>
                                    {item.studentBalanceId?.length > 0 ? item.paymentMethod : "-"}
                                </td>
                            </tr>
                        ))}
                        {!isLoading && paymentData.length == 0 && (
                            <tr>
                                <td colSpan={9} className='p-5 bg-base-200 text-center'>
                                    No Payments Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default StudentInvoiceByStudent