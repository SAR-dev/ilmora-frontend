import Card from 'components/Card';
import NavLayout from 'layouts/NavLayout'
import { PiPottedPlantDuotone } from "react-icons/pi";

const RoutineCreate = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<PiPottedPlantDuotone className='size-5' />}
                    headerTitle='Plan Routine for a Student'
                >
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <label className="form-control w-full max-w-xs">
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
                            <label className="form-control w-full max-w-xs">
                                <div className="label pb-2">
                                    <span className="label-text">Your Location</span>
                                </div>
                                <select disabled className="select select-bordered">
                                    <option disabled selected>Dhaka, Bangladesh (+06:00)</option>
                                    <option>Star Wars</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default RoutineCreate