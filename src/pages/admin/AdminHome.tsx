import DailyClassPackageList from 'components/admin/DailyClassPackageList'
import StudentCreate from 'components/admin/StudentCreate'
import StudentInvoiceByInvoiceNo from 'components/admin/StudentInvoiceByInvoiceNo'
import StudentInvoiceByStudent from 'components/admin/StudentInvoiceByStudent'
import StudentInvoiceCreate from 'components/admin/StudentInvoiceCreate'
import StudentInvoiceList from 'components/admin/StudentInvoiceList'
import StudentList from 'components/admin/StudentList'
import TeacherCreate from 'components/admin/TeacherCreate'
import TeacherInvoiceByInvoiceNo from 'components/admin/TeacherInvoiceByInvoiceNo'
import TeacherInvoiceByTeacher from 'components/admin/TeacherInvoiceByTeacher'
import TeacherInvoiceCreate from 'components/admin/TeacherInvoiceCreate'
import TeacherInvoiceList from 'components/admin/TeacherInvoiceList'
import TeacherList from 'components/admin/TeacherList'
import TeacherStudentList from 'components/admin/TeacherStudentList'
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
                    <div className="grid grid-cols-1">
                        <TeacherCreate />
                        <StudentCreate />
                        <UserUpdate />
                        <TeacherList />
                        <StudentList />
                        <TeacherStudentList />
                        <DailyClassPackageList />
                        <TeacherInvoiceCreate />
                        <StudentInvoiceCreate />
                        <TeacherInvoiceList />
                        <StudentInvoiceList />
                        <TeacherInvoiceByTeacher />
                        <StudentInvoiceByStudent />
                        <TeacherInvoiceByInvoiceNo />
                        <StudentInvoiceByInvoiceNo />
                    </div>
                </Card>
            </div>
        </AdminNavLayout>
    )
}

export default AdminHome