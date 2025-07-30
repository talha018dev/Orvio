import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { BoardDetailsTabs } from '@/features/board/components/BoardDetailsTabs'
import BoardProjectEditButton from '@/features/board/components/BoardProjectEditButton'
import ProjectListDropdown from '@/features/board/components/ProjectListDropdown'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'
import Link from 'next/link'

const BoardDetailsPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
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
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper className='bg-pageBgColor'>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <div className='flex items-center'>
                        <ProjectListDropdown projectId={projectId} projectName={projectName} />
                        <BoardProjectEditButton
                            projectId={projectId}
                            boardId={boardId}
                            projectName={projectName}
                        />
                    </div>
                    <BoardDetailsTabs projectId={projectId} boardId={boardId} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default BoardDetailsPage