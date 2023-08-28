import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { useParams } from "next/navigation";
import { Booking } from "@/shared.types";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<Booking[]>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function usePastBookings() {
    const { id } = useParams();

    const { data, error, mutate, isLoading } = useSWR<Booking[]>(
        `booking/${id}/past`,
        fetcher
    );
    
    return {
        pastBookings: data,
        pastBookingsError: error,
        pastBookingsLoading: isLoading,
        mutatePastBookings: mutate,
    };
}
