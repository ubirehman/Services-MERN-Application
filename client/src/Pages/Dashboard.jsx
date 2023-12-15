import React, { useEffect, useState } from 'react'
import ContentLayout from '../Layout/ContentLayout'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { authAxios } from '../authAxios';


const Dashboard = () => {
    /* Pie Chart */
    const [chartData, setChartData] = useState({ _id: [], count: [] });
    const [barData, setBarData] = useState({ _id: [], count: [] });

    const fetchServiceOrderStatus = async () => {
        try {
            const { data } = await authAxios.get('/api/v1/services/get-order-status');
            if (data.success) {
                const labels = data.serviceOrderRequestsChart.map(({ _id }) => _id);
                const counts = data.serviceOrderRequestsChart.map(({ count }) => count);
                setChartData({ _id: labels, count: counts });
                console.log(chartData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRepeatingOrderCustomer = async () => {
        try {
            const { data } = await authAxios.get('/api/v1/services/get-order-customers');
            if (data.success) {
                const _id = data.orderRepeatingCustomers.map(({ _id }) => _id);
                const counts = data.orderRepeatingCustomers.map(({ count }) => count);
                setBarData({ _id, count: counts });
                console.log(barData);
            }
        } catch (error) {
            console.log(error);
        }
    }


    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: chartData._id,
        datasets: [
            {
                label: ' service status',
                data: chartData.count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1,
                innerHeight: 400,
                innerWidth: 400

            },
        ],
    };



    /* Vertical Chart */

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    };

    const labels = barData.count;

    const verticalBarData = {
        labels,
        datasets: [
            {
                label: barData._id,
                data: barData.count,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: barData._id,
                data: barData.count,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        fetchServiceOrderStatus();
        fetchRepeatingOrderCustomer();
    }, [])
    return (
        <ContentLayout>
            <div className='flex'>
                <div className=' flex-col w-1/2 m-5 h-[300px]'>
                    <Pie className='m-auto' data={data} />
                    <h2 className='text-center mt-5 font-semibold'>Total order completion statuses</h2>
                </div>
                <div className=' flex-col w-1/2 m-5 h-[200px]'>
                    <Bar options={options} data={verticalBarData} />
                    <h2 className='text-center mt-5 font-semibold'>Repeating customers</h2>
                </div>
            </div>
        </ContentLayout>
    )
}

export default Dashboard