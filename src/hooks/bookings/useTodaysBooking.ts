import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { BookingResponseData } from "@/shared.types";
import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<BookingResponseData>(url, {
      method: "GET",
    });

    if (typeof response === "string") throw new Error("No bookings today");

    return response;
  } catch (error) {
    throw error;
  }
};

export default function useTodaysBooking() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR<BookingResponseData>(
    `booking/${id}/today`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  return {
    todaysBooking: data,
    todaysBookingError: error,
    todaysBookingLoading: isLoading,
    mutateTodaysBooking: mutate,
  };
}
