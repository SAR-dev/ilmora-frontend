import { FaArrowRight } from "react-icons/fa";

const RoutineClassLog = () => (
    <div className="flex justify-between py-2 px-5 w-full hover:bg-accent/20 transition duration-150 ease-in-out">
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

export default RoutineClassLog;