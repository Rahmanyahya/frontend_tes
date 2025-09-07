"use client"

import { seat as seatType } from "@/app/karyawan/types"
import Modal from "@/components/modal"
import { getStoresCookie } from "@/helper/client.cookkie"
import { FormEvent, useState } from "react"

interface SeatBook {
    passanger_id: string,
    passanger_name: string
    seat_number: string
}

interface Props {
    item: seatType,
    onSave: (item: SeatBook) => void
}
const Seat = (props: Props) => {

    const [show, setShow] = useState<boolean>(false)
    const [passanger_id, setPasanger_id] = useState<string>("")
    const [passanger_name, setPasanger_name] = useState<string>("")

    const openModal = () => {
        setShow(true)
        setPasanger_id("")
        setPasanger_name("")
    }

    const closeModal = () => setShow(false)
       
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const cookie = getStoresCookie("token")
        setShow(false)
        props.onSave({
            passanger_id,
            passanger_name,
            seat_number: props.item.seat_number,
        })
    }


  return (
    <div>
        <button disabled={props.item.used} onClick={() => openModal()} type="button" className="size-10 flex items-center justify-center font-semibold rounded-md bg-sky-600 disabled:bg-slate-600 text-white">
            {props.item.seat_number}
        </button>
        
        <Modal isShow={show}>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Pesan Kursi</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full px-3">
                <div>
                <div>
                    <small className="text-xs font-semibold text-sky-600">Kursi : {props.item.seat_number}</small>
                </div>
                </div>
               <div>
               <div>
                    <small className="text-xs font-semibold text-sky-600">NIK</small>
                </div>
                <div className="my-2">
                    <input type="number" className="w-full p-2 border rounded-md text-sm" placeholder="Nomor Induk Kependudukan" value={passanger_id} onChange={(e) => setPasanger_id(e.target.value)} id={`NIK-${props.item.id}`} required/>
                </div>
               </div>
               <div>
               <div>
                    <small className="text-xs font-semibold text-sky-600">Name</small>
                </div>
                <div className="my-2">
                    <input type="text" className="w-full p-2 border rounded-md text-sm" placeholder="Nomor Induk Kependudukan" value={passanger_name} onChange={(e) => setPasanger_name(e.target.value)} id={`Name-${props.item.id}`} required/>
                </div>
               </div>
            </div>

            <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
             <button type="button" onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >Close</button>
             <button type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
              >Submit</button>
            </div>
            </form>
        </Modal>
    </div>
  )
}

export default Seat