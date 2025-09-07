'use client'

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie } from "@/helper/client.cookkie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ScheduleTypes } from "../types"
import { useFormik } from "formik"
import * as Yup from "yup"

type Props = {
  flight: ScheduleTypes
}

const EditPesawat = ({ flight }: Props) => {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const openModal = () => {
    formik.setValues({
      airline: flight.airline,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: new Date(flight.departureTime),
      arrivalTime: new Date(flight.arrivalTime) ,
      duration: flight.duration,
      aircraftType: flight.aircraftType,
      totalSeats: flight.totalSeats,
      availableSeats: flight.availableSeats,
      price: flight.price,
      status: flight.status,
    })
    setShow(true)
  }

  const closeModal = () => setShow(false)

  const formik = useFormik({
    initialValues: {
      airline: "",
      origin: "",
      destination: "",
      departureTime: new Date(),
      arrivalTime: new Date(),
      duration: 0,
      aircraftType: "",
      totalSeats: 0,
      availableSeats: 0,
      price: 0,
      status: "",
    },
    validationSchema: Yup.object({
      airline: Yup.string().required("Airline wajib diisi"),
      origin: Yup.string().required("Origin wajib diisi"),
      destination: Yup.string().required("Destination wajib diisi"),
      departureTime: Yup.date().required("Departure time wajib diisi"),
      arrivalTime: Yup.date().required("Arrival time wajib diisi"),
      duration: Yup.number().positive().required("Duration wajib diisi"),
      aircraftType: Yup.string().required("Aircraft Type wajib diisi"),
      totalSeats: Yup.number().positive().required("Total Seats wajib diisi"),
      availableSeats: Yup.number().min(0).required("Available Seats wajib diisi"),
      price: Yup.number().positive().required("Price wajib diisi"),
      status: Yup.string().required("Status wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        const cookie = getStoresCookie("token")

        const response: any = await axiosInstance.put(
          `/flight`,
          {...values, uuid: flight.uuid},
          {
            headers: { Authorization: `Bearer ${cookie}` },
          }
        )

        const message = response.data.message

        toast(message, {
          type: "success",
          containerId: `toastEdit-${flight.uuid}`,
        })

        setTimeout(() => router.refresh(), 1000)
        setShow(false)
      } catch (error) {
        console.log(error)
        toast(`Something went wrong`, {
          toastId: `toastEdit-${flight.uuid}`,
          type: "error",
        })
      }
    },
  })

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${flight.uuid}`} />
      <button
        type="button"
        className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
        onClick={openModal}
      >
        ✏️ Edit
      </button>

      <Modal isShow={show}>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Edit Jadwal Pesawat</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3 grid grid-cols-2 gap-3">
          {Object.keys(formik.initialValues).map((field) => (
  <div key={field} className="border rounded-md p-2">
    <small className="text-sm font-semibold text-sky-600 capitalize">
      {field}
    </small>

    {field === "status" ? (
      <select
        name="status"
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
      >
        <option value="">-- Pilih Status --</option>
        <option value="scheduled">Scheduled</option>
        <option value="delayed">Delayed</option>
        <option value="boarding">Boarding</option>
        <option value="departed">Departed</option>
        <option value="arrived">Arrived</option>
        <option value="cancelled">Cancelled</option>
      </select>
    ) : (
      <input
        type={
          ["departureTime", "arrivalTime"].includes(field)
            ? "datetime-local"
            : typeof formik.values[field as keyof typeof formik.values] === "number"
            ? "number"
            : "text"
        }
        name={field}
        value={formik.values[field as keyof typeof formik.values]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
      />
    )}

    {formik.touched[field as keyof typeof formik.values] &&
      formik.errors[field as keyof typeof formik.values] && (
        <div className="text-red-500 text-sm">
          {formik.errors[field as keyof typeof formik.values] as string}
        </div>
      )}
  </div>
))}

          </div>

          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EditPesawat
