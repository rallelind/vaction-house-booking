"use client";
import { useState, useRef } from "react";
import Calendar from "@/components/ui/Calendar";
import { clerkClient } from "@clerk/nextjs";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import startOfToday from "date-fns/startOfToday";
import { useParams } from "next/navigation";

export default function Application() {
  let today = startOfToday();
  const { id } = useParams();
  const { bookings, bookingsLoading } = useBookings(id);

  const [dates, setDates] = useState({
    startDate: today,
    endDate: today,
  });

  if (bookingsLoading) {
    return <div>Loading...</div>;
  }

  console.log(bookings);



  const submitBooking = async () => {
    const body = {
      start_date: dates.startDate,
      end_date: dates.endDate,
      house_id: Number(id),
    };

    const createdBooking = await apiWrapper("booking", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return (
    <main>
      <div>
        <Calendar bookings={bookings} onChange={setDates} dates={dates} />
        <button onClick={submitBooking}>Create booking</button>
      </div>
    </main>
  );
}
