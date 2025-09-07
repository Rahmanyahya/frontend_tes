// page.tsx - Server Component
import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import FlightData from "./Flight";
import FilterTicket from "./FilterTicket";

export const dynamic = "force-dynamic";

interface Props {
    searchParams: {
        origin?: string;
        destination?: string;
        // Tambahkan fallback untuk parameter lama
        departured_location?: string;
        arrived_location?: string;
    }
}

const getAllAirplane = async (origin?: string, destination?: string): Promise<{
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
}[]> => {
    try {
        const token = await getServerCookie('token');
        
        // Perbaiki query parameter construction
        let queryString = '/flight';
        const params = new URLSearchParams();
        
        if (origin) {
            params.append('origin', origin);
        }
        if (destination) {
            params.append('destination', destination);
        }
        
        if (params.toString()) {
            queryString += `?${params.toString()}`;
        }
        
        console.log('API Call:', queryString); // Debug log
        
        const response: any = await axiosInstance.get(queryString, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        return response.data || [];
    } catch (error) {
        console.error('Error fetching flights:', error);
        return [];
    }
}

const FlightPage = async (props: Props) => {
    // Normalisasi parameter - gunakan nama yang konsisten
    const origin = props.searchParams?.origin || props.searchParams?.departured_location || '';
    const destination = props.searchParams?.destination || props.searchParams?.arrived_location || '';
    
    console.log('Search params:', { origin, destination }); // Debug log
    
    const dataFlights = await getAllAirplane(origin, destination);
    
    console.log('Flight data:', dataFlights); // Debug log
    
    return (
        <div className="w-full p-5 bg-white">
            <div className='bg-blue-600 w-full p-3 rounded-md shadow-md'>
                <h1 className='text-white text-xl font-bold'>
                    Pemesanan Tiket Pesawat
                </h1>
                <FilterTicket
                    departured_location={origin}
                    arrived_location={destination}
                />
            </div>
            <div className="my-3">
                {dataFlights && dataFlights.length > 0 ? (
                    dataFlights.map((flight, index) => (
                        <FlightData item={flight} key={`flight-${flight.uuid || index}`} />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Tidak ada penerbangan ditemukan</p>
                        {(origin || destination) && (
                            <p className="text-sm text-gray-400 mt-2">
                                Pencarian: {origin} → {destination}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FlightPage;