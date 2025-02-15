import Card from 'components/Card'
import NavLayout from 'layouts/NavLayout'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const AdminHome = () => {
    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineAdminPanelSettings  className='size-5' />}
                    headerTitle='Admin Homepage'
                >
                    <div className='flex flex-col gap-5 p-5'>
                        <button className="btn w-72 justify-start">Student Balance List</button>
                        <button className="btn w-72 justify-start">Teacher Balance List</button>
                        <button className="btn w-72 justify-start">Invoice Generate</button>
                        <button className="btn w-72 justify-start">Invoice Manage</button>
                        <button className="btn w-72 justify-start">Class List</button>
                        <div className="w-full border border-base-300" />
                        <button className="btn w-72 justify-start">Admin Panel</button>
                        <button className="btn w-72 justify-start">Teacher Student Manage</button>
                        <button className="btn w-72 justify-start">Notice Manage</button>
                        <button className="btn w-72 justify-start">Resource Manage</button>
                        </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default AdminHome