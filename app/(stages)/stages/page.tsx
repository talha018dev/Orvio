import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import SearchComponent from "@/components/SearchComponent"
import H1Text from "@/components/UI/H1Text"
import Icon from "@/components/UI/Icon"
import { COLOR_PRIMARY_TEXT } from "@/constants/colorConstants"
import Notifications from "@/features/projects/components/ProjectsList/Notifications"
import StagesFilter from "@/features/stages/components/StagesFilter"
import StagesList from "@/features/stages/components/StagesList"
import Link from "next/link"


const StagesPage = () => {
    const breadcrumbItems = [
        {
            label: "Stages",
            path: "/stages"
        },
    ]

    return (
        <main>
            <MotionWrapper className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <Notifications searchParamsValue={"stageCreated"} notificationText={"Stage template has been created."} redirectUrl={`/stages`} />
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <section className="flex items-center mb-6">
                        <H1Text>Stage Templates</H1Text>
                        <Link href={`/stages/create`} className="ml-auto flex items-center gap-1 border border-borderColor bg-white text-primaryText hover:bg-transparent focus:bg-transparent justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg" >
                            <Icon name={"Plus"} color={COLOR_PRIMARY_TEXT} fontSize={12} />
                            <div>Create</div>
                        </Link>
                    </section>
                    <section className="flex items-center mt-7 gap-3">
                        <SearchComponent placeholder="Search by name" />
                        <StagesFilter />
                    </section>
                    <StagesList />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default StagesPage