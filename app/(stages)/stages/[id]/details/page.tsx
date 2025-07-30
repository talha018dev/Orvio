import Breadcrumb from '@/components/Breadcrumb';
import MotionWrapper from '@/components/MotionWrapper';
import PageContentWrapper from '@/components/PageContentWrapper';
import Notifications from '@/features/projects/components/ProjectsList/Notifications';
import StageDetailsSection from '@/features/stages/components/StageDetailsSection';

const StageDetailsPage = async ({ params }: { params: any }) => {
  const {id:stageId} = await params

  const breadcrumbItems = [
    {
      label: "Stages",
      path: "/stages"
    },
    {
      label: "Details",
      path: `/stages/${stageId}/details`
    },
  ]

  return (
    <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
      <Notifications searchParamsValue={"stageUpdated"} notificationText={"Stage template has been updated."} redirectUrl={`/stages/${stageId}/details`} />
      <MotionWrapper>
        <PageContentWrapper>
          <Breadcrumb breadcrumbItems={breadcrumbItems} />
          <StageDetailsSection stageId={stageId} />
        </PageContentWrapper>
      </MotionWrapper>
    </main>
  )
}

export default StageDetailsPage
