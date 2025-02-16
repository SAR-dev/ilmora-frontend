import StudentCreate from 'components/admin/StudentCreate'
import StudentList from 'components/admin/StudentList'
import UserUpdate from 'components/admin/UserUpdate'
import TeacherCreate from 'components/admin/TeacherCreate'
import Card from 'components/Card'
import AdminNavLayout from 'layouts/AdminNavLayout'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import TeacherList from 'components/admin/TeacherList'

const UserManage = () => {
    return (
        <AdminNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineAdminPanelSettings className='size-5' />}
                    headerTitle='User Data manage'
                >
                    <div className="grid grid-cols-1 gap-5 p-5">
                        <StudentCreate />
                        <TeacherCreate />
                        <StudentList />
                        <TeacherList />
                        <UserUpdate />
                    </div>
                </Card>
            </div>
        </AdminNavLayout>
    )
}

export default UserManage