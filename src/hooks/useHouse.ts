import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import useSWR from "swr";
import { House } from "@/shared.types";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const house = await apiWrapper<House>(url, { method: "GET" });
    return house;
  } catch (error) {
    throw error;
  }
};

export default function useHouse() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR<House>(
    `house/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    house: data,
    houseError: error,
    houseLoading: isLoading,
    mutateHouse: mutate,
  };
}
