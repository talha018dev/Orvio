import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import ActivityDetails from '@/features/activity/components/ActivityDetails'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'

const ActivityPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
    const { boardId } = await params
    const { projectId, projectName } = await searchParams

    const breadcrumbItems = [
        {
            label: "Activity",
            path: "/activity"
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text>Activity</H1Text>
                    <ActivityDetails
                        boardId={boardId}
                        projectId={projectId}
                        projectName={projectName}
                    />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default ActivityPage