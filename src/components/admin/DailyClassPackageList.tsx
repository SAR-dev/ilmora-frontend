import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react"
import AdminAccordion from "./AdminAccordion"
import { pb } from "contexts/PocketContext"
import { Collections, DailyClassPackagesResponse } from "types/pocketbase";

const DailyClassPackageList = () => {
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<DailyClassPackagesResponse[]>([])

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        pb
            .collection(Collections.DailyClassPackages).getFullList()
            .then(res => setData(res))
            .finally(() => setIsLoading(false))
    }, [show])

    return (
        <AdminAccordion title="Daily Class Package List" show={show} setShow={setShow}>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Display</th>
                            <th>Title</th>
                            <th>Class Duration</th>
                            <th>Teacher's Price</th>
                            <th>Student's Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <th>
                                    <code className="code bg-base-200 px-2 py-1">{item.id}</code>
                                </th>
                                <td>
                                    {item.hidden ? (
                                        <div className="text-error uppercase font-semibold">hidden</div>
                                    ) : (
                                        <div className="text-success uppercase font-semibold">public</div>
                                    )}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.classMins} Minutes
                                </td>
                                <td>
                                    {item.teachersPrice} TK
                                </td>
                                <td>
                                    {item.studentsPrice} TK
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data.length == 0 && (
                            <tr>
                                <td colSpan={5} className='p-5 bg-base-200 text-center'>
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

export default DailyClassPackageList