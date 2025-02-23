import classNames from 'classnames';
import { ReactNode } from 'react';
import { FaChevronDown, FaChevronUp, FaCircle } from 'react-icons/fa';

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
        <div>
            <div className="w-full flex justify-between items-center p-5 border-t border-primary/50 bg-primary/10">
                <div className="flex items-center gap-2 text-primary">
                    <FaCircle className="size-4" />
                    <div className="font-semibold">{title}</div>
                </div>
                <button className={classNames("btn btn-sm btn-primary", { "btn-outline": show })} onClick={toogleShow}>
                    {show ? <FaChevronUp className='size-4' /> : <FaChevronDown className='size-4' />}
                    {show ? "Hide Details" : "Show Details"}
                </button>
            </div>
            {show && <div className='flex flex-col gap-5 p-5'>{children}</div>}
        </div>

    )
}

export default AdminAccordion