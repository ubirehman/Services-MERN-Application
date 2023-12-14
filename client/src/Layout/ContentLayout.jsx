import React from 'react'
import Layout from './Layout'
import Navbar from '../Components/Navbar'

const ContentLayout = ({ children }) => {
    return (
        <Layout>
            <div className='flex p-4'>
                <div className='w-1/6'><Navbar /></div>
                <div className='w-5/6'>{children}</div>
            </div>
        </Layout>
    )
}

export default ContentLayout