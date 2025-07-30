import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import Notifications from '@/features/projects/components/ProjectsList/Notifications'
import CreateStageForm from '@/features/stages/components/CreateStageForm'

const BoardPreviewPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
    const { projectId, stageId } = await params
    const { projectName } = await searchParams

    const breadcrumbItems = [
        {
            label: "Template",
            path: "/board"
        },
        {
            label: "Preview",
            path: `/board/${projectId}/setup/${stageId === 'blank' ? 'blank' : stageId}/preview`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className='mb-2'>Create Work Flow</H1Text>
                    {/* <H2Text className='mt-10 mb-2'>Select Template</H2Text> */}
                    <CreateStageForm formType={ 'boardPreview'} projectId={projectId} stageId={stageId === 'blank' ? undefined : stageId} projectName={projectName} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default BoardPreviewPage