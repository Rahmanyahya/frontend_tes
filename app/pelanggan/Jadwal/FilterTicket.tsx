"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface props {
    departured_location: string;
    arrived_location: string;
}

const FilterTicket = (myprops: props) => {
    const [departured_location, setDepartureLocation] = useState<string>("");
    const [arrived_location, setArrivedLocation] = useState<string>("");

    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSearch = () => {
        if (departured_location !== "" && arrived_location !== "") {
            const params = new URLSearchParams(searchParams);
            params.set('departured_location', departured_location);
            params.set('arrived_location', arrived_location);
            router.push(`/pelanggan/Jadwal?${params.toString()}`);
        }
    }
  
    useEffect(() => {
     setDepartureLocation(myprops.departured_location || '')
     setArrivedLocation(myprops.arrived_location || '')
    }, [myprops])

    return (
      <div className="py-5 w-full flex flex-wrap items-center">
        <div className="w-full md:w-1/2 p-3">
          <strong className="font-semibold text-white">Stasiun Asal</strong>
          <br />
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={departured_location}
            onChange={(e) => setDepartureLocation(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 p-3">
          <strong className="font-semibold text-white">Stasiun Tujuan</strong>
          <br />
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={arrived_location}
            onChange={(e) => setArrivedLocation(e.target.value)}
          />
        </div>
        <button className='ml-2 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white' type='button' onClick={handleSearch}>
            Cari Jadwal
        </button>
      </div>
    )
}

export default FilterTicket