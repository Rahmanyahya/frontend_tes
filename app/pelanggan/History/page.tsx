import React from 'react';
import HistoryCard from './_components/HistoryCard';
import { axiosInstance } from '@/helper/api';
import { getServerCookie } from '@/helper/server.cookie';
import FilterHistory from './_components/FilterHistory';
import { History } from '@/app/karyawan/types';
export const dynamic = "force-dynamic";

interface Props {
    searchParams: {
        start_date?: string;
        end_date?: string;
    };
}

const GetDataHistory = async (start_date?: string, end_date?: string): Promise<History[]> => {
    try {
        const token = await getServerCookie('token');

        const isValidDate = (date: string | undefined) => date && !isNaN(new Date(date).getTime());

        let url = "/purchase/customer";
        if (isValidDate(start_date) && isValidDate(end_date)) {
            const startTime = new Date(start_date!).getTime();
            const endTime = new Date(end_date!).getTime();

            if (startTime <= endTime) {
                url = `/purchase/customer?start_date=${start_date}&end_date=${end_date}`;
            }
        }

        const response: any = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data.success) return [];

        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


const Page = async ({ searchParams }: Props) => {
    const { start_date, end_date } = searchParams;

    const historyData = await GetDataHistory(start_date, end_date);

    return (
        <div>
            <h1 className="text-left text-2xl font-bold p-3">History Pemesanan</h1>

           <div className='p-2'>
           <FilterHistory start_date={start_date ? new Date(start_date) : new Date()} end_date={end_date ? new Date(end_date) : new Date()} />
           </div>

            <div className="flex flex-col p-3 space-y-3">
                {historyData.length > 0 ? (
                    historyData.map((item, index) => <HistoryCard key={index} item={item} />)
                ) : (
                    <div className='w-full p-3 rounded-md bg-orange-100 text-center'>
                    Maaf, pemesanan tidak ditemukan
                </div>
                )}
            </div>
        </div>
    );
};

export default Page;
