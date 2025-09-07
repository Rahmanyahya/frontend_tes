// FilterTicket.tsx - Client Component
"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Props {
    departured_location?: string;
    arrived_location?: string;
}

const FilterTicket = (props: Props) => {
    const [departured_location, setDepartureLocation] = useState<string>("");
    const [arrived_location, setArrivedLocation] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleSearch = () => {
        if (departured_location !== "" && arrived_location !== "") {
            const params = new URLSearchParams();
            params.set('origin', departured_location);
            params.set('destination', arrived_location);
            
            // Redirect ke halaman yang sama dengan parameter baru
            router.push(`/pelanggan/Jadwal?${params.toString()}`);
        } else {
            alert('Mohon isi kedua lokasi terlebih dahulu');
        }
    }
    
    const handleReset = () => {
        setDepartureLocation('');
        setArrivedLocation('');
        router.push('/pelanggan/Jadwal');
    }
 
    useEffect(() => {
        // Set initial values dari props
        setDepartureLocation(props.departured_location || '');
        setArrivedLocation(props.arrived_location || '');
    }, [props.departured_location, props.arrived_location]);
    
    return (
        <div className="py-5 w-full">
            <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[200px]">
                    <label className="block font-semibold text-white mb-2">
                        Bandara Asal
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={departured_location}
                        onChange={(e) => setDepartureLocation(e.target.value)}
                        placeholder="Contoh: CGK, DPS, SUB"
                    />
                </div>
                
                <div className="flex-1 min-w-[200px]">
                    <label className="block font-semibold text-white mb-2">
                        Bandara Tujuan
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={arrived_location}
                        onChange={(e) => setArrivedLocation(e.target.value)}
                        placeholder="Contoh: CGK, DPS, SUB"
                    />
                </div>
                
                <div className="flex gap-2">
                    <button 
                        className='px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white font-medium transition-colors' 
                        type='button' 
                        onClick={handleSearch}
                    >
                        Cari Jadwal
                    </button>
                    
                    <button 
                        className='px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white font-medium transition-colors' 
                        type='button' 
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
            
            {/* Debug info - hapus di production */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-2 bg-white/20 rounded text-white text-xs">
                    Debug: Origin={departured_location}, Destination={arrived_location}
                </div>
            )}
        </div>
    )
}

export default FilterTicket;