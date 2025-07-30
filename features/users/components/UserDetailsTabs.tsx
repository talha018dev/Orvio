'use client'

import { AceternityTab } from '@/components/AceternityTab'
import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import Loader from '@/components/UI/Loader'
import UserDetailsProfileTab from '@/features/users/components/UserDetailsProfileTab'
import UserDetailsProjectsTab from '@/features/users/components/UserDetailsProjectsTab'
import { getUserDetailsQueryOptions } from '@/features/users/queryOptions/userQueryOptions'
import useUserInfo from '@/hooks/useUserInfo'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ProjectDetailsProps = {
    userId: string
}

const UserDetailsTabs = ({ userId }: ProjectDetailsProps) => {
    const searchParams = useSearchParams()

    const { data: userDetails, isFetching: userDetailsLoader } = useQuery(getUserDetailsQueryOptions(userId))

    const tabs = [
        {
            title: "Profile",
            value: "Profile",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Profile' || !searchParams?.get('currentTab') ?
                            <UserDetailsProfileTab userDetails={userDetails} /> : null
                    }
                </>
            ),
        },
        {
            title: "Projects",
            value: "Projects",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Projects' ?
                            <UserDetailsProjectsTab userId={userId} /> : null
                    }
                </>
            ),
        },
    ];

    if (userDetailsLoader) return <Loader divClassName=' min-h-114 mt-4 rounded-lg' />

    return (
        <MotionWrapper>
            <section className='flex items-center mb-6'>
                <H1Text className='truncate'>{userDetails?.name}</H1Text>
            </section>
            <section className="[perspective:1000px] relative b flex flex-col w-full  items-start justify-start mt-6">
                <AceternityTab tabs={tabs} />
            </section>
        </MotionWrapper>
    )
}

export default UserDetailsTabs