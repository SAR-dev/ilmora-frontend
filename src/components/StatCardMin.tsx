import { ClassStatDataType } from "types/response"

const StatCardMin = ({ data }: { data: ClassStatDataType | null }) => {
    return (
        <>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Completed Class</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>
                        {data?.completedClassInfo ?
                            data.completedClassInfo.totalClass :
                            <div className="animate-pulse h-5 w-12 bg-base-300" />
                        }
                    </div>
                </div>
            </div>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Completed Earnings</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>
                        {data?.completedClassInfo ?
                            `${data.completedClassInfo.totalPrice} TK` :
                            <div className="animate-pulse h-5 w-12 bg-base-300" />
                        }
                    </div>
                </div>
            </div>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Pending Class</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>
                        {data?.pendingClassInfo ?
                            data.pendingClassInfo.totalClass :
                            <div className="animate-pulse h-5 w-12 bg-base-300" />
                        }
                    </div>
                </div>
            </div>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Pending Earnings</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>
                        {data?.pendingClassInfo ?
                            `${data.pendingClassInfo.totalPrice} TK` :
                            <div className="animate-pulse h-5 w-12 bg-base-300" />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatCardMin