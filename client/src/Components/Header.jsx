import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../ContextApi/Auth'
import { toast } from 'react-toastify';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        toast.info('Logout successfully');

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    useEffect(() => {
    }, [auth?.token])

    return (
        <div className='flex bg-slate-300 p-4'>
            <div className='w-1/4 h-12'>
                <img className='h-full' src='https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Liquidity_Services_logo.svg/1280px-Liquidity_Services_logo.svg.png' />
            </div>
            <div className='flex w-3/4 justify-end gap-3 m-auto'>
                {auth.token ? (<>

                    <nav>
                        <NavLink onClick={handleLogout}><h1 className='text-white text-lg font-bold hover:text-slate-500'>Log out</h1></NavLink>
                    </nav>
                </>)
                    :
                    (<>
                        <nav>
                            <NavLink to='/login'><h1 className='text-white text-lg font-bold hover:text-slate-500'>Login</h1></NavLink>
                        </nav>
                        <nav>
                            <NavLink to='/register'><h1 className='text-white text-lg font-bold hover:text-slate-500'>Register</h1></NavLink>
                        </nav>
                    </>)}
                {/* <nav>
                    <NavLink  to='/login'><h1 className='text-white text-lg font-bold hover:text-slate-500'>Login</h1></NavLink>
                </nav>
                <nav>
                    <NavLink to='/register'><h1 className='text-white text-lg font-bold hover:text-slate-500'>Register</h1></NavLink>
                </nav> */}
            </div>
        </div>
    )
}

export default Header