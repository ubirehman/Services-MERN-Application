import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <ToastContainer />
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout