import Card from 'components/Card';
import { constants } from 'constants';
import NavLayout from 'layouts/NavLayout'
import { FaInfo, FaRegCalendarPlus } from 'react-icons/fa';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { LuBadgeAlert } from "react-icons/lu";
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { DayPicker } from "react-day-picker"

const RoutineCreate = () => {
    const [isOpen, setIsOpen] = useState(false)

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
                            <label className="form-control max-w-sm">
                                <div className="label pb-2">
                                    <span className="label-text">Your Timezone</span>
                                </div>
                                <select disabled className="select select-bordered">
                                    <option disabled selected>Dhaka, Bangladesh (+06:00)</option>
                                    <option>Star Wars</option>
                                </select>
                            </label>
                            <label className="form-control max-w-sm" onClick={() => setIsOpen(true)}>
                                <div className="label pb-2">
                                    <span className="label-text">Start Date</span>
                                </div>
                                <input type="text" placeholder="DD-MM-YYYY" className="input input-bordered" />
                            </label>
                            <label className="form-control max-w-sm" onClick={() => setIsOpen(true)}>
                                <div className="label pb-2">
                                    <span className="label-text">End Date</span>
                                </div>
                                <input type="text" placeholder="DD-MM-YYYY" className="input input-bordered" />
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
                            {constants.DAY_NAMES.map((day, i) => (
                                <div className="card flex-col sm:flex-row border border-base-300 divide-y divide-base-300" key={i}>
                                    <div className="w-full p-3">
                                        {day}
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
                                        <div className="form-control flex ml-auto">
                                            <label className="cursor-pointer label">
                                                <input type="checkbox" className="checkbox checkbox-sm checkbox-success" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-info/10 border-s-4 border-error/50 p-4">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-error/10 bg-error/30 text-error">
                                        <LuBadgeAlert className='shrink-0 size-4' />
                                    </span>
                                </div>
                                <div className="ms-3">
                                    <h3 className="font-semibold" >
                                        Read Carefully
                                    </h3>
                                    <p className="text-sm text-base-content/50">
                                        If you update routine, incomplete classes will be deleted and created again.
                                    </p>
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
                                Update Routine
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-12">
                        <DayPicker 
                            mode="range" 
                            min={1} 
                            max={200} 
                        />
                        <div className='text-xs text-center'>20 Dec 2025 ~ 20 Dec 2025</div>
                        <button className="btn" onClick={() => setIsOpen(false)}>Save</button>
                    </DialogPanel>
                </div>
            </Dialog>
        </NavLayout>
    )
}

export default RoutineCreate