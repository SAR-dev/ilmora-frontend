import classNames from 'classnames'
import Card from 'components/Card'
import Loading from 'components/Loading'
import { constants } from 'constants'
import { pb, usePocket } from 'contexts/PocketContext'
import { dateTimeViewFormatter, sumArray } from 'helpers'
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast'
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
                        {paymentData.map((item, i) => (
                            <div className="grid grid-cols-2 border border-base-300 divide-x divide-y divide-base-300 bg-base-200" key={i}>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Invoice Id</div>
                                <div className='px-4 py-2'>
                                    {item.teacherInvoiceId.length > 0 ? (
                                        <Link
                                            to={`${import.meta.env.VITE_API_URL}/invoice/teacher/${item.teacherInvoiceId}/${item.teacherId}/html`}
                                            target="_blank"
                                            className={classNames("btn btn-xs btn-info code uppercase", {
                                                "btn-disabled": item.type == constants.PAYMENT_TYPE.EXTRA_TYPE
                                            })}
                                        >
                                            {item.teacherInvoiceId}
                                        </Link>
                                    ) : ("-")}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Invoiced At</div>
                                <div className='px-4 py-2'>
                                    {JSON.stringify(item.invoicedAt).length > 3 ?
                                        dateTimeViewFormatter(new Date(JSON.parse(JSON.stringify(item.invoicedAt))))
                                        : "-"
                                    }
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Invoiced Amount</div>
                                <div className='px-4 py-2'>
                                    {item.teacherInvoiceId?.length > 0 ? `${JSON.stringify(item.totalTeachersPrice)} TK` : "-"}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Balance Id</div>
                                <div className='px-4 py-2'>
                                    {item.teacherBalanceId?.length > 0 ? (
                                        <code className="code bg-base-200 px-2 py-1">{item.teacherBalanceId}</code>
                                    ) : "-"}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Balanced Atd</div>
                                <div className='px-4 py-2'>
                                    {item.paidAt.length > 3 ? dateTimeViewFormatter(new Date(item.paidAt)) : "-"}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Balanced Amount</div>
                                <div className='px-4 py-2'>
                                    {item.teacherBalanceId?.length > 0 ? `${item.paidAmount} TK` : "-"}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Payment Method</div>
                                <div className='px-4 py-2'>
                                    {item.teacherBalanceId?.length > 0 ? item.paymentMethod : "-"}
                                </div>
                                <div className='px-4 py-2 font-semibold text-base-content/50'>Payment Info</div>
                                <div className='px-4 py-2'>
                                    {item.paymentInfo}
                                </div>
                            </div>
                        ))}
                        {!isLoading && paymentData.length == 0 && (
                            <div className='p-5 bg-base-200 text-center w-full'>
                                    No Payments Found
                            </div>
                        )}
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