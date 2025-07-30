import { getActiveProjectListDropdown, getActiveProjectsList, getAllProjectsList, getAllProjectsListDropdown, getCompletedProjectsList, getIncompleteProjectDetails, getProjectDetails, getProjectsListByUserId, getTemporaryProjectDetails, getUpcomingProjectsList, getZipCodeDetails } from "@/features/projects/queryFunctions/projectQueryFunctions"
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

export function getZipCodeDetailsQueryOptions(zipCode: string, callZipDetailsApi: boolean) {
    return queryOptions({
        queryKey: ['getZipCodeDetails', zipCode],
        queryFn: () => getZipCodeDetails(zipCode),
        enabled: callZipDetailsApi
    })
}
export function getProjectDetailsQueryOptions(projectId: string) {
    return queryOptions({
        queryKey: ['getProjectDetails', projectId],
        queryFn: () => getProjectDetails(projectId),
        enabled: !!projectId,
        staleTime: 0
    })
}
export function getTemporaryProjectDetailsQueryOptions(projectId: string) {
    return queryOptions({
        queryKey: ['getTemporaryProjectDetails', projectId],
        queryFn: () => getTemporaryProjectDetails(projectId),
        enabled: !!projectId,
        staleTime: 0
    })
}
export function getIncompleteProjectDetailsQueryOptions(createButtonClicked: boolean) {
    return queryOptions({
        queryKey: ['getIncompleteProjectDetails'],
        queryFn: () => getIncompleteProjectDetails(),
        enabled: createButtonClicked,
        staleTime: 0
    })
}

export function getActiveProjectListDropdownQueryOptions(pagination: any) {
    return queryOptions({
        queryKey: ['getActiveProjectListDropdown', pagination],
        queryFn: () => getActiveProjectListDropdown(pagination),
        staleTime: 0
    })
}
export function getAllProjectListDropdownQueryOptions(pagination: any) {
    return queryOptions({
        queryKey: ['getAllProjectListDropdown', pagination],
        queryFn: () => getAllProjectsListDropdown(pagination),
        staleTime: 0
    })
}

export function getAllProjectsListInfiniteQueryOptions(pagination: any, role: 'Super Admin' | 'Client' | undefined) {
    return infiniteQueryOptions({
        queryKey: ["getAllProjectsList", pagination, role],
        queryFn: ({ pageParam = 1 }) => getAllProjectsList({ ...pagination, page: pageParam }),
        enabled: role === 'Client',
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}
export function getProjectsListByUserIdInfiniteQueryOptions(pagination: any, userId: string) {
    return infiniteQueryOptions({
        queryKey: ["getProjectsListByUserId", pagination, userId],
        queryFn: ({ pageParam = 1 }) => getProjectsListByUserId({ ...pagination, page: pageParam }, userId),
        enabled: !!userId,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}
export function getActiveProjectsListInfiniteQueryOptions(pagination: any, currentTab: 'Active' | 'Upcoming' | 'Completed') {
    return infiniteQueryOptions({
        queryKey: ["getActiveProjectsList", pagination, currentTab],
        queryFn: ({ pageParam = 1 }) => getActiveProjectsList({ ...pagination, page: pageParam }),
        enabled: currentTab === 'Active',
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}
export function getUpcomingProjectsListInfiniteQueryOptions(pagination: any, currentTab: 'Active' | 'Upcoming' | 'Completed') {
    return infiniteQueryOptions({
        queryKey: ["getUpcomingProjectsList", pagination, currentTab],
        queryFn: ({ pageParam = 1 }) => getUpcomingProjectsList({ ...pagination, page: pageParam }),
        initialPageParam: 1,
        enabled: currentTab === 'Upcoming',
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}
//Completed
export function getCompletedProjectsListInfiniteQueryOptions(pagination: any, currentTab: 'Active' | 'Upcoming' | 'Completed') {
    return infiniteQueryOptions({
        queryKey: ["getCompletedProjectsList", pagination],
        queryFn: ({ pageParam = 1 }) => getCompletedProjectsList({ ...pagination, page: pageParam }),
        initialPageParam: 1,
        enabled: currentTab === 'Completed',
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalItems = lastPage.count;
            const itemsFetched = allPages.reduce((acc, page) => acc + page.data.length, 0);

            return itemsFetched < totalItems ? currentPage + 1 : undefined;
        }
    })
}