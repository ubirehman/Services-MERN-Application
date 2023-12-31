import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextApi/Auth';

const UnAuthorised = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.token) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [])

    return (
        <Layout>
            <div className='flex flex-col items-center justify-center m-auto'>
                <h1>UnAuthorised access. Redirecting ...</h1>
                <img className='flex h-[100px]' src='https://media.tenor.com/JeNT_qdjEYcAAAAj/loading.gif' />
            </div>
        </Layout>
    )
}

export default UnAuthorised