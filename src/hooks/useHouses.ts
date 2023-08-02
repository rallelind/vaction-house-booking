import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { House } from "@/lib/api-wrapper/types";
import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const housesResponse = await apiWrapper(url, { method: "GET" });
    return housesResponse;
  } catch (error) {
    throw error;
  }
};

export default function useHouses() {
  const { data, error, isLoading } = useSWR("/house", fetcher);

  return {
    houses: data as House[],
    housesError: error,
    housesIsloading: isLoading,
  };
}
