'use client'

import EmptyListView from '@/components/EmptyListView'
import Chip from '@/components/UI/Chip'
import H2Text from '@/components/UI/H2Text'
import H5Text from '@/components/UI/H5Text'
import Icon from '@/components/UI/Icon'
import ImageComponent from '@/components/UI/ImageComponent'
import { COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton'
import { SingleStagesListType } from '@/features/stages/types/types'
import UserStatusChip from '@/features/users/components/UserStatusChip'
import { getUsersListInfiniteQueryOptions } from '@/features/users/queryOptions/userQueryOptions'
import { SingleUserType } from '@/features/users/types/types'
import { cn } from '@/utils/tailwind-merge'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef } from 'react'

const UsersList = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const observer = useRef<IntersectionObserver>(null);
    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? '',
        // status: searchParams?.get("status") ?? 'active'
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
        useInfiniteQuery(getUsersListInfiniteQueryOptions(pagination));

    const usersList: SingleUserType[] = useMemo(() => {
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
                !usersList?.length ? <EmptyListView /> :
                    usersList?.length ? usersList?.map((user, index) => {
                        const isLastElement = index === usersList.length - 1;
                        return (
                            <motion.div
                                key={user?._id}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
                                viewport={{ amount: 0.4 }}
                                className='cursor-pointer '
                                onClick={() => router.push(`/users/${user?._id}/details`)}
                            >
                                <div
                                    ref={isLastElement ? lastElementRef : null}
                                    key={user?._id}
                                    className='smooth bg-white p-3 rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'
                                >
                                    <div className='flex items-start gap-4'>
                                        <ImageComponent className='rounded-full' src={'/avatar.svg'} alt={'avatar'} width={'w-12'} height={'h-12'} />
                                        <div>
                                            <H2Text>{user?.name}</H2Text>
                                            <H5Text>{user?.email}</H5Text>
                                            <div className='flex items-center space-x-1 mt-3'>
                                                <UserStatusChip status={user?.status} />
                                                <Icon name={'UserList'} color={COLOR_SECONDARY_TEXT} weight='light' />
                                                <div className='text-secondaryText'>Member</div>
                                            </div>
                                        </div>
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

export default UsersList