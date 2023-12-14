import React, { useEffect, useState } from 'react'
import ContentLayout from '../Layout/ContentLayout'
import axios from 'axios';
import { toast } from 'react-toastify';

const Vouchers = () => {
  const [voucher, setVoucher] = useState([]);

  const [newVoucherName, setNewVoucherName] = useState('');

  const fetchVouchers = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/voucher/get-voucher/`);
    if (res.data.success) {
      setVoucher(res.data.vouchers);
    }
  }


  const handleCreateVoucher = async () => {
    if (!newVoucherName) {
      toast.warning('Voucher name is missing');
      return;
    }
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/voucher/create-voucher/`, { name: newVoucherName});
      if (res.data.success) {
        toast.success(res.data.message);
        fetchVouchers();
      }
      else {
        toast.error(res.data.message);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  const handleDeleteVoucher = async (voucherSlug) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/voucher/delete-voucher/${voucherSlug}`);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchVouchers();
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
    fetchVouchers();
  }, [])
  return (
    <ContentLayout>
      <div className='flex justify-items-center'>
        <div className='w-1/2 p-4 gap-2'>
          <h1 className='text-xl font-semibold'>Add new voucher</h1>
          <div className='p-8 px-10'>
            <button onClick={handleCreateVoucher} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline m-auto'>Create voucher</button>
          </div>
        </div>
        <div className=' w-1/2'>
          <input value={newVoucherName} onChange={(e) => setNewVoucherName(e.target.value)} className='shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight  focus:shadow-outline' type='text' placeholder='voucher name' />
        </div>
      </div>
      <div class="relative overflow-x-auto over shadow-md sm:rounded-lg h-[350px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Available Vouchers
              </th>

              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Redeem Count
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Staus
              </th>

            </tr>
          </thead>
          <tbody>
            {
              voucher && voucher.map((svoucher) => (
                <tr key={svoucher._id} class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {svoucher.name}
                  </th>
                  <td class="px-6 py-4">
                    {svoucher.redeemcount}
                  </td>
                  <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {svoucher.status}
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

export default Vouchers