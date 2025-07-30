import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"

import ProjectDetailsTabs from "@/features/projects/components/ProjectDetails/ProjectDetailsTabs"
import Notifications from "@/features/projects/components/ProjectsList/Notifications"
import UserDetailsTabs from "@/features/users/components/UserDetailsTabs"

const UserDetailsPage = async ({ params }: { params: any }) => {
    const { id: userId } = await params

    const breadcrumbItems = [
        {
            label: "Users",
            path: "/users"
        },
        {
            label: "Details",
            path: `/users/${userId}/details`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"userUpdated"} notificationText={"User profile has been updated."} redirectUrl={`/users/${userId}/details`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <UserDetailsTabs
                        userId={userId}
                    />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default UserDetailsPage