import {infiniteQueryOptions, queryOptions} from '@tanstack/react-query'
import {getEinDetails, getPlanDetails, getPlansList, getVendorsList} from '../queryFunctions/vendorQueryFunctions'

export function getVendorsListInfiniteQueryOptions(pagination: any) {
  return infiniteQueryOptions({
    queryKey: ['getVendorsList', pagination],
    queryFn: ({pageParam = 1}) => getVendorsList({...pagination, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length
      const totalItems = lastPage.count
      const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0)

      return itemsFetched < totalItems ? currentPage + 1 : undefined
    },
  })
}

// export function getStageDetailsQueryOptions(stageId: string) {
//     return queryOptions({
//         queryKey: ['getStageDetails', stageId],
//         queryFn: () => getStageDetails(stageId),
//         enabled: !!stageId,
//         // staleTime: 0
//     })
// }

export function getEinDetailsQueryOptions(ein: string, callEinDetailsApi: boolean) {
  return queryOptions({
    queryKey: ['ein', ein],
    queryFn: () => getEinDetails(ein),
    enabled: callEinDetailsApi && ein?.length === 9,
  })
}
export function getPlansListQueryOptions() {
  return queryOptions({
    queryKey: ['plans'],
    queryFn: () => getPlansList(),
  })
}
export function getPlanDetailsQueryOptions(planId: string) {
  return queryOptions({
    queryKey: ['plan', planId],
    queryFn: () => getPlanDetails(planId),
    enabled: !!planId
  })
}
