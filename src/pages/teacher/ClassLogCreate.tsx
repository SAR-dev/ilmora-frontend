import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import { FaInfo, FaPlus, FaRegCalendarPlus } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { withMask } from 'use-mask-input';

const ClassInput = () => {
    return (
        <div className="card flex-col sm:flex-row border border-base-300 sm:divide-none divide-y divide-base-300">
            <div className="w-full p-3">
                <input
                    type="text"
                    placeholder='DD-MM-YYYY'
                    className="input-sm input input-bordered w-32"
                    ref={withMask('99-99-9999')}
                />
            </div>
            <div className="flex gap-2 p-3 items-center">
                <select className="select select-sm w-20 select-bordered">
                    <option disabled selected>HH</option>
                    <option>01</option>
                </select>
                <select className="select select-sm w-20 select-bordered">
                    <option disabled selected>MM</option>
                    <option>01</option>
                </select>
                <select className="select select-sm w-20 select-bordered">
                    <option disabled selected>-</option>
                    <option>AM</option>
                </select>
            </div>
        </div>
    )
}

const ClassLogCreate = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<FaRegCalendarPlus className='size-5' />}
                    headerTitle='Plan Routine for a Student'
                >
                    <div className="p-5 flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <label className="form-control max-w-sm">
                                <div className="label pb-2">
                                    <span className="label-text">Select Student</span>
                                </div>
                                <select className="select select-bordered">
                                    <option disabled selected>-</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes</option>
                                    <option>Star Trek</option>
                                </select>
                            </label>
                        </div>
                        <div className="bg-info/10 border-s-4 border-info/50 p-4">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-info/10 bg-info/30 text-info">
                                        <FaInfo className='shrink-0 size-4' />
                                    </span>
                                </div>
                                <div className="ms-3">
                                    <h3 className="font-semibold" >
                                        Quran English
                                    </h3>
                                    <p className="text-sm text-base-content/50">
                                        Class duration is 75 Mins per class.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            {[...Array(2)].map((_, i) => (
                                <ClassInput key={i} />
                            ))}
                            <div className="card flex-col sm:flex-row border border-base-300 divide-y divide-base-300">
                                <div className="w-full p-3">
                                    <button className="btn btn-sm">
                                        <FaPlus className='size-3' />
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button className="btn">
                                <IoIosArrowRoundBack className='size-5' />
                                Back
                            </button>
                            <button className="btn btn-primary">
                                <IoSaveOutline className='size-5' />
                                Add Class Plans
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogCreate