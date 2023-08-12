import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { BookingResponseData } from "@/shared.types";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<BookingResponseData[]>(url, { method: "GET" });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useBookings(houseId: string) {
  const { data, error, isLoading, mutate } = useSWR(`bookings/${houseId}`, fetcher);

  return {
    bookings: data,
    bookingsError: error,
    bookingsLoading: isLoading,
    mutateBookings: mutate,
  };
}
