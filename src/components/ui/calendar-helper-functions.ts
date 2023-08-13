import { BookingResponseData } from "@/shared.types";
import { isWithinInterval, isSameDay } from "date-fns";

export const dayBooked = (
  day: Date,
  bookings: BookingResponseData[] | undefined
) => {
  if (!bookings) return;

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

export const startDateRange = (
  day: Date,
  bookings: BookingResponseData[] | undefined
) => {
  if (!bookings) return;

  return bookings.some((range) => {
    const { start_date } = range.booking;
    const startDate = new Date(start_date);

    const isStartDateEqual = isSameDay(day, startDate);

    return isStartDateEqual;
  });
};

export const endDateRange = (
  day: Date,
  bookings: BookingResponseData[] | undefined
) => {
  if (!bookings) return;

  return bookings.some((range) => {
    const { end_date } = range.booking;

    const endDate = new Date(end_date);

    const isEndDateEqual = isSameDay(day, endDate);

    return isEndDateEqual;
  });
};

export const findUserBooking = (
  day: Date,
  bookings: BookingResponseData[] | undefined
) => {
  if (!bookings) return;

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

export const highlightBooking = (
  day: Date,
  bookings: BookingResponseData[] | undefined,
  highlightedBooking: number
) => {
  if (!bookings) return;

  const booking = bookings.find((range) => {
    const { id } = range.booking;

    return id === highlightedBooking;
  });

  if (!booking) return;

  const { start_date, end_date } = booking.booking;

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const withinInterval = isWithinInterval(day, {
    start: startDate,
    end: endDate,
  });

  const isStartDateEqual = isSameDay(day, startDate);

  return withinInterval || isStartDateEqual;
};
