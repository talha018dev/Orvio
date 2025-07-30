import { getAllProjectsList } from '@/features/projects/queryFunctions/projectQueryFunctions'
import { ActiveProjectsListType } from '@/features/projects/types/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useProjects = () => {
    const { data: allProjects } = useQuery<ActiveProjectsListType>({
        queryKey: ['allProjects'],
        queryFn: () => getAllProjectsList({ page: 1, size: 10000 })
    })

    return { allProjects }
}

export default useProjects