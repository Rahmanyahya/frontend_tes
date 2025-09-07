'use client'

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie } from "@/helper/client.cookkie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"

type Payment = {
  uuid: string
  name: string
  code: string
  status: string
}

type Props = {
  payment: Payment
}

const EditPayment = ({ payment }: Props) => {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const openModal = () => {
    formik.setValues({
      name: payment.name,
      code: payment.code,
      status: payment.status,
    })
    setShow(true)
  }

  const closeModal = () => setShow(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama wajib diisi"),
      code: Yup.string().required("Kode wajib diisi"),
      status: Yup.string().required("Status wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        const cookie = getStoresCookie("token")

        const response: any = await axiosInstance.put(
          `/update-payment`, // ganti sesuai endpoint backend
          { ...values, uuid: payment.uuid },
          {
            headers: { Authorization: `Bearer ${cookie}` },
          }
        )

        toast(response.data.message, {
          type: "success",
          containerId: `toastEdit-${payment.uuid}`,
        })

        setTimeout(() => router.refresh(), 1000)
        setShow(false)
      } catch (error) {
        console.error(error)
        toast(`Something went wrong`, {
          toastId: `toastEdit-${payment.uuid}`,
          type: "error",
        })
      }
    },
  })

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${payment.uuid}`} />
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
            <h1 className="font-semibold text-lg text-black">Edit Payment</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3 grid grid-cols-2 gap-3">
            {/* Name */}
            <div className="border rounded-md p-2">
              <small className="text-sm font-semibold text-sky-600">Nama</small>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            {/* Code */}
            <div className="border rounded-md p-2">
              <small className="text-sm font-semibold text-sky-600">Kode</small>
              <input
                type="text"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
              {formik.touched.code && formik.errors.code && (
                <div className="text-red-500 text-sm">{formik.errors.code}</div>
              )}
            </div>

            {/* Payment Status */}
            <div className="border rounded-md p-2 col-span-2">
              <small className="text-sm font-semibold text-sky-600">Status</small>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              >
                <option value="">-- Pilih Status --</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="text-red-500 text-sm">{formik.errors.status}</div>
              )}
            </div>
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

export default EditPayment
