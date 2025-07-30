'use client'

import EmptyListView from '@/components/EmptyListView';
import H3Text from '@/components/UI/H3Text';
import Icon from '@/components/UI/Icon';
import ImageComponent from '@/components/UI/ImageComponent';
import { COLOR_LIGHT_ASH, COLOR_PRIMARY_TEXT } from '@/constants/colorConstants';
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton';
import { getStagesListInfiniteQueryOptions } from '@/features/stages/queryOptions/stageQueryOptions';
import { SingleStagesListType } from '@/features/stages/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StageListForBoardSetup = ({ projectId, projectName }: { projectId: string, projectName: string }) => {
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

    const blankStageData = {
        _id: uuidv4(),
        createdBy: "",
        name: "Blank Board",
        status: "blank",
        details: "",
        clientId: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        stages: 0
    }

    const stagesList: SingleStagesListType[] = useMemo(() => {
        return data?.pages.reduce((acc, page) => {
            return [...acc, ...page?.data];
        }, [blankStageData])
    }, [data])



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

    if (isLoading || isRefetching) return <ProjectListSkeleton className='grid grid-cols-2 gap-3 mt-3' skeletonCount={20} skeletonClassName='h-[238px]' />
    return (
        <>

            <section className='grid grid-cols-2 gap-3 mt-3 pb-3'>
                {
                    !stagesList?.length ? <EmptyListView /> :
                        stagesList?.length ? stagesList?.map((stage, index) => {
                            const isLastElement = index === stagesList.length - 1;
                            return (
                                <Link
                                    key={stage?._id}
                                    href={stage?.status === 'blank' ? `/board/${projectId}/setup/blank/preview?projectName=${projectName}` : `/board/${projectId}/setup/${stage?._id}/preview?projectName=${projectName}`}
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
                                            key={stage?._id}
                                            className='smooth bg-white rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'
                                        >
                                            <div className='bg-lightGray  rounded-tr-lg rounded-tl-lg py-7 px-9 pb-0 text-center flex justify-center'>
                                                <ImageComponent imageClassName={stage?.status === 'blank' ? '[filter:brightness(0)_invert(1)]' : ''} src={'/stage-template.svg'} alt={'stage'} width={'w-[90px]'} height={'h-[110px]'} />
                                            </div>
                                            <div className='bg-white rounded-br-lg rounded-bl-lg p-4 '>
                                                <H3Text>{stage?.name}</H3Text>
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
                    <ProjectListSkeleton className='!grid !grid-cols-2 gap-3 mt-0' skeletonClassName='h-[238px]' /> : null

            }
        </>
    )
}

export default StageListForBoardSetup