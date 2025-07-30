import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { getStageDetails, getStagesList } from "../queryFunctions/stageQueryFunctions"

export function getStagesListInfiniteQueryOptions(pagination: any) {
    return infiniteQueryOptions({
        queryKey: ["getStagesList", pagination],
        queryFn: ({ pageParam = 1 }) => getStagesList({ ...pagination, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}

export function getStageDetailsQueryOptions(stageId: string) {
    return queryOptions({
        queryKey: ['getStageDetails', stageId],
        queryFn: () => getStageDetails(stageId),
        enabled: !!stageId,
        // staleTime: 0
    })
}