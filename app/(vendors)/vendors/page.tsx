import Breadcrumb from "@/components/Breadcrumb"
import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import SearchComponent from "@/components/SearchComponent"
import Notifications from "@/features/projects/components/ProjectsList/Notifications"
import VendorInviteModal from "@/features/vendors/components/VendorInviteModal"
import VendorsList from "@/features/vendors/components/VendorsList"


const VendorsPage = () => {
    const breadcrumbItems = [
        {
            label: "Vendors",
            path: "/vendors"
        },
    ]

    return (
        <main>
            <MotionWrapper className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <PageContentWrapper>
                    <Breadcrumb breadcrumbItems={breadcrumbItems} />
                    <VendorInviteModal />
                    <section className="flex items-center mt-7 gap-3">
                        <SearchComponent placeholder="Search by vendor name" />
                        {/* <VendorsFilter /> */}
                    </section>
                    <VendorsList />
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default VendorsPage