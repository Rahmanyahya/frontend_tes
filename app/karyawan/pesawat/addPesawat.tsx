'use client'

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie } from "@/helper/client.cookkie"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"

interface FlightFormValues {
  flightNumber: string
  airline: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: number
  aircraftType: string
  totalSeats: number
  availableSeats: number
  price: number
  status: string
}

const AddFlight = () => {
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    formik.resetForm()
    setShow(true)
  }

  const closeModal = () => setShow(false)

  const formik = useFormik<FlightFormValues>({
    initialValues: {
      flightNumber: "",
      airline: "",
      origin: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      duration: 0,
      aircraftType: "",
      totalSeats: 0,
      availableSeats: 0,
      price: 0,
      status: "scheduled",
    },
    validationSchema: Yup.object({
      flightNumber: Yup.string().required("Flight Number is required"),
      airline: Yup.string().required("Airline is required"),
      origin: Yup.string().required("Origin is required"),
      destination: Yup.string().required("Destination is required"),
      departureTime: Yup.string().required("Departure Time is required"),
      arrivalTime: Yup.string().required("Arrival Time is required"),
      duration: Yup.number().required("Duration is required").positive(),
      aircraftType: Yup.string().required("Aircraft Type is required"),
      totalSeats: Yup.number().required("Total Seats is required").positive(),
      availableSeats: Yup.number().required("Available Seats is required").min(0),
      price: Yup.number().required("Price is required").positive(),
      status: Yup.string().oneOf(["scheduled", "delayed", "cancelled"]),
    }),
    onSubmit: async (values) => {
      try {
        const token = getStoresCookie("token")
        const response: any = await axiosInstance.post("/flight", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const message = response.data.message

        toast(message, { type: "success", containerId: "toastAdd" })
        setShow(false)
        setTimeout(() => router.refresh(), 1000)
      } catch (error) {
        console.error(error)
        toast("Something went wrong", { type: "error", containerId: "toastAdd" })
      }
    },
  })

  // Field kiri dan kanan
  const leftFields: (keyof FlightFormValues)[] = [
    "flightNumber",
    "airline",
    "origin",
    "destination",
    "departureTime",
    "arrivalTime",
  ]
  const rightFields: (keyof FlightFormValues)[] = [
    "duration",
    "aircraftType",
    "totalSeats",
    "availableSeats",
    "price",
    "status",
  ]

  const renderField = (key: keyof FlightFormValues) => (
    <div key={key} className="my-2 border rounded-md p-3">
      <small className="text-sm font-semibold text-sky-600 capitalize">{key}</small>
      <input
        type={["duration", "totalSeats", "availableSeats", "price"].includes(key) ? "number" : key.includes("Time") ? "datetime-local" : "text"}
        name={key}
        value={(formik.values as any)[key]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
      />
      {formik.touched[key] && formik.errors[key] && (
        <small className="text-red-500">{formik.errors[key]}</small>
      )}
    </div>
  )

  return (
    <div>
      <ToastContainer containerId="toastAdd" />
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white"
      >
        Tambah Flight
      </button>

      <Modal isShow={show}>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Flight</h1>
            <span className="text-sm text-slate-500">Pastikan data terisi dengan benar</span>
          </div>

          <div className="w-full p-3 grid grid-cols-2 gap-4">
            <div>{leftFields.map(renderField)}</div>
            <div>{rightFields.map(renderField)}</div>
          </div>

          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button type="submit" className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddFlight
