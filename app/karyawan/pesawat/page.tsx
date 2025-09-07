import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import AddKereta from "./addPesawat";
import FlightData from "./Flight";
export const dynamic = "force-dynamic";

const getAllTrain = async (): Promise<{    uuid: string;
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
  }[]> => {
        try {
            const token = await getServerCookie('token')

            const response: any = await axiosInstance.get('/flight', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

           

            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
}

 const keretaPage = async () => {

    const dataKereta = await getAllTrain() || [];

    console.log(dataKereta);

    return (
        <div className="w-full p-5 bg-white ">
            <h1 className="text-xl font-semibold text-black">Data Pesawat</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data kereta api yang tersedia
            </span>
            <div className="my-3">
                <AddKereta/>
                {
                    dataKereta.map((kereta, index) => (
                        <FlightData item={kereta} key={`kereta-${index}`} />
                    ))
                }
            </div>
        </div>
    )
}

export default keretaPage;