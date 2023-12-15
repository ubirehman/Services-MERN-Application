import React, { useEffect, useState } from 'react'
import ContentLayout from '../Layout/ContentLayout'
import { toast } from 'react-toastify';
import { authAxios } from '../authAxios';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const [newCategoryName, setNewCategoryName] = useState('');

    const fetchCategories = async () => {
        const res = await authAxios.get(`/api/v1/category/get-category/`);
        if (res.data.success) {
            setCategories(res.data.categories);
        }
    }


    const handleCreateCategory = async () => {
        if (!newCategoryName) {
            toast.warning('Please enter category name');
            return;
        }
        try {
            const res = await authAxios.post(`/api/v1/category/create-category/`, { categoryName: newCategoryName });
            if (res.data.success) {
                toast.success(res.data.message);
                fetchCategories();
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.warning(error.data.message);
        }
    }


    const handleDeleteCategory = async (categorySlug) => {
        try {
            const res = await authAxios.delete(`/api/v1/category/delete-category/${categorySlug}`);
            if (res.data.success) {
                toast.success(res.data.message);
                fetchCategories();
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [categories])
    return (
        <ContentLayout>
            <div className='flex justify-items-center'>
                <div className='w-1/2 p-4 gap-2'>
                    <h1 className='text-xl font-semibold'>Add new category</h1>
                    <div className='p-8 px-10'>
                        <button onClick={handleCreateCategory} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline m-auto'>Create category</button>
                    </div>
                </div>
                <div className=' w-1/2'>
                    <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className='shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight  focus:shadow-outline' type='text' placeholder='category name' />
                    <textarea className='shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight  focus:shadow-outline' type='text' placeholder='description' ></textarea>
                </div>
            </div>
            <div class="relative overflow-x-auto over shadow-md sm:rounded-lg h-[350px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Available Categories
                            </th>

                            <th scope="col" class="text-center px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.map((category) => (
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {category.name}
                                    </th>
                                    <td class="px-6 py-4 flex">
                                        <button onClick={() => handleDeleteCategory(category.slug)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline m-auto'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </ContentLayout >
    )
}

export default Categories