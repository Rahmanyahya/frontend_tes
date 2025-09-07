"use client"

import React, { useState, useEffect } from "react";
import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import FlightData from "./Flight";
import FilterTicket from "./FilterTicket";
import { getStoresCookie } from "@/helper/client.cookkie";

export const dynamic = "force-dynamic";

interface Flight {
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

const getAllAirplane = async (): Promise<Flight[]> => {
  try {
    const token = await getStoresCookie("token");
    const response: any = await axiosInstance.get("/flight", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const KeretaPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [departuredLocation, setDeparturedLocation] = useState("");
  const [arrivedLocation, setArrivedLocation] = useState("");

  // Fetch semua data pesawat saat pertama kali render
  useEffect(() => {
    getAllAirplane().then((data) => {
      setFlights(data);
      setFilteredFlights(data); // awalnya tampil semua
    });
  }, []);

  // Terapkan filter client-side ketika user search
  const handleFilter = (departure: string, arrival: string) => {
    setDeparturedLocation(departure);
    setArrivedLocation(arrival);

    const filtered = flights.filter(
      (flight) =>
        (!departure || flight.origin.toLowerCase().includes(departure.toLowerCase())) &&
        (!arrival || flight.destination.toLowerCase().includes(arrival.toLowerCase()))
    );

    setFilteredFlights(filtered);
  };

  // Reset filter
  const handleReset = () => {
    setDeparturedLocation("");
    setArrivedLocation("");
    setFilteredFlights(flights);
  };

  return (
    <div className="w-full p-5 bg-white">
      <div className="bg-blue-600 w-full p-3 rounded-md shadow-md">
        <h1 className="text-white text-xl font-bold">Pemesanan Tiket Pesawat</h1>
        <FilterTicket
          departured_location={departuredLocation}
          arrived_location={arrivedLocation}
          onSearch={handleFilter}
          onReset={handleReset}
        />
      </div>

      <div className="my-3">
        {filteredFlights.map((flight, index) => (
          <FlightData item={flight} key={`flight-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default KeretaPage;
