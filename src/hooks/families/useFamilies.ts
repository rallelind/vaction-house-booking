import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { FamilyResponseData } from "@/shared.types";
import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<FamilyResponseData[]>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useFamilies() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR<FamilyResponseData[]>(
    `house/families/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    }
  );

  return {
    families: data,
    familiesLoading: isLoading,
    familiesError: error,
    mutateFamilies: mutate,
  };
}
