export interface Train {
    id: number
    name: string
    descriptions: string
    type: string
    app_user_token: string
    createdAt: string
    updatedAt: string
    wagons: wagon[]
  }

interface wagon {
    id: number
    name: string
    train_id: number
    seat_count: number
    createdAt: string
    updatedAt: string
    seats: seat[]
}

interface seat {
  id: number
  seat_number: string
  wagon_id: number
  used: boolean
  createdAt: string
  updatedAt: string
}

interface User {
  id: number;
  nik: string;
  name: string;
  address: string;
  phone: string;
  user_id: number;
  app_user_token: string;
  createdAt: string;
  updatedAt: string;
  user_details: user_details
}

interface user_details {
  id: number;
  username: string;
  password: string;
  role: string;
  app_user_token: string;
  createdAt: string; 
  updatedAt: string;
}

interface ScheduleTypes {
  uuid: string
  flightNumber: string
  airline: string
  origin: string
  destination: string
  departureTime: Date
  arrivalTime: Date
  duration: number
  aircraftType: string
  totalSeats: number
  availableSeats: number
  price: number
  status: string
}

interface Purcase {
  id: number
  purchase_id: number
  passanger_id: string
  passanger_name: string
  seat_number: string
  createdAt: string
  updatedAt: string
}

interface History {
    id: number;
    purchase_date: string; 
    customer_id: number;
    schedule_id: number;
    app_user_token: string;
    createdAt: string; 
    updatedAt: string;
    purchases_details: Purcase[]
    schedule_details: ScheduleTypes
}

