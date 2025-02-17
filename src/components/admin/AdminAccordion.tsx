import { ReactNode } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const AdminAccordion = ({ 
    title, 
    children,
    show,
    setShow
}: { 
    title: string, 
    children: ReactNode,
    show: boolean,
    setShow: (props: boolean) => void
}) => {
    const toogleShow = () => setShow(!show)

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full flex justify-between items-center pb-5 border-b border-info/50">
                <div className="flex items-center gap-2 text-info">
                    <FaChevronRight className="size-4" />
                    <div className="font-semibold">{title}</div>
                </div>
                <button className="btn btn-sm btn-info btn-outline" onClick={toogleShow}>
                    {show ? "Hide Details" : "Show Details"}
                </button>
            </div>
            {show && children}
        </div>

    )
}

export default AdminAccordion