import Breadcrumb from '@/components/Breadcrumb'
import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import H1Text from '@/components/UI/H1Text'
import CreateClientForm from '@/features/users/components/CreateClientForm'

const CreateClientPage = async ({ params }: { params: any }) => {
    const {id: projectId} = await params

    const breadcrumbItems = [
        {
            label: "Projects",
            path: "/projects"
        },
        {
            label: "Details",
            path: `/projects/${projectId}`
        },
        {
            label: "Create Additional Client",
            path: `/projects/${projectId}/create-client`
        },
    ]

    return (
    <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <H1Text className="mb-3">Create Additional Client</H1Text>
                    <CreateClientForm projectId={projectId} />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default CreateClientPage