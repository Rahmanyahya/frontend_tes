'use client'

import EditPayment from "./EditPayment";


interface Props {
  item: {
    uuid: string;
    name: string;
    code: string;
    status: string;
  };
}

const PaymentData = ({ item }: Props) => {
  return (
    <div className="w-full flex flex-wrap my-2 border border-black text-black rounded-md">

      <div className="w-full md:w-3/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Nama</small>
        <span>{item.name}</span>
      </div>

      <div className="w-full md:w-4/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Kode</small>
        <span>{item.code}</span>
      </div>

      <div className="w-full md:w-3/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Status Pembayaran</small>
        <span>{item.status}</span>
      </div>

      {/* Opsi */}
      <div className="w-full md:w-2/12 p-2 flex flex-col">
        <small className="text-sm font-medium">Opsi</small>
        <div className="flex gap-2 items-center">
          <EditPayment payment={item} />
        </div>
      </div>
    </div>
  )
}

export default PaymentData;
