import React from 'react';
import HistoryCard, { FlightHistory } from './_components/HistoryCard';
import { axiosInstance } from '@/helper/api';
import { getServerCookie } from '@/helper/server.cookie';
import { ToastContainer } from 'react-toastify';


export const dynamic = "force-dynamic";

// Fetch semua data history tanpa filter
const GetAllHistory = async (): Promise<FlightHistory[]> => {
    try {
        const token = await getServerCookie('token');
        const response: any = await axiosInstance.get('/history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching history:", error);
        return [];
    }
};

const Page = async () => {
    const historyData = await GetAllHistory() || [];

    return (
        <div className="p-4">
              <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-bold mb-4">History Pemesanan</h1>

            <div className="flex flex-col space-y-3">
                {historyData.length > 0 ? (
                    historyData.map((item, index) => (
                        <HistoryCard key={index} item={item} />
                    ))
                ) : (
                    <div className="w-full p-3 rounded-md bg-orange-100 text-center">
                        Maaf, pemesanan tidak ditemukan
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
