import EmptyListView from '@/components/EmptyListView'
import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { ProjectDetailsType } from '@/features/projects/types/types'
import ClientDetailsCard from '@/features/users/components/ClientDetailsCard'
import Link from 'next/link'
import Notifications from '../ProjectsList/Notifications'

type ClientProps = {
  projectDetails: ProjectDetailsType | undefined
}

const Client = ({ projectDetails }: ClientProps) => {
  return (
    <MotionWrapper>
      <Notifications searchParamsValue={"clientCreated"} notificationText={"Additional client has been created."} redirectUrl={`/projects/${projectDetails?._id}/details?currentTab=Client`} />
      <section className='mt-6'>
        <div className='flex items-start'>
          <H1Text>Clients</H1Text>
          <Link href={`/projects/${projectDetails?._id}/create-client`} className='ml-auto'>
            <Button buttonDivClassName='ml-auto' variant={'outline'}>
              <Icon name={'Plus'} color={COLOR_PRIMARY_TEXT} fontSize={14} />
              <div>Add Client</div>
            </Button>
          </Link>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          {
            !projectDetails?.client ? <EmptyListView /> :
              <ClientDetailsCard primary={true} clientDetails={projectDetails?.client} />
          }
          {
            projectDetails?.otherUsers?.length ? projectDetails?.otherUsers?.map(user => {
              return (
                <ClientDetailsCard key={user?._id} clientDetails={user} />
              )
            }) : null
          }
        </div>
      </section>
    </MotionWrapper>
  )
}

export default Client