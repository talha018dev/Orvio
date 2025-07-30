import EmptyListView from '@/components/EmptyListView'
import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import { ProjectDetailsType } from '@/features/projects/types/types'
import CollaboratorDetailsCard from '@/features/users/components/CollaboratorDetailsCard'

type CollaboratorProps = {
  projectDetails: ProjectDetailsType | undefined
}

const Collaborator = ({ projectDetails }: CollaboratorProps) => {
  return (
    <MotionWrapper>
      <section className='mt-6'>
        <H1Text>Collaborator</H1Text>
        <div className='flex flex-col gap-2 mt-4'>
          {
            !projectDetails?.collaborators?.length ? <EmptyListView /> :
              projectDetails?.collaborators?.length ? projectDetails?.collaborators?.map(collaborator => {
                return (
                  <CollaboratorDetailsCard key={collaborator?._id} collaborator={collaborator} />
                )
              }) : null
          }
        </div>
      </section>
    </MotionWrapper>
  )
}

export default Collaborator

