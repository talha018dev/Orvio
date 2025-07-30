import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H2Text from '@/components/UI/H2Text'
import ProjectListDropdown from '@/features/board/components/ProjectListDropdown'
import StageListForBoardSetup from '@/features/board/components/StageListForBoardSetup'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'

const BoardSetupPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
    const { projectId } = await params
    const { projectName } = await searchParams

    const breadcrumbItems = [
        {
            label: "Template",
            path: "/board"
        },
        {
            label: "Setup",
            path: `/board/${projectId}/setup?projectName=${projectName}`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <ProjectListDropdown projectId={projectId} projectName={projectName} />
                    <H2Text className='mt-12'>Select Template</H2Text>
                    <StageListForBoardSetup projectId={projectId} projectName={projectName} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default BoardSetupPage