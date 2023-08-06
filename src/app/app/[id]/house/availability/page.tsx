"use client";
import { useState, useRef } from "react";
import Calendar from "@/components/ui/Calendar";
import { clerkClient } from "@clerk/nextjs";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";

export default async function Application() {

  const [dates, setDates] = useState<{ startDate: Date, endDate: Date } | null>(null)

  const onChangeDate = (startDate: Date, endDate: Date) => {
    setDates({ startDate, endDate })
    console.log(startDate, endDate)
  };

  const submitBooking = async () => {

    const body = {
        start_date: dates?.startDate,
        end_date: dates?.endDate
    }

    const createdBooking = await apiWrapper("bookings", {
        method: "POST",
        body: JSON.stringify(body)
    })

    console.log(createdBooking)
  }

  console.log(dates)


  return (
    <main>
        <div>
            <Calendar onChangeDate={onChangeDate} />
            {dates?.endDate && (
                <button onClick={submitBooking}>Book</button>
            )}
        </div>
    </main>
  );
}
