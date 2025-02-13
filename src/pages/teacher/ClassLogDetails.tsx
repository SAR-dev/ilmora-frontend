import Card from 'components/Card'
import DataFetchError from 'components/DataFetchError';
import NotFoundError from 'components/NotFoundError';
import NavLayout from 'layouts/NavLayout'
import { useEffect, useState } from 'react';
import { RiMastodonLine } from 'react-icons/ri'
import { useParams } from 'react-router';

const ClassLogDetails = () => {
    const { id } = useParams();

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
            if (!id || id?.length == 0) return;
            // pb
            //     .collection(Collections.ClassLogs)
            //     .getOne(id)
            //     .then(res => setNoticeData(res))
            //     .catch(err => {
            //         if (err.status == 404) {
            //             setNotFound(true)
            //             return;
            //         }
            //         setFetchError(err.status != 0)
            //     })
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
                    headerIcon={<RiMastodonLine className='size-5' />}
                    headerTitle='Class Details'
                >
                    <div className="p-5">Class Details</div>
                </Card>
            </div>
        </NavLayout>
    )
}

export default ClassLogDetails