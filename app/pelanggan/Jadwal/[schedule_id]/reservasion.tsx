"use client"
import { wagon } from "@/app/karyawan/types"
import { useEffect, useState } from "react"
import Seat from "./seat"
import { toast, ToastContainer } from "react-toastify"
import { getStoresCookie } from "@/helper/client.cookkie"
import { axiosInstance } from "@/helper/api"
import { useRouter } from "next/navigation"

interface Props {
    schedule_id: number
    wagons: wagon[]
}

interface SeatBook {
    passanger_id: string,
    passanger_name: string
    seat_number: string
}

const Reservasion = (props: Props) => {
    const [details, setDetails] = useState<SeatBook[]>([])
    const [wagons, setWagons] = useState<wagon[]>([])

    const router = useRouter()

    useEffect(
        () => {
            setWagons([...props.wagons])
        },
        [props]
    )

    const handleAddSeat = (seatBook: SeatBook) => {
        setDetails([...details, seatBook])
        
        const tempWagons = [...wagons]
        const findWagonIndex = tempWagons.findIndex(
            item => item.seats
            .map(it => it.seat_number)
            .includes(seatBook.seat_number)
        )
        const findSeatIndex = tempWagons[findWagonIndex]
        .seats.findIndex(
            item => item.seat_number === seatBook.seat_number
        )

        tempWagons[findWagonIndex].seats[findSeatIndex].used = true
        setWagons([...tempWagons])
    }

    const handleRemove = (index: number, seatBook: SeatBook) => {
        const temp = [...details]
        temp.splice(index, 1)
        setDetails(temp)
        
        const tempWagons = [...wagons]
        const findWagonIndex = tempWagons.findIndex(
            item => item.seats
            .map(it => it.seat_number)
            .includes(seatBook.seat_number)
        )
        const findSeatIndex = tempWagons[findWagonIndex]
        .seats.findIndex(
            item => item.seat_number === seatBook.seat_number
        )

        tempWagons[findWagonIndex].seats[findSeatIndex].used = false
        setWagons([...tempWagons])
    }

    const handleSave = async () => {
        try {
            console.log(details)
            if (details.length == 0) {
                toast('You have not selected any seats', {
                    containerId: 'toastBook',
                    type: 'warning'
                })
                return
            }

            const cookie = getStoresCookie('token')

            const response: any = await axiosInstance.post(`/purchase/customer`, {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: props.schedule_id,
                details
            }, {
                headers: { Authorization: `Bearer ${cookie}` },
            })

            if (!response.data.data) {
                toast(`${response.data.message}`, {
                    containerId: 'toastBook',
                    type: 'warning'
                })
                return
            }

            toast(`${response.data.message}`, {
                containerId: 'toastBook',
                type:'success'
            })

            setTimeout(() => router.replace(`/pelanggan/Jadwal/${props.schedule_id}`), 1000)

        } catch (error) {
            console.error(error)
            toast('Something went wrong', {
                containerId: 'toastBook',
                type: 'error'
            })
        }
    }
    
  return (
    <div>
        <ToastContainer containerId={`toastBook`}/>
        {
            props.wagons.map((item, index) => (
                <div key={`keywagons-${index}`}
                className="w-full my-2 p-3 rounded-md shadow-md border"
                >
                    <h3 className="font-semibold my-2">
                        {item.name}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                    {
                        item.seats.map((seat, seatIndex) => (
                            <Seat
                            key={`keyseat-${index}-${seatIndex}`}
                            item={seat}
                            onSave={ seatBook => handleAddSeat(seatBook)}
                            />
                        ))
                    }
                    </div>
                </div>
            ))
        }

        <button type="button"
        onClick={() => handleSave()}
        className="w-full rounded-md my-4 py-4 bg-green-600 hover:bg-green-500 text-white"
        >
            Order
        </button>
    </div>
  )
}

export default Reservasion