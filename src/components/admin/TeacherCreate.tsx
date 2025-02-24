import Loading from "components/Loading"
import { api, getAxiosStringError } from "helpers";
import { useState } from "react"
import toast from "react-hot-toast"
import AdminErrorDisplay from "./AdminErrorDisplay"
import AdminAccordion from "./AdminAccordion"

const TeacherCreate = () => {
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        whatsAppNo: "",
        utcOffset: "",
        location: ""
    })

    const handleCreateTeacher = async () => {
        setIsLoading(true)
        setError("")
        api
            .post("/api/a/teacher", { ...formData })
            .then(() => toast.success("Teacher record created"))
            .catch((err) => setError(getAxiosStringError(err)))
            .finally(() => setIsLoading(false))
    }

    return (
        <AdminAccordion title="Create Teacher" show={show} setShow={setShow}>
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
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleCreateTeacher}>
                    Create User As Teacher
                </button>
            </div>
            <AdminErrorDisplay error={error} />
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default TeacherCreate