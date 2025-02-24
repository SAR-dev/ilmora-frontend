import Loading from "components/Loading"
import { api, getAxiosStringError } from "helpers";
import { useEffect, useState } from "react"
import AdminErrorDisplay from "./AdminErrorDisplay"
import AdminAccordion from "./AdminAccordion"
import toast from "react-hot-toast";
import { pb } from "contexts/PocketContext";
import { Collections } from "types/pocketbase";

const StudentCreate = () => {
    const [show, setShow] = useState(false)
    const [showTeacher, setShowTeacher] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        whatsAppNo: "",
        utcOffset: "",
        location: "",
        teacherId: "",
        classLink: "",
        dailyClassPackageId: "",
        dailyClassTeachersPrice: "",
        dailyClassStudentsPrice: ""
    })

    const handleCreateStudent = async () => {
        setIsLoading(true)
        setError("")
        api
            .post("/api/a/student", { ...formData })
            .then(() => toast.success("Student record created"))
            .catch((err) => setError(getAxiosStringError(err)))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        setIsLoading(true)
        pb
            .collection(Collections.DailyClassPackages)
            .getOne(formData.dailyClassPackageId)
            .then(res => {
                setFormData({
                    ...formData,
                    dailyClassTeachersPrice: res.teachersPrice.toString(),
                    dailyClassStudentsPrice: res.studentsPrice.toString()
                })
            })
            .finally(() => setIsLoading(false))
    }, [formData.dailyClassPackageId])


    return (
        <AdminAccordion title="Create Student" show={show} setShow={setShow}>
            <div className="grid grid-cols-4 gap-5">
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">Email</span>
                    </div>
                    <input
                        placeholder='xxx@mail.com'
                        type="text"
                        className='input input-bordered'
                        value={formData.email}
                        onChange={e => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                    />
                </label>
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        placeholder='Name'
                        type="text"
                        className='input input-bordered'
                        value={formData.name}
                        onChange={e => setFormData({
                            ...formData,
                            name: e.target.value
                        })}
                    />
                </label>
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">Password</span>
                    </div>
                    <input
                        placeholder='*****'
                        type="text"
                        className='input input-bordered'
                        value={formData.password}
                        onChange={e => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                    />
                </label>
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">WhatsApp No</span>
                    </div>
                    <input
                        placeholder='+(880)*******'
                        type="text"
                        className='input input-bordered'
                        value={formData.whatsAppNo}
                        onChange={e => setFormData({
                            ...formData,
                            whatsAppNo: e.target.value
                        })}
                    />
                </label>
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">Utc Offset</span>
                    </div>
                    <input
                        placeholder='+HH:MM'
                        type="text"
                        className='input input-bordered'
                        value={formData.utcOffset}
                        onChange={e => setFormData({
                            ...formData,
                            utcOffset: e.target.value
                        })}
                    />
                </label>
                <label className="form-control">
                    <div className="label pb-2">
                        <span className="label-text">Location</span>
                    </div>
                    <input
                        placeholder='Dhaka, Bangladesh'
                        type="text"
                        className='input input-bordered'
                        value={formData.location}
                        onChange={e => setFormData({
                            ...formData,
                            location: e.target.value
                        })}
                    />
                </label>
                {!showTeacher && (
                    <div className="flex items-end">
                        <button className="btn btn-info" onClick={() => setShowTeacher(true)}>Assign Teacher</button>
                    </div>
                )}
            </div>
            {showTeacher && (<>
                <hr className="opacity-50" />
                <div className="grid grid-cols-4 gap-5">
                    <label className="form-control">
                        <div className="label pb-2">
                            <span className="label-text">Teacher Id</span>
                        </div>
                        <input
                            placeholder=''
                            type="text"
                            className='input input-bordered'
                            value={formData.teacherId}
                            onChange={e => setFormData({
                                ...formData,
                                teacherId: e.target.value
                            })}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label pb-2">
                            <span className="label-text">Class Link</span>
                        </div>
                        <input
                            placeholder=''
                            type="text"
                            className='input input-bordered'
                            value={formData.classLink}
                            onChange={e => setFormData({
                                ...formData,
                                classLink: e.target.value
                            })}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label pb-2">
                            <span className="label-text">Class Package Id</span>
                        </div>
                        <input
                            placeholder=''
                            type="text"
                            className='input input-bordered'
                            value={formData.dailyClassPackageId}
                            onChange={e => setFormData({
                                ...formData,
                                dailyClassPackageId: e.target.value
                            })}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label pb-2">
                            <span className="label-text">Teacher's Price</span>
                        </div>
                        <input
                            placeholder=''
                            type="text"
                            className='input input-bordered'
                            value={formData.dailyClassTeachersPrice}
                            onChange={e => setFormData({
                                ...formData,
                                dailyClassTeachersPrice: e.target.value
                            })}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label pb-2">
                            <span className="label-text">Student's Price</span>
                        </div>
                        <input
                            placeholder=''
                            type="text"
                            className='input input-bordered'
                            value={formData.dailyClassStudentsPrice}
                            onChange={e => setFormData({
                                ...formData,
                                dailyClassStudentsPrice: e.target.value
                            })}
                        />
                    </label>
                </div>
            </>)}
            <div>
                <button className="btn btn-primary" onClick={handleCreateStudent}>
                    Create User As Student {showTeacher && "& Assign Teacher"}
                </button>
            </div>
            <AdminErrorDisplay error={error} />
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default StudentCreate