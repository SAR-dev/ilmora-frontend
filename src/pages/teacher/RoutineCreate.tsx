import Card from 'components/Card';
import { constants } from 'constants';
import NavLayout from 'layouts/NavLayout'
import { FaInfo } from 'react-icons/fa';
import { PiPottedPlantDuotone } from "react-icons/pi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";

const RoutineCreate = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<PiPottedPlantDuotone className='size-5' />}
                    headerTitle='Plan Routine for a Student'
                >
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex gap-5">
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
                                    <span className="label-text">Your Location</span>
                                </div>
                                <select disabled className="select select-bordered">
                                    <option disabled selected>Dhaka, Bangladesh (+06:00)</option>
                                    <option>Star Wars</option>
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                            {constants.DAY_NAMES.map((day, i) => (
                                <div className="flex gap-3" key={i}>
                                    <button className='card items-center justify-center aspect-square w-full bg-base-300 uppercase'>
                                        {day}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between'>
                            <button className="btn">
                                <IoIosArrowRoundBack className='size-5' />
                                Back
                            </button>
                            <button className="btn btn-primary">
                                <IoSaveOutline className='size-5' />
                                Register Routine
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default RoutineCreate