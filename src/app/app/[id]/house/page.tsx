"use client";
import useBookings from "@/hooks/useBookings";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";
import useTodaysBooking from "@/hooks/useTodaysBooking";

export default function Application() {
  const { id } = useParams();
  const { house, houseError, houseLoading } = useHouse(id);
  const { todaysBooking } = useTodaysBooking(id);

  console.log(todaysBooking);

  return (
    <div>
      <div className="flex">
        <div className="w-full m-4 p-4 rounded-lg bg-orange-50">
          <h1>{house?.house_name}</h1>
        </div>
        <div className="w-full m-4 p-4 rounded-lg bg-orange-50">
          <h1>{house?.address}</h1>
        </div>
      </div>
    </div>
  );
}
