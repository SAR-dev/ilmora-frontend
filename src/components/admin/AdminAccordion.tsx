import classNames from 'classnames';
import { ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';

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
            <div className="w-full flex justify-between items-center p-5 border-b border-t border-info/50 bg-info/10">
                <div className="flex items-center gap-2 text-info">
                    <FaCircle className="size-4" />
                    <div className="font-semibold">{title}</div>
                </div>
                <button className={classNames("btn btn-sm btn-info", { "btn-outline": show })} onClick={toogleShow}>
                    {show ? "Hide Details" : "Show Details"}
                </button>
            </div>
            <div className='flex flex-col gap-5 p-5'>
                {show && children}
            </div>
        </div>

    )
}

export default AdminAccordion