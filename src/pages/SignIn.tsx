import Footer from 'components/Footer'
import { useState } from 'react'
import classNames from "classnames";
import { usePocket } from 'contexts/PocketContext';
import toast from 'react-hot-toast';

const SignIn = () => {
    const { login, superLogin } = usePocket()
    const [signType, setSignType] = useState<1 | 2>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleLogIn = () => {
        setIsLoading(true)
        if (signType == 1) {
            login(formData)
                .catch(() => {
                    toast.error("Sign In failed. Please try again.")
                })
                .finally(() => setIsLoading(false))
        }
        if (signType == 2) {
            superLogin(formData)
                .catch(() => {
                    toast.error("Sign In failed. Please try again.")
                })
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <section className='min-h-screen flex flex-col bg-base-200'>
            <div className="flex flex-1 justify-center items-center">
                <div className="card border border-base-300 bg-base-100 overflow-hidden min-w-xs">
                    <div className="flex border-b border-base-300 divide-x divide-base-300">
                        <button
                            className={classNames("flex-1 py-3 hover:bg-primary/75 hover:text-primary-content cursor-pointer", {
                                "bg-base-200": signType != 1,
                                "bg-primary text-primary-content": signType == 1
                            })}
                            onClick={() => setSignType(1)}
                        >
                            Teacher
                        </button>
                        <button
                            className={classNames("flex-1 py-3 hover:bg-primary/75 hover:text-primary-content cursor-pointer", {
                                "bg-base-200": signType != 2,
                                "bg-primary text-primary-content": signType == 2
                            })}
                            onClick={() => setSignType(2)}
                        >
                            Admin
                        </button>
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <input
                            placeholder='Email'
                            type="text"
                            className="input input-bordered"
                            value={formData.email}
                            onChange={e => setFormData({
                                ...formData,
                                email: e.target.value
                            })}
                            disabled={isLoading}
                        />
                        <input
                            placeholder='Password'
                            type="password"
                            className="input input-bordered"
                            value={formData.password}
                            onChange={e => setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                            disabled={isLoading}
                        />
                        <button
                            className="btn w-full"
                            onClick={handleLogIn}
                            disabled={isLoading}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default SignIn