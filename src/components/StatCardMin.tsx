const StatCardMin = () => {
    return (
        <>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Completed Class</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>30</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2 pl-3 border-l border-base-300">
                    <div>Completed Earnings</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>3000 TK</div>
                </div>
            </div>
            <div className="flex text-sm px-5">
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>Pending Class</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>30</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2 pl-3 border-l border-base-300">
                    <div>Pending Earnings</div>
                </div>
                <div className="flex flex-1 py-3 items-center gap-2">
                    <div>3000 TK</div>
                </div>
            </div>
        </>
    )
}

export default StatCardMin