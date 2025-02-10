import Card from 'components/Card';
import { constants } from 'constants';
import NavLayout from 'layouts/NavLayout'
import { PiPottedPlantDuotone } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";

const RoutineClassLog = () => (
    <div className="flex justify-between py-2 px-5 w-full">
        <div className="flex flex-col gap-1">
            <div className="text-sm text-primary/80">08:00 AM</div>
            <div className='text-lg font-semibold'>Shariar Abrar</div>
            <div className="text-sm opacity-80">
                Bangladesh . 150 TK / Class . 30 Mins
            </div>
        </div>
        <div className='flex items-center'>
            <button className="btn btn-square">
                <FaArrowRight className='size-5' />
            </button>
        </div>
    </div>
)

const RoutineList = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<PiPottedPlantDuotone className='size-5' />}
                    headerTitle='Student Routines'
                >
                    <div className="p-5">
                        <label className="form-control max-w-sm flex flex-col mb-5">
                            <div className="label pb-2">
                                <span className="label-text">Select Student</span>
                            </div>
                            <select className="select select-bordered">
                                <option disabled selected>All</option>
                                <option>Star Wars</option>
                                <option>Harry Potter</option>
                                <option>Lord of the Rings</option>
                                <option>Planet of the Apes</option>
                                <option>Star Trek</option>
                            </select>
                        </label>
                        <div className="card flex-row carousel border border-base-300 flex divide-x divide-base-300">
                            {constants.DAY_NAMES.map((day, i) => (
                                <button className="carousel-item flex-1 p-3 min-w-20 justify-center hover:bg-base-200 cursor-pointer" key={i}>
                                    {day}
                                </button>
                            ))}
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

export default RoutineList