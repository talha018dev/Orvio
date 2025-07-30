import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import Stepper from "@/components/Stepper"
import H1Text from "@/components/UI/H1Text"
import CreateUserStepTwo from "@/features/users/components/CreateUserStepTwo"


const CreateUserStepTwoPage = () => {
    const breadcrumbItems = [
        {
            label: "Users",
            path: "/users"
        },
        {
            label: "Create",
            path: "/users/create/step-1"
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Create User</H1Text>
                    <Stepper currentStep={2} maxLength={2} />
                    <CreateUserStepTwo />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default CreateUserStepTwoPage