import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    const setActiveNavbar = (path) => {
        if (location.pathname === path) {
            return '';
        }
        return false;
    }

    useEffect(() => {
    }, [location.pathname])

    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to='/admin/order-requests' className={` ${location.pathname === "/admin/order-requests" ? 'bg-blue-300 text-white' : 'bg-transparent '} hover:bg-blue-400  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>Order Request</NavLink>
            <NavLink to='/admin/dashboard' className={` ${location.pathname === "/admin/dashboard" ? 'bg-blue-300 text-white' : 'bg-transparent '} hover:bg-blue-400  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>Dashbaord</NavLink>
            <NavLink to='/admin/categories' className={` ${location.pathname === "/admin/categories" ? 'bg-blue-300 text-white' : 'bg-transparent '} hover:bg-blue-400  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>Categories</NavLink>
            <NavLink to='/admin/vouchers' className={` ${location.pathname === "/admin/vouchers" ? 'bg-blue-300 text-white' : 'bg-transparent '} hover:bg-blue-400  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>Vouchers</NavLink>
        </div>
    )
}

export default Navbar