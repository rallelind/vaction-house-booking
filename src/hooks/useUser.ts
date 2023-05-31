import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { method: 'GET', credentials: 'include' }).then(r => r.json())

export default function useUser() {
    const { data, error } = useSWR("http://localhost:3000/users/me", fetcher)

    return {
        user: data,
        userError: error
    }
}