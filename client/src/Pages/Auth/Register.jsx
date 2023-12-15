import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { authAxios } from '../../authAxios';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name && username && email && password) {
                const { data } = await authAxios.post(`/api/v1/auth/register`, { name, username, email, password });

                if (data.success) {
                    toast.success(data.message);
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }
                else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
    }, [])


    return (
        <Layout>
            <div className='flex flex-col items-center pt-7'>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pb-8 mb-4" onSubmit={handleOnSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input value={username} onChange={(e) => setUserName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="username" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email@email.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className='flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight '>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                <FaEye className='mt-1' />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="03 113 888 5421" />
                        </div>
                        <div className="flex flex-col items-center">
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline m-auto" value='Register' type="submit" />

                        </div>
                        <div className='pt-3'>
                            <span className='flex justify-center text-xs'> Already have an account? <NavLink className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" to="/login"> Login </NavLink></span>
                        </div>
                    </form>

                </div>
            </div>

            {/* <div>
                <div className='flex flex-col '>
                
                <form className=''>
                <label htmlFor='firstname'>First name</label>
                <input type='text' name='firstname' />
                
                        <label htmlFor='lastname'>Last name</label>
                        <input type='text' name='lastname' />

                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' />


                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' />

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' />

                        <label htmlFor='phone'>Phone</label>
                        <input type='text' name='phone' />
                    </form>
                </div>
            </div> */}
        </Layout>
    )
}

export default Register