import { ListResult } from "pocketbase"

const PaginateRes = ({
    data,
    handleNext,
    handlePrev
} : {
    data?: ListResult<unknown>
    handleNext: () => void
    handlePrev: () => void
}) => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-5 md:items-center md:justify-between">
            <div className="opacity-50">
                Total {data?.totalItems ?? 0} results found . Showing page {data?.page ?? 1} of {data?.totalPages ?? 1}
            </div>
            <div className="join grid grid-cols-2">
                <button className="join-item btn btn-outline" disabled={data?.page == 1} onClick={handlePrev}>Previous page</button>
                <button className="join-item btn btn-outline" disabled={data?.page == data?.totalPages || data?.totalItems == 0} onClick={handleNext}>Next Page</button>
            </div>
        </div>
    )
}

export default PaginateRes