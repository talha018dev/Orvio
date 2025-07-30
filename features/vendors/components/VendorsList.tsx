'use client'

import EmptyListView from '@/components/EmptyListView'
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton'
import SingleVendor from '@/features/vendors/components/SingleVendor'
import { getVendorsListInfiniteQueryOptions } from '@/features/vendors/queryOptions/vendorQueryOptions'
import { SingleVendorsListType } from '@/features/vendors/types/types'
import { cn } from '@/utils/tailwind-merge'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef } from 'react'

const VendorsList = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const observer = useRef<IntersectionObserver>(null);
    const pagination = {
        page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
        size: 10,
        search: searchParams?.get("search") ?? '',
        // status: searchParams?.get("status") ?? 'active'
    }

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
        useInfiniteQuery(getVendorsListInfiniteQueryOptions(pagination));

    const vendorsList: SingleVendorsListType[] = useMemo(() => {
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
                !vendorsList?.length ? <EmptyListView /> :
                    vendorsList?.length ? vendorsList?.map((vendor, index) => {
                        const isLastElement = index === vendorsList.length - 1;
                        return (
                            <SingleVendor
                                key={vendor?._id}
                                vendor={vendor}
                                index={index}
                                isLastElement={isLastElement}
                                lastElementRef={lastElementRef}
                            />
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

export default VendorsList