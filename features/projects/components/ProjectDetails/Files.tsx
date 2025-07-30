import EmptyListView from '@/components/EmptyListView'
import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import H3Text from '@/components/UI/H3Text'
import Icon from '@/components/UI/Icon'
import { COLOR_ERROR, COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import { ProjectDetailsType } from '@/features/projects/types/types'
import { formatDate } from '@/helpers/functionHelpers'
import useUserInfo from '@/hooks/useUserInfo'
import moment from 'moment'
import Link from 'next/link'

type FilesProps = {
  projectDetails: ProjectDetailsType | undefined
  isOpen: boolean
  setIsOpen: any
}

const Files = ({ projectDetails, isOpen, setIsOpen }: FilesProps) => {

  const userInfo = useUserInfo()

  return (
    <MotionWrapper>
      <section className='mt-6'>
        <div className='flex items-start'>
          <H1Text>Project Files</H1Text>
          {
            userInfo?.user?.role === 'Client' ? null :
              <Button onClick={() => setIsOpen(true)} buttonDivClassName='ml-auto' variant={'outline'}>
                <Icon name={'Plus'} color={COLOR_PRIMARY_TEXT} fontSize={14} />
                <div>Upload</div>
              </Button>
          }
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          {
            !projectDetails?.files?.length ? <EmptyListView /> :
              projectDetails?.files?.map(file => {
                return (
                  <div key={file?._id} className='bg-white p-3 rounded-lg'>
                    <div className='flex items-center'>
                      <div>
                        <H3Text>{file?.name}</H3Text>
                        <div className='flex items-center gap-1 mt-2'>
                          <Icon name={'CalendarDots'} color={COLOR_SECONDARY_TEXT} fontSize={14} />
                          <div className='text-xs text-secondaryText'>Uploaded on {formatDate(file?.uploadedDate)}</div>
                        </div>
                      </div>
                      <a target='_blank' href={`${file?.url?.startsWith('https') ? file?.url : `http://${file?.url}`}`} rel="noopener noreferrer" className='ml-auto border-1 rounded-full border-borderColor p-3 cursor-pointer'>
                        <Icon name={'Download'} color={COLOR_PRIMARY_TEXT} fontSize={18} weight='light' />
                      </a>
                    </div>
                    {file?.type === 'contract' ? null :
                      moment(file?.expirationDate)?.isBefore(moment()?.startOf('day')) ?
                        <div className='flex items-center gap-1 mt-4'>
                          <Icon name={'WarningCircle'} color={COLOR_ERROR} fontSize={14} />
                          <div className='text-xs text-errorColor'>This file expired on {formatDate(file?.expirationDate)}</div>
                        </div> :
                        <div className='flex items-center gap-1 mt-4'>
                          <Icon name={'WarningCircle'} color={COLOR_SECONDARY_TEXT} fontSize={14} />
                          <div className='text-xs text-secondaryText'>This file will expire on {formatDate(file?.expirationDate)}</div>
                        </div>
                    }
                  </div>
                )
              })
          }
        </div>
      </section>
    </MotionWrapper>
  )
}

export default Files