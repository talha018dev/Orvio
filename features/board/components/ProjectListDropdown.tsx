'use client'

import DropDown from '@/components/UI/Dropdown'
import H1Text from '@/components/UI/H1Text'
import H3Text from '@/components/UI/H3Text'
import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { getActiveProjectListDropdownQueryOptions, getAllProjectListDropdownQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { cn } from '@/utils/tailwind-merge'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { memo } from 'react'

const ProjectListDropdown = ({ page, projectId, projectName, projectListType }: { page?: 'ActivityDetailsPage', projectId: string, projectName: string, projectListType?: 'active' | 'inactive' | 'all' }) => {
    const pagination = {
        page: 1,
        size: 1000,
    }

    const { data: projectsList, error, isFetching: projectsListLoader, isLoading, isRefetching } =
        useQuery(projectListType === 'all' ? getAllProjectListDropdownQueryOptions(pagination) : getActiveProjectListDropdownQueryOptions(pagination))

    if (projectsListLoader) return <div className='h-6 w-full rounded-xl bg-white mr-4 animate-pulse'></div>

    return (
        <DropDown
            button={
                // <button className="flex items-start gap-0 cursor-pointer">
                <H1Text className='inline cursor-pointer'>
                    {projectsList?.data?.find(p => p._id === projectId)?.name}
                    <span className=' ml-2 inline-block'><Icon name={'CaretDown'} color={COLOR_PRIMARY_TEXT} className='mt-1.5' /></span>
                </H1Text>
                // <H1Text className="inline">
                //     {projectsList?.data?.find(p => p._id === projectId)?.name} asdasd asdasdasd asdasdasd assdasdasd
                //     <span className="inline-block align-text-bottom ml-1">
                //         <Icon className="w-4 h-4" name={'CaretDown'} color={''} />
                //     </span>
                // </H1Text>
                // </button>
            }
        >
            {
                projectsList?.data?.length ? projectsList?.data?.map(project => {
                    return (
                        <Link
                            key={project?._id}
                            prefetch={false}
                            href={
                                page === 'ActivityDetailsPage' ? `/activity/${project?.boardId ?? 'unavailableBoard'}?projectId=${project?._id}&projectName=${project?.name}` :
                                    project?.boardId ? `/board/${project?._id}/${project?.boardId}/details?projectName=${project?.name}` :
                                        `/board/${project?._id}/setup?projectName=${project?.name}`
                            }
                        >
                            <H3Text
                                className={
                                    cn('cursor-pointer hover:bg-pageBgColor hover:rounded-lg pl-6 transition-all duration-300 relative',
                                        { 'bg-pageBgColor rounded-lg': project?._id === projectId })
                                }
                            >
                                {
                                    project?._id === projectId ?
                                        <Icon className='absolute left-1 top-0.5' name={'Check'} color={COLOR_PRIMARY_TEXT} fontSize={14} /> : null
                                }
                                {project?.name}
                            </H3Text>
                        </Link>
                    )
                }) : null
            }
        </DropDown>
    )
}

export default memo(ProjectListDropdown, (prev, next) =>
    prev?.projectId === next?.projectId && prev?.projectName === next?.projectName
)