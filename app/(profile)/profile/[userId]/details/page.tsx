import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import H3Text from '@/components/UI/H3Text'
import Label from '@/components/UI/Label'
import ProfileDetails from '@/features/profile/components/ProfileDetails'
import ProfileEditButton from '@/features/profile/components/ProfileEditButton'
import Link from 'next/link'

const ProfileDetailsPage = async ({ params }: { params: any }) => {
    const { userId } = await params
    const breadcrumbItems = [
        {
            label: "Profile",
            path: `/profile/${userId}/details`
        },
    ]


    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center '>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <MotionWrapper>
                    <PageContentWrapper>
                        <Breadcrumb breadcrumbItems={breadcrumbItems} />
                        <section className='flex items-center gap-2'>
                            <H1Text>My Profile</H1Text>
                            <ProfileEditButton />
                        </section>
                        <ProfileDetails />
                        <section className='bg-white p-4 rounded-xl mt-8'>
                            <Label>Change Password</Label>
                            <H3Text className='mt-1.5'>
                                Updating your password will log you out from all active sessions.&nbsp;
                                <Link className='text-primary underline hover:underline' href={`/profile/${userId}/change-password`}>Click here</Link>
                                &nbsp;to proceed.
                            </H3Text>
                        </section>
                    </PageContentWrapper>
                </MotionWrapper>
            </main>
        </div>
    )
}

export default ProfileDetailsPage