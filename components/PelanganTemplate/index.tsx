"use client";
import { removeCookie } from "@/helper/client.cookkie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";


interface props {
  children: ReactNode;
}
const PelangganTemplate = (myprops: props) => {
  const [show, setShow] = useState<boolean>(false);

  const router = useRouter()

  const handleLogout = async () => {
    removeCookie('token')
    router.push('/')
  }
  return (
    <div className="w-dvw overflow-x-hidden">
      <header className="w-full p-3 bg-orange-600 flex items-center gap-3">
        <button
          type="button"
          className="size-8 rounded-full flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <h1 className="text-xl font-bold text-white">Pesawat</h1>
      </header>

      <div className={`w-1/2 md:w-1/3 lg:w-1/4 bg-blue-600 h-dvh fixed top-0 transform transition-transform ${show? 'left-0' : 'right-full'}`}>
        <div className="w-full my-5 flex justify-center text-white font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>

          <div className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShow(false)}
          >
           X
          </div>
        </div>
        <div className="w-full flex flex-col">
            <Link href={`/pelanggan/Jadwal`} className="w-full rounded-md text-white p-3 font-semibold  hover:bg-blue-500">
             Data Jadwal
            </Link>
            <Link href={`/pelanggan/History`} className="w-full rounded-md text-white p-3 font-semibold  hover:bg-blue-500">
             Data History
            </Link>
        </div>
        <div className="w-full flex justify-center items-center text-white p-3 font-semibold  hover:bg-blue-500 absolute bottom-0 bg-red-600" onClick={() => handleLogout()}>
              Logout
            </div>
      </div>
      {myprops.children}
    </div>
  );
};

export default PelangganTemplate;
