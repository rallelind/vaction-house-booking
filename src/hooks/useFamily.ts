import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await fetch(url, { method: 'GET', credentials: 'include' });

    return response.json()
}

export default function useFamily() {

    const { data, isLoading, error, mutate } = useSWR("http://localhost:3000/family", fetcher);
    
    return {
        family: data,
        loadingFamily: isLoading,
        familyError: error,
        mutateFamily: mutate
    }
}