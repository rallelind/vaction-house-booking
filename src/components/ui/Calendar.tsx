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
} from "./calendar-helper-functions";
import useBookings from "@/hooks/useBookings";
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
  bookings: BookingResponseData[];
}

const CalendarDays = ({
  month,
  dates,
  onChange,
}: {
  month: Date;
  dates: { startDate: Date; endDate: Date };
  onChange: (dates: { startDate: Date; endDate: Date }) => void;
}) => {
  let days = eachDayOfInterval({
    start: month,
    end: endOfMonth(month),
  });

  let today = startOfToday();

  const { id } = useParams();
  const { bookings, bookingsError, bookingsLoading } = useBookings(id);

  if (!bookings || bookingsError) {
    return <h1>Sorry, error getting bookings</h1>;
  }

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
              dayBooked(day, bookings) && "bg-orange-200",
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
              disabled={dayBooked(day, bookings) || isBefore(day, today)}
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
                "w-full h-full hover:border-2 hover:border-black hover:rounded-full disabled:text-white"
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

export default function Calendar({ dates, onChange, bookings }: CalendarProps) {
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
    <div>
      <div className="max-w-md md:max-w-4xl">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
