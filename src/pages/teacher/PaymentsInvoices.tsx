import classNames from 'classnames'
import Card from 'components/Card'
import Loading from 'components/Loading'
import { constants } from 'constants'
import { pb, usePocket } from 'contexts/PocketContext'
import { dateTimeViewFormatter, sumArray } from 'helpers'
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast'
import { BsReceiptCutoff } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { Link } from 'react-router'
import { Collections, TeacherExtraPaymentViewResponse, TeacherInvoicePaymentViewResponse } from 'types/pocketbase'

function PaymentsInvoices() {
    const { user } = usePocket()
    const [isLoading, setIsLoading] = useState(false)

    const [invoicePaymentData, setInvoicePaymentData] = useState<TeacherInvoicePaymentViewResponse[]>([])
    const [extraPaymentData, setExtraPaymentData] = useState<TeacherExtraPaymentViewResponse[]>([])

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
        if (!user) return;
        try {
            const [invoiceData, extraData] = await Promise.all([
                pb.collection(Collections.TeacherInvoicePaymentView).getFullList({
                    filter: `userId = '${user.id}'`
                }),
                pb.collection(Collections.TeacherExtraPaymentView).getFullList({
                    filter: `userId = '${user.id}'`
                })
            ]);
            setInvoicePaymentData(invoiceData);
            setExtraPaymentData(extraData);
        } catch (error) {
            if ((error as { status: unknown }).status != 0) {
                toast.error("Error fetching data");
                setInvoicePaymentData([])
                setExtraPaymentData([])
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        setIsLoading(true);
        fetchData();
    }, [user]);

    return (
        <TeacherNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlinePayment className="size-5" />}
                    headerTitle="Payment & Invoices"
                >
                    <div className="grid grid-cols-1 gap-5 p-5">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentData.map((item, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="tooltip tooltip-info tooltip-right" data-tip="View Receipt">
                                                    <Link
                                                        to={`${import.meta.env.VITE_API_URL}/invoice/teacher/${item.teacherInvoiceId}/${item.teacherId}/html`}
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
                                                ) : "-"}
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
                        {paymentData.length > 0 && (
                            <div className="overflow-x-auto border border-base-300">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Total Invoiced</th>
                                            <th>Total Paid</th>
                                            <th>Total Due</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{sumArray(paymentData.map(e => Number(JSON.stringify(e.totalTeachersPrice))))} TK</td>
                                            <td>{sumArray(paymentData.map(e => e.paidAmount))} TK</td>
                                            <td>{Number(sumArray(paymentData.map(e => Number(JSON.stringify(e.totalTeachersPrice))))) - Number(sumArray(paymentData.map(e => e.paidAmount)))} TK</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            {isLoading && <Loading />}
        </TeacherNavLayout>
    )
}

export default PaymentsInvoices