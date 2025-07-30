import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import { ProjectDetailsType } from '@/features/projects/types/types'
import { beautifyNumber, formatDate } from '@/helpers/functionHelpers'

type DetailsProps = {
  projectDetails: ProjectDetailsType | undefined
}

const Details = ({ projectDetails }: DetailsProps) => {
  const details = [
    { label: 'Name', value: projectDetails?.name },
    { label: 'Type', value: projectDetails?.type === 'long' ? 'Long Video' : 'Short Video' },
    { label: 'Budget', value: `$${beautifyNumber(projectDetails?.contract?.budget ?? 0)}` },
    { label: 'Start Date', value: formatDate(projectDetails?.contract?.startDate) },
    { label: 'Expected End Date', value: projectDetails?.contract?.endDate ? formatDate(projectDetails?.contract?.endDate) : '-' },
  ]

  return (
    <MotionWrapper>

      <section className='mt-6'>
        <H1Text>Project Details</H1Text>
        <div className='flex flex-col gap-4 mt-4'>
          {
            details?.map(item => {
              return (
                <div key={item?.label}>
                  <div className="text-xs text-secondaryText">{item?.label}</div>
                  <div className="text-sm text-primaryText mt-1">{item?.value}</div>
                </div>
              )
            })
          }
        </div>
      </section>
    </MotionWrapper>
  )
}

export default Details