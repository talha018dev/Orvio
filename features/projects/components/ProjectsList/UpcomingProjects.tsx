// 'use client'

// import EmptyListView from '@/components/EmptyListView'
// import { AvatarCircles } from '@/components/UI/AvatarCircles'
// import H2Text from '@/components/UI/H2Text'
// import Icon from '@/components/UI/Icon'
// import { COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
// import { getUpcomingProjectsListInfiniteQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
// import { formatDate } from '@/helpers/functionHelpers'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useCallback, useMemo, useRef } from 'react'
// import { SingleActiveProjectsListType } from '../../types/types'
// import ProjectListSkeleton from './ProjectListSkeleton'
// import Link from 'next/link'

// const UpcomingProjectsList = () => {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const observer = useRef<IntersectionObserver>(null);
//     const pagination = {
//         page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
//         size: 10,
//         search: searchParams?.get("search") ?? ''
//     }
//     const currentTab = searchParams?.get("currentTab") as 'Active' | 'Upcoming' | 'Completed'

//     const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching } =
//         useInfiniteQuery(getUpcomingProjectsListInfiniteQueryOptions(pagination));

//     const upcomingProjectsList: SingleActiveProjectsListType[] = useMemo(() => {
//         return data?.pages.reduce((acc, page) => {
//             return [...acc, ...page?.data];
//         }, [])
//     }, [data])

//     const lastElementRef = useCallback(
//         (node: HTMLDivElement) => {
//             if (isLoading || isFetching) return;

//             if (observer.current) observer.current.disconnect();

//             observer.current = new IntersectionObserver((entries) => {
//                 if (entries[0].isIntersecting && hasNextPage) {
//                     fetchNextPage();
//                 }
//             }, { threshold: 1.0 })

//             if (node) observer.current.observe(node);
//         },
//         [fetchNextPage, hasNextPage, isFetching, isLoading]
//     );


//     if (currentTab !== 'Upcoming') return
//     if (isLoading || isRefetching) return <ProjectListSkeleton className='mt-6' />

//     return (
//         <section className='flex flex-col space-y-3 mt-6 pb-3'>
//             {
//                 !upcomingProjectsList?.length ? <EmptyListView /> :
//                     upcomingProjectsList?.length ? upcomingProjectsList?.map((project, index) => {
//                         const isLastElement = index === upcomingProjectsList.length - 1;
//                         return (
//                             <Link key={project?._id} href={`/projects/${project?._id}/details`}>
//                                 <motion.div
//                                     key={project?._id}
//                                     initial={{ y: 50, opacity: 0 }}
//                                     animate={{ y: 0, opacity: 1 }}
//                                     transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
//                                     viewport={{ amount: 0.4 }}
//                                     className='cursor-pointer'
//                                 >
//                                     <div ref={isLastElement ? lastElementRef : null} key={project?._id} className='bg-white p-3 rounded-lg text-sm'>
//                                         <H2Text>{project?.name}</H2Text>
//                                         <div className='flex items-center space-x-2 mt-3'>
//                                             <AvatarCircles
//                                                 numPeople={Math.max(project.collaborators.length - 3, 0)}
//                                                 avatarUrls={project?.collaborators?.slice(0, 3)?.map((collaborator) => {
//                                                     const getInitials = collaborator?.name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
//                                                     return {
//                                                         imageUrl: collaborator?.avatar ?? null,
//                                                         profileName: getInitials
//                                                     }
//                                                 })}
//                                             />
//                                             <Icon name={'CalendarDots'} color={COLOR_SECONDARY_TEXT} />
//                                             <div className='text-secondaryText'>Will start {formatDate(project?.contract?.startDate)}</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </Link>
//                         )
//                     }) : null
//             }
//             {
//                 isFetching ?
//                     <div className="flex justify-center">
//                         <ProjectListSkeleton />
//                     </div> : null
//             }
//         </section>
//     )
// }

// export default UpcomingProjectsList