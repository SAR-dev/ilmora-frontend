import Card from 'components/Card';
import { constants } from 'constants';
import NavLayout from 'layouts/NavLayout'
import RoutineClassLog from 'components/RoutineClassLog';
import { FaRegCalendarAlt } from 'react-icons/fa';

const RoutineList = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<FaRegCalendarAlt className='size-5' />}
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