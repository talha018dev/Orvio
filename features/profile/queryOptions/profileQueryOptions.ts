import { getProfileDetails } from "@/features/profile/queryFunctions/profileQueryFunctions"
import { queryOptions } from "@tanstack/react-query"

export function getProfileDetailsQueryOptions(userId: string) {
    return queryOptions({
        queryKey: ['getProfileDetails', userId],
        queryFn: () => getProfileDetails(userId),
        enabled: !!userId,
        // staleTime: 0
    })
}
