import useSWR from "swr";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";

const fetcher = async (url: string) => {
    try {
        const response = await apiWrapper(url, { method: "GET" });
        return response;
    } catch (error) {
        throw error;
    }
}

export default function useFamily() {
    const { data, error, isLoading, mutate } = useSWR("family", fetcher);
    
    return {
        family: data,
        familyError: error,
        familyLoading: isLoading,
        mutateFamily: mutate,
    };
}