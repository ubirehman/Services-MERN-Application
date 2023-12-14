import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../ContextApi/Auth';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!email) toast.warning("Email is required");
            if (!password) toast.warning("Password is required");

            const { data } = await axios.post(`http://localhost:8000/api/v1/auth/login`, { email, password });
            console.log(data);

            if (data.success) {
                setAuth({
                    ...auth, user: data.other,
                    token: data.other.token
                });

                localStorage.setItem('auth', JSON.stringify(data.other));
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/admin/order-requests')
                }, 2000);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <Layout>
            <div className='flex flex-col items-center pt-10'>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" placeholder="email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="flex flex-col items-center">
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline m-auto" value='Login' type="submit" />

                        </div>
                        <div className='pt-3'>
                            <span className='flex justify-center text-xs'> Don't have an account? <NavLink className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" to="/register"> Register </NavLink></span>
                        </div>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default Login