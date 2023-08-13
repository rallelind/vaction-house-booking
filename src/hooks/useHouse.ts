import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import useSWR from "swr";
import { House } from "@/shared.types";

const fetcher = async (url: string) => {
  try {
    const house = await apiWrapper<House>(url, { method: "GET" });
    return house;
  } catch (error) {
    throw error;
  }
};

export default function useHouse(id: string) {
  const { data, error, isLoading, mutate } = useSWR<House>(`house/${id}`, fetcher);

  return {
    house: data,
    houseError: error,
    houseLoading: isLoading,
    mutateHouse: mutate,
  };
}
