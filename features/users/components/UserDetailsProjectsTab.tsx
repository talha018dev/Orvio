import H1Text from '@/components/UI/H1Text'
import { getAllProjectsListInfiniteQueryOptions, getProjectsListByUserIdInfiniteQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { SingleActiveProjectsListType } from '@/features/projects/types/types'
import UserProjectsList from '@/features/users/components/UserProjectsList'
import useUserInfo from '@/hooks/useUserInfo'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

const UserDetailsProjectsTab = ({userId}: {userId: string}) => {
    const searchParams = useSearchParams()
    const userInfo = useUserInfo()

    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? ''
    }

    const { data: projectData, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
        useInfiniteQuery(getProjectsListByUserIdInfiniteQueryOptions(pagination, userId))

    const projectsListByUserId: SingleActiveProjectsListType[] = useMemo(() => {
        return projectData?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, [])
    }, [projectData])
    return (
        <>
        <H1Text className='pt-6'>Projects</H1Text>
        <UserProjectsList
            projectList={projectsListByUserId}
            isLoading={isLoading}
            isFetching={isFetching}
            isRefetching={isRefetching}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
        />
        </>
    )
}

export default UserDetailsProjectsTab