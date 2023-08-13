"use client";
import { useState, useRef, useEffect } from "react";
import Calendar from "@/components/ui/Calendar";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import startOfToday from "date-fns/startOfToday";
import { useParams } from "next/navigation";
import { isSameDay, isWithinInterval } from "date-fns";

export default function Application() {
  const { id } = useParams();
  const { bookings, bookingsLoading } = useBookings(id);

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    let today = startOfToday();

    const isTodayBooked = () => {
      return bookings?.some((range) => {
        const { start_date, end_date } = range.booking;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const withinInterval = isWithinInterval(today, {
          start: startDate,
          end: endDate,
        });

        const isStartDateEqual = isSameDay(today, startDate);

        return withinInterval || isStartDateEqual;
      });
    };

    const todayBooked = isTodayBooked();

    if (!bookingsLoading && !todayBooked) {
      setDates({ startDate: today, endDate: today });
    }
  }, [bookingsLoading, bookings]);

  if (bookingsLoading) {
    return <div>Loading...</div>;
  }

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
        <Calendar bookings={bookings || []} onChange={setDates} dates={dates} />
        {!!dates.endDate &&
          !!dates.startDate &&
          !isSameDay(dates.startDate, dates.endDate) && (
            <button
              className="bg-orange-100 text-black border border-orange-300 p-2 pr-4 pl-4 rounded-full text-sm font-semibold hover:bg-orange-300"
              onClick={submitBooking}
            >
              Book nu
            </button>
          )}
      </div>
    </main>
  );
}
