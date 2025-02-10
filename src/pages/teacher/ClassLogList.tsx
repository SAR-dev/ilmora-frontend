import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import RoutineClassLog from 'components/RoutineClassLog';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";

const ClassLogList = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<SiGoogleclassroom className='size-5' />}
                    headerTitle='Student Class Plans'
                >
                    <div className="p-5">
                        <div className="flex mb-5">
                            <label className="form-control max-w-sm flex flex-col">
                                <div className="label pb-2">
                                    <span className="label-text">Select Student</span>
                                </div>
                                <select className="select select-bordered">
                                    <option disabled selected>All</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes of the Apes</option>
                                    <option>Star Trek</option>
                                </select>
                            </label>
                            <div className="flex gap-2 ml-auto items-end">
                                <button className="btn btn-sm">
                                    <FaArrowLeftLong className='size-4' />
                                </button>
                                <button className="btn btn-sm">
                                    <FaArrowRightLong className='size-4' />
                                </button>
                            </div>
                        </div>
                        <div className="card flex-row carousel border border-base-300 flex divide-x divide-base-300">
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                            <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer">
                                28 Aug
                            </button>
                        </div>
                        <div className="card divide-y divide-base-300 h-96 w-full border border-t-0 border-base-300 overflow-y-auto">
                            <RoutineClassLog />
                            <RoutineClassLog />
                            <RoutineClassLog />
                            <RoutineClassLog />
                            <RoutineClassLog />
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogList