import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import PaymentData from "./Payment";
export const dynamic = "force-dynamic";

const getAllPayment = async (): Promise<{    
    uuid: string;
    name: string;
    code: string;
    status: string;
  }[]> => {
        try {
            const token = await getServerCookie('token')

            const response: any = await axiosInstance.get('/bookings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

           
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
}

 const keretaPage = async () => {

    const dataPayment = await getAllPayment() || [];

    return (
        <div className="w-full p-5 bg-white ">
            <h1 className="text-xl font-semibold text-black">Data Pembayaran</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data kereta api yang tersedia
            </span>
            <div className="my-3">
                {
                    dataPayment.map((kereta, index) => (
                        <PaymentData item={kereta} key={`payment-${index}`} />
                    ))
                }
            </div>
        </div>
    )
}

export default keretaPage;