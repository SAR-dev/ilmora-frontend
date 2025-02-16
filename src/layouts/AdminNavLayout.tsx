import AdminNavbar from 'components/admin/AdminNavbar';
import Footer from 'components/Footer';
import { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router';

const AdminNavLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='min-h-screen flex flex-col bg-base-200'>
            <AdminNavbar />
            {children}
            <Footer />
            <ScrollRestoration />
        </section>
    )
}

export default AdminNavLayout