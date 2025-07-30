import EmptyListView from '@/components/EmptyListView'
import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import { ProjectDetailsType } from '@/features/projects/types/types'

type BriefProps = {
  projectDetails: ProjectDetailsType | undefined
}

const Brief = ({ projectDetails }: BriefProps) => {
  return (
    <MotionWrapper>
      <section className='mt-6'>
        <H1Text>Projects Brief</H1Text>
        <div className='text-sm text-primaryText mt-4 break-all'>
          {
            !projectDetails?.brief ? <EmptyListView /> : projectDetails?.brief
          }
        </div>
      </section>
    </MotionWrapper>
  )
}

export default Brief