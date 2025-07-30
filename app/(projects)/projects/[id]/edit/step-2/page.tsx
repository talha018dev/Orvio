import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import Stepper from "@/components/Stepper"
import H1Text from "@/components/UI/H1Text"
import CreateProjectStepTwo from "@/features/projects/components/CreateProjectStepTwo"


const CreateProjectStepTwoPage = async ({ params }: { params: any }) => {
    const { id: projectId } = await params

    const breadcrumbItems = [
        {
            label: "Projects",
            path: "/projects"
        },
        {
            label: "Details",
            path: `/projects/${projectId}/details`
        },
        {
            label: "Edit",
            path: `/projects/${projectId}/edit/step-1`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Edit Project</H1Text>
                    <Stepper currentStep={2} />
                    <CreateProjectStepTwo projectIdFromEditProps={projectId} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default CreateProjectStepTwoPage