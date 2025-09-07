'use client'

import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { getStoresCookie } from "@/helper/client.cookkie"
import { axiosInstance } from "@/helper/api"

interface Props {
  item: {
    uuid: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number;
    aircraftType: string;
    totalSeats: number;
    availableSeats: number;
    price: number;
    status: string;
  }
}

const FlightData = ({ item }: Props) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("ONLINE")

  const handleBooking = async () => {
    try {
      setLoading(true)
      const token = getStoresCookie("token")

      const payload = {
        flightId: item.uuid,
        amount: item.price,
        paymentMethod
      }

      const response: any = await axiosInstance.post("/booking", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast(response.data.message || "Booking successful", { type: "success" })
      setShowModal(false)
    } catch (error) {
      console.error(error)
      toast("Booking failed", { type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-wrap my-2 border border-black text-black rounded-md">
      <ToastContainer />

      {/* Flight Info */}
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Airline</small>
        <span>{item.airline}</span>
      </div>
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Origin</small>
        <span>{item.origin}</span>
      </div>
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Destination</small>
        <span>{item.destination}</span>
      </div>
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Departure</small>
        <span>{new Date(item.departureTime).toLocaleString()}</span>
      </div>
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Arrival</small>
        <span>{new Date(item.arrivalTime).toLocaleString()}</span>
      </div>

      <div className="w-full md:w-1/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Duration</small>
        <span>{item.duration} min</span>
      </div>
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Aircraft</small>
        <span>{item.aircraftType}</span>
      </div>
      <div className="w-full md:w-1/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Seats</small>
        <span>{item.availableSeats}/{item.totalSeats}</span>
      </div>
      <div className="w-full md:w-1/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Price</small>
        <span>Rp {item.price.toLocaleString()}</span>
      </div>
      <div className="w-full md:w-1/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Status</small>
        <span>{item.status}</span>
      </div>

      {/* Book Button */}
      <div className="w-full md:w-1/12 p-2 flex items-center justify-center">
        <button
          onClick={() => setShowModal(true)}
          disabled={item.status !== "scheduled"}
          className={`px-4 py-2 rounded-md text-white ${item.status !== "scheduled" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}`}
        >
          Book
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">Booking Flight</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlightData
