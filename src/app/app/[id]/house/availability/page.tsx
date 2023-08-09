"use client";
import { useState, useRef } from "react";
import Calendar from "@/components/ui/Calendar";
import { clerkClient } from "@clerk/nextjs";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import startOfToday from "date-fns/startOfToday";

export default function Application() {
  let today = startOfToday();

  const [dates, setDates] = useState({
    startDate: today,
    endDate: today,
  });

  const submitBooking = async () => {
    const body = {};

    const createdBooking = await apiWrapper("bookings", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return (
    <main>
      <div>
        <Calendar onChange={setDates} dates={dates} />
      </div>
    </main>
  );
}
