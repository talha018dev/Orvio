'use client'

import EmptyListView from '@/components/EmptyListView'
import Chip from '@/components/UI/Chip'
import H2Text from '@/components/UI/H2Text'
import Icon from '@/components/UI/Icon'
import { COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton'
import { cn } from '@/utils/tailwind-merge'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef } from 'react'
import { getStagesListInfiniteQueryOptions } from '../queryOptions/stageQueryOptions'
import { SingleStagesListType } from '../types/types'

const StagesList = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const observer = useRef<IntersectionObserver>(null);
    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? '',
        status: searchParams?.get("status") ?? 'active'
    }

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
        useInfiniteQuery(getStagesListInfiniteQueryOptions(pagination));

    const stagesList: SingleStagesListType[] = useMemo(() => {
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
    )

    if (isLoading || isRefetching) return <ProjectListSkeleton className='mt-6' />

    return (
        <section className={cn('flex flex-col space-y-3 mt-6 pb-3')}>
            {
                !stagesList?.length ? <EmptyListView /> :
                    stagesList?.length ? stagesList?.map((stage, index) => {
                        const isLastElement = index === stagesList.length - 1;
                        return (
                            <motion.div
                                key={stage?._id}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
                                viewport={{ amount: 0.4 }}
                                className='cursor-pointer '
                                onClick={() => router.push(`/stages/${stage?._id}/details`)}
                            >
                                <div
                                    ref={isLastElement ? lastElementRef : null}
                                    key={stage?._id}
                                    className='smooth bg-white p-3 rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'

                                >
                                    <H2Text>{stage?.name}</H2Text>
                                    <div className='flex items-center space-x-1 mt-3'>
                                        <Chip status={stage?.status} />
                                        <Icon name={'Rows'} color={COLOR_SECONDARY_TEXT} weight='light' />
                                        <div className='text-secondaryText'>{stage?.stages} Stages</div>
                                    </div>
                                </div>
                            </motion.div>
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

export default StagesList