import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { House } from "@/lib/api-wrapper/types";
import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const house = await apiWrapper(url, { method: "GET" });
    return house;
  } catch (error) {
    throw error;
  }
};

export default function useHouse(id: string) {
  const { data, error, isLoading } = useSWR(`/house/${id}`, fetcher);

  return {
    house: data as House,
    houseError: error,
    houseLoading: isLoading,
  };
}
