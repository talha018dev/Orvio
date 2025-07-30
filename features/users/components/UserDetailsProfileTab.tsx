import MotionWrapper from '@/components/MotionWrapper'
import StatusUpdateCard from '@/components/StatusUpdateCard'
import Chip from '@/components/UI/Chip'
import H1Text from '@/components/UI/H1Text'
import H3Text from '@/components/UI/H3Text'
import H5Text from '@/components/UI/H5Text'
import ImageComponent from '@/components/UI/ImageComponent'
import Label from '@/components/UI/Label'
import UserDetailsStatusUpdate from '@/features/users/components/UserDetailsStatusUpdate'
import UserStatusChip from '@/features/users/components/UserStatusChip'
import { UserDetailsType } from '@/features/users/types/types'
import { formatDate, formatUSPhoneNumber } from '@/helpers/functionHelpers'

type UserDetailsProfileTabProps = {
    userDetails: UserDetailsType | undefined
}

const UserDetailsProfileTab = ({ userDetails }: UserDetailsProfileTabProps) => {
    const profileInfo = [
        { label: 'Full Name', value: userDetails?.name },
        { label: 'Email', value: userDetails?.email },
        { label: 'Phone', value: `+1 ${formatUSPhoneNumber(userDetails?.phone)}` },
        { label: 'Address', value: !userDetails?.address?.addressLine ? 'n/a' : userDetails?.address?.addressLine },
        { label: 'Role', value: userDetails?.role },
        { label: 'Starting Date', value: formatDate(userDetails?.createdAt) },
        { label: 'Ending Date', value: !userDetails?.deactivateDate ? 'n/a' : formatDate(userDetails?.deactivateDate) },
    ]

    return (
        <MotionWrapper>
            <section className='mt-6'>
                <H1Text>Profile</H1Text>
                <section className='text-center mx-auto w-full py-4'>
                    <ImageComponent className='w-full text-center' src={userDetails?.avatar ?? '/avatar.svg'} alt={'avatar'} width={'w-21'} height={'h-21'} />
                </section>
                <section className='flex flex-col gap-4 mt-4'>
                    {
                        profileInfo?.map(info => {
                            return (
                                <div key={info?.label}>
                                    <Label>{info?.label}</Label>
                                    <H3Text className='mt-1'>
                                        {info?.value}
                                        {
                                            info?.label === 'Full Name' ?
                                                <UserStatusChip className='ml-4' status={userDetails?.status ?? 'active'} /> : null
                                        }
                                    </H3Text>
                                </div>
                            )
                        })
                    }
                </section>
                <UserDetailsStatusUpdate
                    userDetails={userDetails}
                />
            </section>
        </MotionWrapper>
    )
}

export default UserDetailsProfileTab