"use client";

import { AceternityTab } from "@/components/AceternityTab";
import ProjectsList from "@/features/projects/components/ProjectsList/ProjectsList";
import { getActiveProjectsListInfiniteQueryOptions, getAllProjectsListInfiniteQueryOptions, getCompletedProjectsListInfiniteQueryOptions, getUpcomingProjectsListInfiniteQueryOptions } from "@/features/projects/queryOptions/projectQueryOptions";
import { SingleActiveProjectsListType } from "@/features/projects/types/types";
import useUserInfo from "@/hooks/useUserInfo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ProjectListTabsProps = {

}

export function ProjectListTabs({ }: ProjectListTabsProps) {
    const searchParams = useSearchParams()
    const currentTab = (searchParams.get('currentTab') ?? 'Active') as 'Active' | 'Upcoming' | 'Completed'

    const userInfo = useUserInfo()
    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? ''
    }
    const { data: allProjectsData, fetchNextPage: fetchNextPageAllProjects, hasNextPage: hasNextPageAllProjects, isFetching: isFetchingAllProjects, isLoading: isLoadingAllProjects, isRefetching: isRefetchingAllProjects } =
        useInfiniteQuery(getAllProjectsListInfiniteQueryOptions(pagination, userInfo?.user?.role))

    const { data: activeProjectsData, fetchNextPage: fetchNextPageActiveProjects, hasNextPage: hasNextPageActiveProjects, isFetching: isFetchingActiveProjects, isLoading: isLoadingActiveProjects, isRefetching: isRefetchingActiveProjects } =
        useInfiniteQuery(getActiveProjectsListInfiniteQueryOptions(pagination, currentTab))

    const { data: upcomingProjectsData, fetchNextPage: fetchNextPageUpcomingProjects, hasNextPage: hasNextPageUpcomingProjects, isFetching: isFetchingUpcomingProjects, isLoading: isLoadingUpcomingProjects, isRefetching: isRefetchingUpcomingProjects } =
        useInfiniteQuery(getUpcomingProjectsListInfiniteQueryOptions(pagination, currentTab))

    const { data: completedProjectsData, fetchNextPage: fetchNextPageCompletedProjects, hasNextPage: hasNextPageCompletedProjects, isFetching: isFetchingCompletedProjects, isLoading: isLoadingCompletedProjects, isRefetching: isRefetchingCompletedProjects } =
        useInfiniteQuery(getCompletedProjectsListInfiniteQueryOptions(pagination, currentTab))

    const allProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
        return allProjectsData?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data]
        }, [])
    }, [allProjectsData])

    const activeProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
        return activeProjectsData?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, [])
    }, [activeProjectsData])

    const upcomingProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
        return upcomingProjectsData?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, [])
    }, [upcomingProjectsData])

    const completedProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
        return completedProjectsData?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, [])
    }, [completedProjectsData])

    const tabs = [
        {
            title: "Active",
            value: "Active",
            content: (
                <>
                    {
                        currentTab === 'Active' || !currentTab ?
                            <ProjectsList
                                projectList={activeProjectsList}
                                fetchNextPage={fetchNextPageActiveProjects}
                                hasNextPage={hasNextPageActiveProjects}
                                isFetching={isFetchingActiveProjects}
                                isLoading={isLoadingActiveProjects}
                                isRefetching={isRefetchingActiveProjects}
                            /> : null
                    }
                </>
            ),
        },
        {
            title: "Upcoming",
            value: "Upcoming",
            content: (
                <>
                    {
                        currentTab === 'Upcoming' ?
                            <ProjectsList
                                projectList={upcomingProjectsList}
                                fetchNextPage={fetchNextPageUpcomingProjects}
                                hasNextPage={hasNextPageUpcomingProjects}
                                isFetching={isFetchingUpcomingProjects}
                                isLoading={isLoadingUpcomingProjects}
                                isRefetching={isRefetchingUpcomingProjects}
                            /> : null
                    }
                </>
            ),
        },
        {
            title: "Completed",
            value: "Completed",
            content: (
                <>
                    {
                        currentTab === 'Completed' ?
                            <ProjectsList
                                projectList={completedProjectsList}
                                fetchNextPage={fetchNextPageCompletedProjects}
                                hasNextPage={hasNextPageCompletedProjects}
                                isFetching={isFetchingCompletedProjects}
                                isLoading={isLoadingCompletedProjects}
                                isRefetching={isRefetchingCompletedProjects}
                            /> : null
                    }
                </>
            ),
        },
    ]

    return (
        <div className="[perspective:1000px] relative b flex flex-col w-full  items-start justify-start mt-6">
            {
                userInfo?.user?.role === 'Client' ?
                    <ProjectsList
                        projectList={allProjectsList}
                        fetchNextPage={fetchNextPageAllProjects}
                        hasNextPage={hasNextPageAllProjects}
                        isFetching={isFetchingAllProjects}
                        isLoading={isLoadingAllProjects}
                        isRefetching={isRefetchingAllProjects}
                    /> :
                    <AceternityTab tabs={tabs} />
            }
        </div>
    );
}







