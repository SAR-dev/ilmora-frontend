import Loading from "components/Loading"
import { useEffect, useRef, useState } from "react"
import AdminAccordion from "./AdminAccordion"
import { pb } from "contexts/PocketContext"
import { Collections } from "types/pocketbase";
import { ListResult } from "pocketbase"
import { TexpandTeacherStudentRelListWithUser } from "types/extended";
import PaginateRes from "./PaginateRes"
import { FaSearch } from "react-icons/fa";
import CopyToClipboard from "components/CopyToClipboard";

const TeacherStudentList = () => {
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const studentInputRef = useRef<HTMLInputElement>(null);
    const teacherInputRef = useRef<HTMLInputElement>(null);
    const [searchStudentName, setSearchStudentName] = useState("")
    const [searchTeacherName, setSearchTeacherName] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState<ListResult<TexpandTeacherStudentRelListWithUser>>()

    useEffect(() => {
        if (!show) return;
        setIsLoading(true)
        pb
            .collection(Collections.TeacherStudentRel).getList(pageNo, 20, {
                filter: `studentId.userId.name ~ '${searchStudentName}' && teacherId.userId.name ~ '${searchTeacherName}'`,
                expand: "studentId.userId, teacherId.userId, dailyClassPackageId"
            })
            .then(res => setData(res as unknown as ListResult<TexpandTeacherStudentRelListWithUser>))
            .finally(() => setIsLoading(false))
    }, [pageNo, searchStudentName, searchTeacherName, show, count])

    useEffect(() => {
        if (show && studentInputRef.current) {
            studentInputRef.current.value = searchStudentName
            studentInputRef.current.focus()
        }
        if (show && teacherInputRef.current) {
            teacherInputRef.current.value = searchTeacherName
        }
    }, [show])


    const handleStudentKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchStudentName(studentInputRef.current?.value ?? "");
        }
    };

    const handleTeacherKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchTeacherName(teacherInputRef.current?.value ?? "");
        }
    };

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    return (
        <AdminAccordion title="Teacher Student List" show={show} setShow={setShow}>
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <div className="flex gap-2">
                        <input
                            placeholder='Student Name'
                            type="text"
                            className='input input-bordered w-48'
                            ref={studentInputRef}
                            onKeyDown={handleStudentKeyDown}
                        />
                        <button className="btn btn-square" onClick={() => setSearchStudentName(studentInputRef.current?.value ?? "")}>
                            <FaSearch className="size-5" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <input
                            placeholder='Teacher Name'
                            type="text"
                            className='input input-bordered w-48'
                            ref={teacherInputRef}
                            onKeyDown={handleTeacherKeyDown}
                        />
                        <button className="btn btn-square" onClick={() => setSearchTeacherName(teacherInputRef.current?.value ?? "")}>
                            <FaSearch className="size-5" />
                        </button>
                    </div>
                </div>
                <button className="btn" onClick={() => setCount(count + 1)}>
                    Refresh Data
                </button>
            </div>
            <div className="overflow-x-auto border border-base-300">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tea. Stu. Id</th>
                            <th>Teacher Id</th>
                            <th>Teacher Name</th>
                            <th>Teacher WhatsApp</th>
                            <th>Student Id</th>
                            <th>Student Name</th>
                            <th>Student WhatsApp</th>
                            <th>Class Link</th>
                            <th>Package Name</th>
                            <th>Teacher's Price</th>
                            <th>Student's Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items.map((item, i) => (
                            <tr key={i}>
                                <th>
                                    <CopyToClipboard text={item.id}>
                                        <code className="code bg-base-200 px-2 py-1">{item.id}</code>
                                    </CopyToClipboard>
                                </th>
                                <td>
                                    <CopyToClipboard text={item.expand.teacherId.id}>
                                        <code className="code bg-base-200 px-2 py-1">{item.expand.teacherId.id}</code>
                                    </CopyToClipboard>
                                </td>
                                <td>
                                    {item.expand.teacherId.expand.userId.name}
                                </td>
                                <td>
                                    {item.expand.teacherId.expand.userId.whatsAppNo}
                                </td>
                                <td>
                                    <CopyToClipboard text={item.expand.studentId.id}>
                                        <code className="code bg-base-200 px-2 py-1">{item.expand.studentId.id}</code>
                                    </CopyToClipboard>
                                </td>
                                <td>
                                    {item.expand.studentId.expand.userId.name}
                                </td>
                                <td>
                                    {item.expand.studentId.expand.userId.whatsAppNo}
                                </td>
                                <td>
                                    <div className="tooltip tooltip-info flex" data-tip={item.classLink}>
                                        <a
                                            href={item.classLink}
                                            target="_blank"
                                            className="btn btn-sm"
                                        >
                                            Class Link
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    {item.expand.dailyClassPackageId.title}
                                </td>
                                <td>
                                    {item.expand.dailyClassPackageId.teachersPrice} TK
                                </td>
                                <td>
                                    {item.expand.dailyClassPackageId.studentsPrice} TK
                                </td>
                            </tr>
                        ))}
                        {!isLoading && data?.items.length == 0 && (
                            <tr>
                                <td colSpan={11} className='p-5 bg-base-200 text-center'>
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

export default TeacherStudentList