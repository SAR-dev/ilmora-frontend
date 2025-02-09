import Footer from 'components/Footer';
import Navbar from 'components/Navbar'
import { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router';

const NavLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='min-h-screen flex flex-col'>
            <Navbar />
            {children}
            <Footer />
            <ScrollRestoration />
        </section>
    )
}

export default NavLayout