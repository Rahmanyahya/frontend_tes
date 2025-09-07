import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import FlightData from "./Flight";
import FilterTicket from "./FilterTicket";
export const dynamic = "force-dynamic";

interface props {
    searchParams: {
        departured_location: string,
        arrived_location: string
    }
}

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

 const keretaPage = async (myprops: props) => {
    const departured_location = await myprops.searchParams!.departured_location
    const arrived_location = await myprops.searchParams!.arrived_location
    const dataKereta = await getAllTrain() || [];

    console.log(dataKereta);

    return (
        <div className="w-full p-5 bg-white ">
             <div className='bg-blue-600 w-full p-3 rounded-md shadow-md'>
                <h1 className='text-white text-xl font-bold'>
                    Pemesanan Tket Pesawat
                </h1>
                <FilterTicket
                    arrived_location={arrived_location}
                    departured_location={departured_location}
                />
            </div>
            <div className="my-3">
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