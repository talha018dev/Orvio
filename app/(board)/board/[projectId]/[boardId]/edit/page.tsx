import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import BoardStageEditForm from '@/features/board/components/BoardStageEditForm'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'

const BoardEditPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
    const { projectId, boardId } = await params
    const { projectName } = await searchParams

    const breadcrumbItems = [
        {
            label: "Template",
            path: "/board"
        },
        {
            label: "Details",
            path: `/board/${projectId}/${boardId}/details?projectName=${projectName}&currentTab=ToDo`
        },
        {
            label: "Edit",
            path: `/board/${projectId}/${boardId}/edit?projectName=${projectName}`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className='mb-4'>Edit {projectName} Work Flow</H1Text>
                    <BoardStageEditForm
                        boardId={boardId}
                        projectId={projectId}
                        projectName={projectName}
                    />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default BoardEditPage