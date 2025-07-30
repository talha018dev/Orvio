import MotionWrapper from "@/components/MotionWrapper"
import PageContentWrapper from "@/components/PageContentWrapper"
import VendorSetup from "@/features/vendors/components/VendorSetup/VendorSetup"


const VendorSetupPage = async ({ params }: { params: any }) => {
  const { token } = await params

  return (
    <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
      <MotionWrapper>
        <PageContentWrapper>
          <VendorSetup token={token} />
        </PageContentWrapper>
      </MotionWrapper>
    </main>
  )
}

export default VendorSetupPage