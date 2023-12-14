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
      <div className='flex bg-cyan-200'>
        <img src='' />
      </div>
    </Layout>
  )
}

export default Home