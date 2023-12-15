import React, { useEffect, useState } from 'react'
import ContentLayout from '../Layout/ContentLayout'
import { toast } from 'react-toastify'
import io from 'socket.io-client';
import { authAxios } from '../authAxios';

const OrdersRequests = () => {
    const [serviceOrders, setServiceOrders] = useState([]);

    const socket = io('http://localhost:8000');

    const handleFetchServiceRequest = async () => {
        try {
            const res = await authAxios.get(`/api/v1/services/get-order`);
            if (res.data.success) {
                setServiceOrders(res.data.serviceOrderRequests);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        handleFetchServiceRequest();

        socket.on('update', () => {
            handleFetchServiceRequest();
        });

        return () => {
            // socket.disconnect();
        };

    }, []);

    return (
        <ContentLayout>
            <div class="relative overflow-x-auto over shadow-md sm:rounded-lg h-[550px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Contact
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Services
                            </th>
                            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Status
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                            </tr> */}
                        {
                            serviceOrders.map((serviceOrder) => (
                                <tr key={serviceOrder._id} class="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {serviceOrder.phone}
                                    </th>
                                    <td class="px-6 py-4">
                                        {serviceOrder.title}
                                    </td>
                                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                        {serviceOrder.status}
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </ContentLayout>
    )
}

export default OrdersRequests