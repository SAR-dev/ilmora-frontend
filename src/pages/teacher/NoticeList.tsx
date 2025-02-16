import Card from 'components/Card'
import NoticeCard from 'components/NoticeCard'
import { api } from 'helpers'
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useState } from 'react';
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { NoticeShortDataType } from 'types/response'

function NoticeList() {
    const [noticeList, setNoticeList] = useState<NoticeShortDataType[]>([])

    useEffect(() => {
        api
            .get("/api/t/notices?limit=20")
            .then(res => setNoticeList(res.data))
    }, [])

    return (
        <TeacherNavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineNotificationsActive className="size-5" />}
                    headerTitle="Notice List"
                >
                    {noticeList.map((data, i) => (
                        <NoticeCard data={data} key={i} />
                    ))}
                </Card>
            </div>
        </TeacherNavLayout>
    )
}

export default NoticeList