import { useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";

const Notice = () => {
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => {
        setShowDetails((prevState) => !prevState)
    }

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between">
                <div className="font-semibold">This is a dark alert</div>
                {showDetails ? (
                    <button className="btn btn-sm" onClick={toggleDetails}>
                        <BiSolidChevronUp className="size-4" />
                        Show Less
                    </button>
                ) : (
                    <button className="btn btn-sm" onClick={toggleDetails}>
                        <BiSolidChevronDown className="size-4" />
                        Show More
                    </button>
                )}
            </div>
            {showDetails && (
                <div className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Harum rerum molestiae soluta qui repellendus explicabo?
                    Repellat voluptatum totam perspiciatis, facilis tenetur
                    veniam recusandae quisquam maxime ullam, dignissimos vitae,
                    voluptas dolore.
                </div>
            )}
        </div>
    )
}

export default Notice