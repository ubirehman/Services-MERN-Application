import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../ContextApi/Auth';

const Home = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  useEffect(() => {
    if (auth.user) navigate('/admin/order-requests');
  })
  return (
    <Layout>
      <div className='relative w-full max-h-[595px] overflow-hidden '>
        <img className='blur-sm object-cover w-full h-full' src='https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg' />
      </div>
    </Layout>
  )
}

export default Home