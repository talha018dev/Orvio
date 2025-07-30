import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import Stepper from "@/components/Stepper"
import H1Text from "@/components/UI/H1Text"
import CreateProjectStepThree from "@/features/projects/components/CreateProjectStepThree"


const CreateProjectStepThreePage = () => {
    const breadcrumbItems = [
        {
            label: "Projects",
            path: "/projects"
        },
        {
            label: "Create",
            path: "/projects/create/step-1"
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Create Project</H1Text>
                    <Stepper currentStep={3} />
                    <CreateProjectStepThree />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default CreateProjectStepThreePage