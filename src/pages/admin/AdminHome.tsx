import StudentCreate from 'components/admin/StudentCreate'
import StudentInvoiceCreate from 'components/admin/StudentInvoiceCreate'
import StudentInvoiceList from 'components/admin/StudentInvoiceList'
import StudentList from 'components/admin/StudentList'
import TeacherCreate from 'components/admin/TeacherCreate'
import TeacherInvoiceCreate from 'components/admin/TeacherInvoiceCreate'
import TeacherInvoiceList from 'components/admin/TeacherInvoiceList'
import TeacherList from 'components/admin/TeacherList'
import UserUpdate from 'components/admin/UserUpdate'
import Card from 'components/Card'
import AdminNavLayout from 'layouts/AdminNavLayout'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const AdminHome = () => {
    return (
        <AdminNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineAdminPanelSettings className='size-5' />}
                    headerTitle='Admin Panel'
                >
                    {/* <div className='grid grid-cols-5 gap-5 p-5'>
                        <Link to="/a/users" className="btn">Users, Students, Teachers</Link>
                        <button className="btn">Invoices, Balances</button>
                        <button className="btn">Teacher Balance List</button>
                        <button className="btn">Invoice Generate</button>
                        <button className="btn">Invoice Manage</button>
                        <button className="btn">Class List</button>
                        <button className="btn">Teacher Manage</button>
                        <button className="btn">Notice Manage</button>
                        <button className="btn">Resource Manage</button>
                    </div> */}
                    <div className="grid grid-cols-1 gap-5 p-5">
                        <StudentCreate />
                        <TeacherCreate />
                        <StudentList />
                        <TeacherList />
                        <UserUpdate />
                        <StudentInvoiceList />
                        <TeacherInvoiceList />
                        <StudentInvoiceCreate />
                        <TeacherInvoiceCreate />
                    </div>
                </Card>
            </div>
        </AdminNavLayout>
    )
}

export default AdminHome