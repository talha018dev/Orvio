import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import H1Text from "@/components/UI/H1Text"
import CreateStageForm from "@/features/stages/components/CreateStageForm"


const CreateStage = () => {
    const breadcrumbItems = [
        {
            label: "Stages",
            path: "/stages"
        },
        {
            label: "Create",
            path: "/stages/create"
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Create Stage Template</H1Text>
                    <CreateStageForm />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default CreateStage