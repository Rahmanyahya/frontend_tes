'use client'



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
  return (
    <div className="w-full flex flex-wrap my-2 border border-black text-black rounded-md">

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

      {/* Kanan: Detail tambahan */}
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

    </div>
  )
}

export default FlightData
