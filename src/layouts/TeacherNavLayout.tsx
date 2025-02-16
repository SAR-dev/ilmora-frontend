import Footer from 'components/Footer';
import TeacherNavbar from 'components/teacher/TeacherNavbar'
import { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router';

const TeacherNavLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='min-h-screen flex flex-col bg-base-200'>
            <TeacherNavbar />
            {children}
            <Footer />
            <ScrollRestoration />
        </section>
    )
}

export default TeacherNavLayout