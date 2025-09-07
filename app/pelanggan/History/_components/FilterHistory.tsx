"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
    start_date: Date;
    end_date: Date;
}

const FilterHistory = ({ start_date: initialStartDate, end_date: initialEndDate }: Props) => {
    const [start_date, setStartDate] = useState<string>('');
    const [end_date, setEndDate] = useState<string>('');

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (initialStartDate) {
            setStartDate(new Date(initialStartDate).toISOString().substring(0, 10));
        }
        if (initialEndDate) {
            setEndDate(new Date(initialEndDate).toISOString().substring(0, 10));
        }
    }, [initialStartDate, initialEndDate]);

    const handleSearch = () => {
        if (start_date && end_date) {
            const params = new URLSearchParams(searchParams);
            params.set('start_date', start_date);
            params.set('end_date', end_date);
            router.push(`/pelanggan/History?${params.toString()}`);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg shadow-xl p-6 w-full px-10">
            <h3 className="text-xl font-bold text-white mb-4">
                Filter Riwayat Transaksi
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="font-medium text-white block">Tanggal Mulai</label>
                    <input
                        type="date"
                        className="w-full p-3 white text-black border  rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="font-medium text-white block">Tanggal Akhir</label>
                    <input
                        type="date"
                        className="w-full p-3 bg-white rounded-lg text-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex justify-end">
                <button
                    className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                    type="button"
                    onClick={handleSearch}
                >
                    Cari Data
                </button>
            </div>
        </div>
    );
};

export default FilterHistory;