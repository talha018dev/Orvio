import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import H1Text from "@/components/UI/H1Text"
import CreateStageForm from "@/features/stages/components/CreateStageForm"

const EditStage = async ({ params }: { params: any }) => {
    const {id: stageId} = await params
    const breadcrumbItems = [
        {
            label: "Stages",
            path: "/stages"
        },
        {
            label: "Details",
            path: `/stages/${stageId}/details`
        },
        {
            label: "Edit",
            path: `/stages/${stageId}/edit`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Edit Stage Template</H1Text>
                    <CreateStageForm formType="edit" stageId={stageId} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default EditStage