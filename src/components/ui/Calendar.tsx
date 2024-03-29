"use client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { BookingResponseData } from "@/shared.types";
import {
  findUserBooking,
  endDateRange,
  startDateRange,
  dayBooked,
  highlightBooking,
} from "./calendar-helper-functions";
import useBookings from "@/hooks/bookings/useBookings";
import { useParams } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  dates: {
    startDate: Date;
    endDate: Date;
  };
  onChange: (dates: { startDate: Date; endDate: Date }) => void;
  highlightedBooking: number;
}

const CalendarDays = ({
  month,
  dates,
  onChange,
  highlightedBooking,
}: {
  month: Date;
  dates: { startDate: Date; endDate: Date };
  onChange: (dates: { startDate: Date; endDate: Date }) => void;
  highlightedBooking: number;
}) => {
  let days = eachDayOfInterval({
    start: month,
    end: endOfMonth(month),
  });

  let today = startOfToday();

  const { bookings } = useBookings();

  const { startDate, endDate } = dates;

  const handleSelectedDay = (day: Date) => {
    if (!startDate || !endDate) {
      onChange({ startDate: day, endDate: day });
    }

    if (isEqual(day, startDate) || isEqual(day, endDate)) {
      onChange({ startDate: day, endDate: day });
    }

    if (isAfter(day, startDate)) {
      onChange({ startDate, endDate: day });
    }

    if (isBefore(day, startDate)) {
      onChange({ startDate: day, endDate });
    }
  };

  // When the user picks a start date the end date needs to be the next booking date from the start date
  // Thereby when the user picks a date we should get the two bookins that is before and after the selected date
  const nextBooking = bookings?.find(
    ({ booking }) => new Date(booking.start_date) > startDate
  );

  const nextBookingIndex =
    bookings?.findIndex(
      ({ booking }) => booking.id === nextBooking?.booking.id
    ) || 0;

  const previousBooking = bookings?.[nextBookingIndex - 1];

  const previousBookingDate = previousBooking?.booking.start_date;
  const nextBookingDate = nextBooking?.booking.start_date;

  return (
    <>
      <div className="grid grid-cols-7 mt-10 text-md leading-6 text-center text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-md">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              endDateRange(day, bookings) && "rounded-r-full",
              startDateRange(day, bookings) && "rounded-l-full",
              highlightBooking(day, bookings, highlightedBooking)
                ? "bg-orange-300"
                : dayBooked(day, bookings) && "bg-orange-200",
              !!startDate &&
                !!endDate &&
                isWithinInterval(day, {
                  start: startDate,
                  end: endDate,
                }) &&
                !isEqual(endDate, startDate) &&
                "bg-orange-100 z-0 relative",
              !!startDate &&
                !!endDate &&
                !isWithinInterval(day, {
                  start: startDate,
                  end: endDate,
                }) &&
                !isEqual(day, startDate) &&
                !isEqual(day, endDate) &&
                isSameMonth(day, month) &&
                "text-gray-900",
              !!startDate &&
                !!endDate &&
                !isWithinInterval(day, {
                  start: startDate,
                  end: endDate,
                }) &&
                !isEqual(day, startDate) &&
                !isEqual(day, endDate) &&
                !isSameMonth(day, month) &&
                "text-gray-400",
              isEqual(day, startDate) &&
                !isEqual(day, endDate) &&
                "rounded-l-full",
              isEqual(day, endDate) &&
                !isEqual(day, startDate) &&
                "rounded-r-full",
              isEqual(day, startDate) &&
                isEqual(day, endDate) &&
                "font-semibold",
              "mx-auto flex h-10 items-center justify-center w-full relative z-0 mb-4"
            )}
          >
            {startDateRange(day, bookings) && (
              <div className="absolute left-[-3px] top-[-5px] w-6 h-6 z-100 ">
                <img
                  className="w-6 h-6 rounded-full border-2 border-orange-200 z-100"
                  alt="user"
                  src={findUserBooking(day, bookings)?.user.profile_image_url}
                />
              </div>
            )}
            <button
              type="button"
              disabled={
                dayBooked(day, bookings) ||
                isBefore(day, today) ||
                (nextBookingDate &&
                  startDate &&
                  isAfter(day, new Date(nextBookingDate))) ||
                (previousBookingDate &&
                  startDate &&
                  isBefore(day, new Date(previousBookingDate)))
              }
              onClick={() => handleSelectedDay(day)}
              className={classNames(
                isEqual(day, startDate) &&
                  isEqual(day, endDate) &&
                  "bg-orange-200 text-white rounded-full",
                isEqual(day, startDate) &&
                  !isEqual(day, endDate) &&
                  "bg-orange-200 text-white rounded-full",
                isEqual(day, endDate) &&
                  !isEqual(day, startDate) &&
                  "bg-orange-200 text-white rounded-full",
                "w-full h-full hover:border-2 hover:border-black hover:rounded-full disabled:text-white hover:disabled:border-none"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Calendar({
  dates,
  onChange,
  highlightedBooking,
}: CalendarProps) {
  let today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="md:pr-14">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <CalendarDays
        highlightedBooking={highlightedBooking}
        onChange={onChange}
        dates={dates}
        month={firstDayCurrentMonth}
      />
      <h2 className="flex-auto font-semibold text-gray-900">
        {format(firstDayNextMonth, "MMMM yyyy")}
      </h2>
      <CalendarDays
        onChange={onChange}
        dates={dates}
        month={firstDayNextMonth}
        highlightedBooking={highlightedBooking}
      />
    </div>
  );
}
