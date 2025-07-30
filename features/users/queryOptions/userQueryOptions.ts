import { getClientDetails, getClientsList, getCollaboratorsList, getUserDetails, getUsersList } from "@/features/users/queryFunctions/userQueryFunctions"
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

export function getCollaboratorsListQueryOptions() {
    return queryOptions({
        queryKey: ['getCollaboratorsList'],
        queryFn: () => getCollaboratorsList()
    })
}
export function getClientsListQueryOptions() {
    return queryOptions({
        queryKey: ['getClientsList'],
        queryFn: () => getClientsList(),
        staleTime: 0
    })
}
export function getClientDetailsQueryOptions(clientId: string | null) {
    return queryOptions({
        queryKey: ['getClientDetails', clientId],
        queryFn: () => getClientDetails(clientId),
        enabled: !!clientId,
        staleTime: 0
    })
}
export function getUserDetailsQueryOptions(userId: string) {
    return queryOptions({
        queryKey: ['getUserDetails', userId],
        queryFn: () => getUserDetails(userId),
        enabled: !!userId,
        staleTime: 0
    })
}


export function getUsersListInfiniteQueryOptions(pagination: any) {
    return infiniteQueryOptions({
        queryKey: ["getUsersList", pagination],
        queryFn: ({ pageParam = 1 }) => getUsersList({ ...pagination, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}