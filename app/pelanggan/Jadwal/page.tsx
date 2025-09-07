import React from 'react'
import FilterTicket from './FilterTicket'
import { ScheduleTypes } from '@/app/karyawan/types'
import { axiosInstance } from '@/helper/api'
import { getServerCookie } from '@/helper/server.cookie'
import Schedule from './Schedule'
export const dynamic = "force-dynamic";

interface props {
    searchParams: {
        departured_location: string,
        arrived_location: string
    }
}

const getJadwal = async (
    departured_location: string,
    arrived_location: string
): Promise<ScheduleTypes[]> => {
    try {
        const cookie = await getServerCookie('token')
        if (!departured_location || !arrived_location) return [];
        
        const response: any = await axiosInstance.get(`/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`, {
            headers: {
                Authorization: `Bearer ${cookie}`,
            }
        })

        if (!response.data?.success) {
            return []
        }

        return response.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}

const JadwalPage = async (myprops: props) => {
    const departured_location = await myprops.searchParams!.departured_location
    const arrived_location = await myprops.searchParams!.arrived_location

    const listJadwal = await getJadwal(departured_location, arrived_location)

    return (
        <div className="w-full p-3">
            <div className='bg-blue-600 w-full p-3 rounded-md shadow-md'>
                <h1 className='text-white text-xl font-bold'>
                    Pemesanan Tiket Kereta Api
                </h1>
                <FilterTicket
                    arrived_location={arrived_location}
                    departured_location={departured_location}
                />
            </div>
            {
                departured_location !== "" && arrived_location !== "" &&
                <div className='my-3'>
                    {
                        listJadwal.length === 0 ? (
                            <div className='w-full p-3 rounded-md bg-orange-100'>
                                Maaf, jadwal tidak tersedia
                            </div>
                        ) : (
                            <div>
                                {listJadwal.map((jadwal, index) => (
                                    <Schedule item={jadwal} key={index} />
                                ))}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default JadwalPage