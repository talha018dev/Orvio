import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import SearchComponent from '@/components/SearchComponent'
import H1Text from '@/components/UI/H1Text'
import H2Text from '@/components/UI/H2Text'
import ProjectSelectForActivity from '@/features/activity/components/ProjectSelectForActivity'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'

const ActivityProjectSelectPage = () => {
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
                    <H2Text className='mt-3 mb-2'>Select Project</H2Text>
                    <SearchComponent placeholder={'Search by project name'} />
                    <ProjectSelectForActivity />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default ActivityProjectSelectPage