import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await fetch(url, { method: 'GET', credentials: 'include' });

    if(response.status === 401) {
       throw new Error("unauthorized")
    }

    return response.json()
}

export default function useUser() {
    const { data, error } = useSWR("http://localhost:3000/users/me", fetcher)

    return {
        user: data,
        userError: error
    }
}