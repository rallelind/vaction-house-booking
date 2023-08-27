import useSWR from "swr"
import apiWrapper from "@/lib/api-wrapper/api-wrapper"

const fetcher = async (url: string) => {
    try {
        const response = await apiWrapper(url, {
            method: "GET",
        })
        return response
    } catch (error) {
        throw error
    }
}

export default function usePaymentMethods() {
    const { data, error, mutate, isLoading } = useSWR(
        `/payment/methods`,
        fetcher
    )

    return {
        paymentMethods: data,
        paymentMethodsError: error,
        paymentMethodsLoading: isLoading,
        mutatePaymentMethods: mutate,
    }
}