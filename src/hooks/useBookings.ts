import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper(url, { method: "GET" });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useBookings() {
    const { data, error, isLoading, mutate } = useSWR("bookings", fetcher);
    
    return {
        bookings: data,
        bookingsError: error,
        bookingsLoading: isLoading,
        mutateBookings: mutate,
    };
}