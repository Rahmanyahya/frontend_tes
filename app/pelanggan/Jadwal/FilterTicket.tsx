import { useEffect, useState } from "react";

interface Props {
  departured_location?: string;
  arrived_location?: string;
  onSearch: (departure: string, arrival: string) => void;
  onReset: () => void;
}

const FilterTicket = ({ departured_location, arrived_location, onSearch, onReset }: Props) => {
  const [departure, setDeparture] = useState(departured_location || "");
  const [arrival, setArrival] = useState(arrived_location || "");

  useEffect(() => {
    setDeparture(departured_location || "");
    setArrival(arrived_location || "");
  }, [departured_location, arrived_location]);

  return (
    <div className="py-5 w-full">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block font-semibold text-white mb-2">Bandara Asal</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="Contoh: CGK, DPS, SUB"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block font-semibold text-white mb-2">Bandara Tujuan</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            placeholder="Contoh: CGK, DPS, SUB"
          />
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white font-medium transition-colors"
            type="button"
            onClick={() => onSearch(departure, arrival)}
          >
            Cari Jadwal
          </button>
          <button
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white font-medium transition-colors"
            type="button"
            onClick={() => {
              setDeparture("");
              setArrival("");
              onReset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterTicket;
