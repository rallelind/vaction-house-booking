"use client";
import { useState, useRef, useEffect } from "react";
import Calendar from "@/components/ui/Calendar";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import startOfToday from "date-fns/startOfToday";
import { useParams } from "next/navigation";
import { isSameDay, isWithinInterval, format } from "date-fns";
import Avatar from "@/components/ui/Avatar";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function Application() {
  const { id } = useParams();
  const { bookings, bookingsLoading } = useBookings(id);
  
  const [hoveredBooking, setHoveredBooking] = useState(null);
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

  console.log(bookings);

  return (
    <main>
      <div className="max-w-md md:max-w-4xl h-full m-auto">
        <div className="md:grid md:grid-cols-2 grid-rows-1 md:divide-x md:divide-gray-200">
          <div>
            <Calendar
              bookings={bookings || []}
              onChange={setDates}
              dates={dates}
              highlightedBooking={hoveredBooking}
            />
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
          <div className="w-full">
            <h2 className="ml-4 font-normal text-2xl">
              Reserveringer af sommerhus
            </h2>
            <ul className="m-4">
              {bookings?.map((booking) => (
                <li
                  key={booking.booking.id}
                  className="flex bg-orange-50 p-4 mb-4 rounded-lg hover:bg-orange-100"
                  onMouseEnter={() => setHoveredBooking(booking.booking.id)}
                  onMouseLeave={() => setHoveredBooking(null)}
                >
                  <Avatar
                    height="12"
                    width="12"
                    avatarUrl={booking.user.profile_image_url}
                  />
                  <div className="ml-4">
                    <p className="font-semibold">
                      {booking.user.first_name} {booking.user.last_name}
                    </p>
                    <div className="flex">
                      <CalendarIcon className="h-6" />
                      <p className="ml-2">
                        {`${format(
                          new Date(booking.booking.start_date),
                          "dd MMMM"
                        )} til ${format(
                          new Date(booking.booking.end_date),
                          "dd MMMM"
                        )}`}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
