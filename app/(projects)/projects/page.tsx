import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import H1Text from "@/components/UI/H1Text"
import CreateProjectButton from "@/features/projects/components/CreateProjectButton"
import SearchComponent from "@/components/SearchComponent"
import Notifications from "@/features/projects/components/ProjectsList/Notifications"
import { ProjectListTabs } from "@/features/projects/components/ProjectsList/ProjectListTabs"

const ProjectsPage = () => {
    const breadcrumbItems = [
        {
            label: "Projects",
            path: "/projects?currentTab=Active"
        },
    ]

    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <Notifications searchParamsValue={"projectCreated"} notificationText={"Project has been created."} redirectUrl={`/projects?currentTab=Active`} />
            <MotionWrapper>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <section className="flex items-center mb-6">
                        <H1Text>All Projects</H1Text>
                        <CreateProjectButton />
                    </section>
                    <section className="mt-7">
                        <SearchComponent placeholder="Search by project name" />
                    </section>
                    <ProjectListTabs />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default ProjectsPage