import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { BookingResponseData } from "@/shared.types";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<BookingResponseData[]>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useBookings() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR<BookingResponseData[]>(
    `booking/bookings/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    bookings: data,
    bookingsError: error,
    bookingsLoading: isLoading,
    mutateBookings: mutate,
  };
}
