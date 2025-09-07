'use client'

import React from 'react';
import { FlightHistory } from './types'; // pastikan path benar
import { toast } from 'react-toastify';
import { axiosInstance } from '@/helper/api';
import { getStoresCookie } from '@/helper/client.cookkie';

interface Props {
  item: FlightHistory;
}

const HistoryCard = ({ item }: Props) => {

  const handleCancelBooking = async () => {
    try {
      await axiosInstance.delete(`/cancel-booking`, {
         params: { uuid: item.uuid },
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${getStoresCookie('token')}`,
         },
        });
      toast.success('Booking berhasil dibatalkan');
      setTimeout(() => window.location.reload(), 1000);
      // Optional: update state / refresh data
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal membatalkan booking');
    }
  };

  const handlePrintNota = () => {
    const printContent = `
      <h2>Ticket Booking</h2>
      <p><strong>UUID:</strong> ${item.uuid}</p>
      <p><strong>Nama:</strong> ${item.name}</p>
      <p><strong>Kode Booking:</strong> ${item.code}</p>
      <p><strong>Flight:</strong> ${item.flight}</p>
      <p><strong>Status Pembayaran:</strong> ${item.paymentStatus}</p>
    `;
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full transition-all hover:shadow-xl'>
      <div className='grid grid-cols-4 gap-6 mb-8'>
        <InfoSection title="UUID" content={item.uuid} />
        <InfoSection title="Nama" content={item.name} />
        <InfoSection title="Kode Booking" content={item.code} />
        <InfoSection title="Flight" content={item.flight} />
      </div>

      <div className='mt-4'>
        <InfoSection 
          title="Status Pembayaran" 
          content={item.paymentStatus} 
        />
      </div>

      <div className='mt-6 flex gap-4'>
        {item.paymentStatus.toLowerCase() !== 'rejected' && (
          <button
            onClick={handleCancelBooking}
            className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors'
          >
            Cancel Booking
          </button>
        )}

        {
         item.paymentStatus.toLowerCase() === 'confirmed' &&
         <button
         onClick={handlePrintNota}
         className='bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors'
       >
         Print Nota
       </button>
        }
      </div>
    </div>
  );
};

const InfoSection = ({ title, content, subContent }: { 
  title: string; 
  content: string; 
  subContent?: string;
}) => (
  <div className='space-y-1'>
    <div className='font-bold text-sky-600 text-lg'>{title}</div>
    <div className='font-semibold text-gray-800'>{content}</div>
    {subContent && <div className='font-medium text-gray-600'>{subContent}</div>}
  </div>
);

export default HistoryCard;
