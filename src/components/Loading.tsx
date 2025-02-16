const Loading = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-base-300/75">
            <div className="flex flex-col gap-2 items-center">
                <span className="loading loading-spinner text-primary loading-lg" />
                <div className="flex gap-2">
                    <span className="loading loading-dots loading-xs" />
                    Submitting Data
                    <span className="loading loading-dots loading-xs" />
                </div>
            </div>
        </div>
    )
}

export default Loading