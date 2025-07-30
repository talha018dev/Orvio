'use client'

import H3Text from '@/components/UI/H3Text'
import ImageComponent from '@/components/UI/ImageComponent'
import Label from '@/components/UI/Label'
import Loader from '@/components/UI/Loader'
import ProfileDetailsCheckbox from '@/features/profile/components/ProfileDetailsCheckbox'
import { getProfileDetailsQueryOptions } from '@/features/profile/queryOptions/profileQueryOptions'
import { formatDate, formatUSPhoneNumber } from '@/helpers/functionHelpers'
import { useImageFit } from '@/hooks/useImageFit'
import useUserInfo from '@/hooks/useUserInfo'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const ProfileDetails = () => {
    const { objectFit, handleImageLoad } = useImageFit()

    const userInfo = useUserInfo()
    const { data: profileDetails, isFetching: profileDetailsLoader, refetch: refetchProfileDetails } = useQuery(getProfileDetailsQueryOptions(userInfo?.user?._id ?? ''))
    const [profileItems, setProfileItems] = useState<Record<string, string>[]>([])

    useEffect(() => {
        if (profileDetails) {
            setProfileItems([
                { label: 'Full Name', value: profileDetails?.name },
                { label: 'Email', value: profileDetails?.email },
                { label: 'Phone', value: `+ 1 ${formatUSPhoneNumber(profileDetails?.phone)}` },
                { label: 'Address', value: !profileDetails?.address?.addressLine ? '-' : profileDetails?.address?.addressLine },
                { label: 'Starting Date', value: formatDate(profileDetails?.createdAt) },
            ])
        }
    }, [profileDetails])

    if (profileDetailsLoader) return (
        <>
            <div className='size-21 bg-darkGray rounded-full mx-auto mt-4 animate-pulse'></div>
            <Loader divClassName='mt-35 mb-46' />
        </>
    )

    return (
        <section>
            {
                !profileDetails?.avatar ?
                    <div className='size-21 bg-darkGray rounded-full mx-auto mt-4'></div> :
                    <ImageComponent
                        onLoad={handleImageLoad}
                        imageClassName={`rounded-full ${objectFit}`}
                        className='mx-auto mt-4'
                        src={profileDetails?.avatar}
                        alt={'avatar'}
                        width={'w-21'}
                        height={'h-21'}
                    />
            }
            <div className='flex flex-col gap-4 mt-4 mb-7'>
                {
                    profileItems?.map(item => {
                        return (
                            <div key={item?.label}>
                                <Label>{item?.label}</Label>
                                <H3Text className='mt-1'>{item?.value}</H3Text>
                            </div>
                        )
                    })
                }
            </div>
            <ProfileDetailsCheckbox profileDetails={profileDetails} />

        </section>
    )
}

export default ProfileDetails