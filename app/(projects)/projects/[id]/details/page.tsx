import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"

import ProjectDetailsTabs from "@/features/projects/components/ProjectDetails/ProjectDetailsTabs"
import Notifications from "@/features/projects/components/ProjectsList/Notifications"

const ProjectsDetailsPage = async ({ params }: { params: any }) => {
    const { id: projectId } = await params

    const breadcrumbItems = [
        {
            label: "Projects",
            path: "/projects?currentTab=Active"
        },
        {
            label: "Details",
            path: `/projects/${projectId}/details`
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectUpdated"} notificationText={"Project details has been updated."} redirectUrl={`/projects/${projectId}/details`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <ProjectDetailsTabs
                        projectId={projectId}
                    />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default ProjectsDetailsPage