import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { Family } from "@/shared.types";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<Family>(url, { method: "GET" });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useUserFamily(houseId: string) {
  const { data, error, mutate, isLoading } = useSWR<Family>(
    `family/me/${houseId}`,
    fetcher
  );

  return {
    userFamily: data,
    userFamilyError: error,
    userFamilyLoading: isLoading,
    mutateUserFamily: mutate,
  };
}
