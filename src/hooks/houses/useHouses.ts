import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { House } from "@/shared.types";
import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const housesResponse = await apiWrapper<House[]>(url, { method: "GET" });
    return housesResponse;
  } catch (error) {
    throw error;
  }
};

export default function useHouses() {
  const { data, error, isLoading, mutate } = useSWR<House[]>("house", fetcher);

  return {
    houses: data,
    housesError: error,
    housesIsloading: isLoading,
    mutateHouses: mutate,
  };
}
