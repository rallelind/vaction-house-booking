import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { Family, FamilyResponseData } from "@/shared.types";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await apiWrapper<FamilyResponseData>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default function useUserFamily() {
  const { id } = useParams();

  const { data, error, mutate, isLoading } = useSWR<FamilyResponseData>(
    `user/family/${id}`,
    fetcher
  );

  return {
    userFamily: data,
    userFamilyError: error,
    userFamilyLoading: isLoading,
    mutateUserFamily: mutate,
  };
}
