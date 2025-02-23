import Loading from "components/Loading"
import { pb } from "contexts/PocketContext"
import { getPocketStringError } from "helpers"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Collections } from "types/pocketbase"
import AdminErrorDisplay from "./AdminErrorDisplay"
import AdminAccordion from "./AdminAccordion"
import { FaSearch } from "react-icons/fa"

const UserUpdate = () => {
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        if(searchText.length == 0) return;
        setIsLoading(true)
        pb
            .collection(Collections.Users)
            .getOne(searchText)
            .then(res => {
                setFormData({
                    email: res.email,
                    name: res.name,
                    password: res.password,
                    whatsAppNo: res.whatsAppNo,
                    utcOffset: res.utcOffset,
                    location: res.location
                })
            })
            .catch(() => toast.error("User not found"))
            .finally(() => setIsLoading(false))
    }, [searchText])

    useEffect(() => {
      if(show && inputRef.current){
        inputRef.current.value = searchText
        inputRef.current.focus()
      }
    }, [show])
    
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchText(inputRef.current?.value ?? "");
        }
    };

    const handleUpdateUser = async () => {
        setIsLoading(true)
        setError("")
        try {
            await pb.collection(Collections.Users).update(searchText, {
                ...formData
            })
            setFormData({
                email: "",
                name: "",
                password: "",
                whatsAppNo: "",
                utcOffset: "",
                location: ""
            })
            toast.success("User updated")
        } catch (err: unknown) {
            setError(getPocketStringError(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AdminAccordion title="Update User" show={show} setShow={setShow}>
            <div className="flex gap-2">
                <input
                    placeholder='User Id'
                    type="text"
                    className='input input-bordered w-48'
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-square" onClick={() => setSearchText(inputRef.current?.value ?? "")}>
                    <FaSearch className="size-5" />
                </button>
            </div>
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
                <button className="btn btn-primary" onClick={handleUpdateUser}>
                    Update User
                </button>
            </div>
            <AdminErrorDisplay error={error} />
            {isLoading && <Loading />}
        </AdminAccordion>
    )
}

export default UserUpdate