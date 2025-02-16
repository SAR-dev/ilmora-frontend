import Card from 'components/Card'
import AdminNavLayout from 'layouts/AdminNavLayout'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { Link } from 'react-router'

const AdminHome = () => {
    return (
        <AdminNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineAdminPanelSettings className='size-5' />}
                    headerTitle='Admin Homepage'
                >
                    <div className='grid grid-cols-5 gap-5 p-5'>
                        <Link to="/a/users" className="btn">Users Manage</Link>
                        <button className="btn">Student Balance List</button>
                        <button className="btn">Teacher Balance List</button>
                        <button className="btn">Invoice Generate</button>
                        <button className="btn">Invoice Manage</button>
                        <button className="btn">Class List</button>
                        <button className="btn">Teacher Manage</button>
                        <button className="btn">Notice Manage</button>
                        <button className="btn">Resource Manage</button>
                    </div>
                </Card>
            </div>
        </AdminNavLayout>
    )
}

export default AdminHome