import { BookingResponseData } from "@/shared.types";
import { isWithinInterval, isSameDay } from "date-fns";

export const dayBooked = (day: Date, bookings: BookingResponseData[]) => {
  return bookings.some((range) => {
    const { start_date, end_date } = range.booking;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const withinInterval = isWithinInterval(day, {
      start: startDate,
      end: endDate,
    });

    const isStartDateEqual = isSameDay(day, startDate);

    return withinInterval || isStartDateEqual;
  });
};

export const startDateRange = (day: Date, bookings: BookingResponseData[]) => {
  return bookings.some((range) => {
    const { start_date } = range.booking;
    const startDate = new Date(start_date);

    const isStartDateEqual = isSameDay(day, startDate);

    return isStartDateEqual;
  });
};

export const endDateRange = (day: Date, bookings: BookingResponseData[]) => {
  return bookings.some((range) => {
    const { end_date } = range.booking;

    const endDate = new Date(end_date);

    const isEndDateEqual = isSameDay(day, endDate);

    return isEndDateEqual;
  });
};

export const findUserBooking = (day: Date, bookings: BookingResponseData[]) => {
  return bookings.find((range) => {
    const { start_date, end_date } = range.booking;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const withinInterval = isWithinInterval(day, {
      start: startDate,
      end: endDate,
    });

    const isStartDateEqual = isSameDay(day, startDate);

    return withinInterval || isStartDateEqual;
  });
};
