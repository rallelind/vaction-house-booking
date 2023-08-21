import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { Family } from "@/shared.types";
import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<Family[]>(url, { method: "GET" });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useFamilies() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR<Family[]>(
    `/families/${id}`,
    fetcher
  );

  return {
    families: data,
    familiesLoading: isLoading,
    familiesError: error,
    mutateFamilies: mutate,
  };
}
