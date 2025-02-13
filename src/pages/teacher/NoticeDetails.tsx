import Card from 'components/Card'
import DataFetchError from 'components/DataFetchError';
import NotFoundError from 'components/NotFoundError';
import { pb } from 'contexts/PocketContext';
import NavLayout from 'layouts/NavLayout'
import { useEffect, useState } from 'react';
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { useParams } from 'react-router';
import { Collections, NoticesRecord } from 'types/pocketbase';
import parse from 'html-react-parser';
import { dateViewFormatter } from 'helpers';

function NoticeDetails() {
    const { id } = useParams();
    const [noticeData, setNoticeData] = useState<NoticesRecord | null>(null)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (!id || id?.length == 0) return;
        pb
            .collection(Collections.Notices)
            .getOne(id)
            .then(res => setNoticeData(res))
            .catch(err => {
                if (err.status == 404) {
                    setNotFound(true)
                    return;
                }
                setFetchError(err.status != 0)
            })
    }, [id])

    if (notFound) return (
        <NavLayout>
            <NotFoundError />
        </NavLayout>
    )

    if (fetchError) return (
        <NavLayout>
            <DataFetchError />
        </NavLayout>
    )

    return (
        <NavLayout>
            <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
                <Card
                    headerIcon={<MdOutlineNotificationsActive className="size-5" />}
                    headerTitle="Notice Details"
                    headerInfo={
                        <div className="text-primary text-sm">{noticeData?.created ? "Published on " + dateViewFormatter.format(new Date(noticeData.created)) : ""}</div>
                    }
                >
                    <div className="p-5">
                        <div className="font-semibold text-2xl pb-5 mb-5 border-b border-base-300">{noticeData?.title}</div>
                        <article className="prose text-base-content min-w-[fit-content] pb-10">
                            {parse(noticeData?.description ?? "")}
                        </article>
                    </div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default NoticeDetails