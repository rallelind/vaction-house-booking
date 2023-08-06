"use client";
import useBookings from "@/hooks/useBookings";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";

export default function Application() {
  const { id } = useParams();
  const { house, houseError, houseLoading } = useHouse(id);
  const { bookings, bookingsError, bookingsLoading } = useBookings(id);

  console.log(bookings)

  return (
    <div>
      <div className="flex">
        <div className="w-full m-4 p-4 rounded-lg border border-orange-200 bg-orange-50">
          <h1>{house?.house_name}</h1>
        </div>
        <div className="w-full m-4 p-4 rounded-lg border border-orange-200 bg-orange-50">
          <h1>{house.address}</h1>
        </div>
      </div>
    </div>
  );
}
