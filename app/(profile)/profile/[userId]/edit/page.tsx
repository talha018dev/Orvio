import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import ProfileEditForm from '@/features/profile/components/ProfileEditForm'

const ProfileEditPage = async ({ params }: { params: any }) => {
    const { userId } = await params
    console.log(' ProfileEditPage - userId:', userId)
    const breadcrumbItems = [
        {
            label: "Profile",
            path: `/profile/${userId}/details`
        },
        {
            label: "Edit",
            path: `/profile/${userId}/edit`
        },
    ]


    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center '>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <MotionWrapper>
                    <PageContentWrapper>
                        <Breadcrumb breadcrumbItems={breadcrumbItems} />
                        <section className='flex items-center gap-2'>
                            <H1Text>Edit Profile</H1Text>
                        </section>
                        <ProfileEditForm />
                    </PageContentWrapper>
                </MotionWrapper>
            </main>
        </div>
    )
}

export default ProfileEditPage