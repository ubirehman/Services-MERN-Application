import React from 'react'
import ContentLayout from '../Layout/ContentLayout'
import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = () => {
    return (
        <ContentLayout>
            <div className='flex flex-col w-1/2 m-5 h-[300px]'>
                <PieChart className='text-black'
                    data={[
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                />
                <h2 className='text-center mt-5 font-semibold'>Total order completion statuses</h2>
            </div>
            <div className='flex w-1/2'>

            </div>
        </ContentLayout>
    )
}

export default Dashboard