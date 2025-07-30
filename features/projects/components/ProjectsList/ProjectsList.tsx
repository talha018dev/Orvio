'use client'

import EmptyListView from '@/components/EmptyListView'
import { AvatarCircles } from '@/components/UI/AvatarCircles'
import H2Text from '@/components/UI/H2Text'
import Icon from '@/components/UI/Icon'
import { COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import { formatDate } from '@/helpers/functionHelpers'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { SingleActiveProjectsListType } from '../../types/types'
import ProjectListSkeleton from './ProjectListSkeleton'
import useUserInfo from '@/hooks/useUserInfo'
import { cn } from '@/utils/tailwind-merge'
import moment from 'moment'
import SearchComponent from '@/components/SearchComponent'
import ProjectStatusChip from '@/features/projects/components/ProjectsList/ProjectStatusChip'

type ProjectsListProps = {
    projectList: SingleActiveProjectsListType[]
    isLoading: boolean
    isFetching: boolean
    isRefetching: boolean
    fetchNextPage: any
    hasNextPage: boolean
}

const ProjectsList = ({ projectList, isLoading, isFetching, isRefetching, fetchNextPage, hasNextPage }: ProjectsListProps) => {
    const userInfo = useUserInfo()
    const observer = useRef<IntersectionObserver>(null);

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading || isFetching) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            }, { threshold: 1.0 })

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading]
    );

    if (isLoading || isRefetching) return <ProjectListSkeleton className='mt-6' />

    return (
        <section className='flex flex-col space-y-3 mt-6 pb-3 w-full'>
            {/* <SearchComponent placeholder="Search by project name" /> */}
            {
                !projectList?.length ? <EmptyListView /> :
                    projectList?.length ? projectList?.map((project, index) => {
                        const isLastElement = index === projectList.length - 1;
                        return (
                            <Link key={project?._id} href={`/projects/${project?._id}/details`}>
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
                                    viewport={{ amount: 0.4 }}
                                    className='cursor-pointer '
                                >
                                    <div
                                        ref={isLastElement ? lastElementRef : null}
                                        key={project?._id}
                                        className='smooth bg-white p-3 rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'

                                    >
                                        <H2Text>{project?.name}</H2Text>
                                        <div className='flex items-center space-x-2 mt-3'>
                                            <AvatarCircles
                                                numPeople={Math.max(project.collaborators.length - 3, 0)}
                                                avatarUrls={project?.collaborators?.slice(0, 3)?.map((collaborator) => {
                                                    const getInitials = collaborator?.name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
                                                    return {
                                                        imageUrl: collaborator?.avatar ?? null,
                                                        profileName: getInitials
                                                    }
                                                })}
                                            />
                                            <Icon name={'CalendarDots'} color={COLOR_SECONDARY_TEXT} />
                                            <div className='text-secondaryText'>
                                                {
                                                    !project?.contract?.startDate ? null :
                                                        moment(project?.contract?.startDate).isAfter(moment()) ?
                                                            <div className='text-secondaryText'>Will start {formatDate(project?.contract?.startDate)}</div> :
                                                            <div className='text-secondaryText'>Started {formatDate(project?.contract?.startDate)}</div>
                                                }
                                            </div>
                                        </div>
                                        {
                                            userInfo?.user?.role === 'Client' ?
                                                <ProjectStatusChip status={project?.status} /> : null
                                        }
                                    </div>
                                </motion.div>
                            </Link>
                        )
                    }) : null
            }
            {
                isFetching ?
                    <div className="flex justify-center">
                        <ProjectListSkeleton />
                    </div> : null

            }
        </section>
    )
}

export default ProjectsList