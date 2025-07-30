'use client'

import EmptyListView from '@/components/EmptyListView';
import H3Text from '@/components/UI/H3Text';
import Icon from '@/components/UI/Icon';
import ImageComponent from '@/components/UI/ImageComponent';
import { COLOR_LIGHT_ASH, COLOR_PRIMARY_TEXT } from '@/constants/colorConstants';
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton';
import { getActiveProjectsListInfiniteQueryOptions, getAllProjectsListInfiniteQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions';
import { SingleActiveProjectsListType } from '@/features/projects/types/types';
import useUserInfo from '@/hooks/useUserInfo';
import { cn } from '@/utils/tailwind-merge';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';

const ProjectSelectForActivity = () => {

    const userInfo = useUserInfo()
    const router = useRouter()
    const searchParams = useSearchParams()
    const observer = useRef<IntersectionObserver>(null);
    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? ''
    }

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
        useInfiniteQuery(getAllProjectsListInfiniteQueryOptions(pagination, 'Client'));

    const allProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
        return data?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, []);
    }, [data]);

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

    if (isLoading || isRefetching) return <ProjectListSkeleton className='grid grid-cols-2 gap-3 mt-6' skeletonCount={20} skeletonClassName='h-[172px]' />
    return (
        <>
            <section className={cn('grid grid-cols-2 gap-3 mt-3 pb-3', { 'grid-cols-1': !allProjectsList?.length })}>
                {
                    !allProjectsList?.length ? <EmptyListView /> :
                        allProjectsList?.length ? allProjectsList?.map((project, index) => {
                            const isLastElement = index === allProjectsList.length - 1;
                            return (
                                <Link
                                    key={project?._id}
                                    href={`/activity/${project?.boardId ?? 'unavailableBoard'}?projectId=${project?._id}&projectName=${project?.name}`}
                                >
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
                                            className='smooth bg-white rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'
                                        >
                                            <div className={cn('bg-lightGray rounded-tr-lg rounded-tl-lg p-4 text-center flex justify-center', { 'p-6 pb-0': project?.boardId })}>
                                                {
                                                    project?.boardId ?
                                                        <ImageComponent src={'/stage-template-2.svg'} alt={'stage'} width={'w-full'} height={'h-[52px]'} /> :
                                                        <Icon name={'Folder'} color={COLOR_LIGHT_ASH} fontSize={44} />
                                                }
                                            </div>
                                            <div className='bg-white rounded-br-lg rounded-bl-lg border-1 border-borderColor p-4'>
                                                <H3Text>{project?.name}</H3Text>
                                                <div className='flex items-center mt-2 text-sm font-semibold bg-pageBgColor rounded-full py-2.5 px-4'>
                                                    <span>Choose</span>
                                                    <span className='ml-auto'><Icon name={'ArrowUpRight'} color={COLOR_PRIMARY_TEXT} fontSize={14} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            )
                        }) : null
                }
            </section>
            {
                isFetching ?
                    <ProjectListSkeleton className='!grid !grid-cols-2 gap-3 mt-0' skeletonClassName='h-[172px]' /> : null
            }
        </>
    )
}

export default ProjectSelectForActivity