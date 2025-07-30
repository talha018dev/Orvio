import { cn } from '@/utils/tailwind-merge'
import Icon from './UI/Icon'

const EmptyListView = ({className, text}: {className?: string,text?: string}) => {
  return (
    <div className={cn('flex items-center flex-col mt-10', className)}>
        <Icon name={'FolderOpen'} color={'#94A3B8'} weight='fill' fontSize={24} />
        <div className='text-sm text-primaryText mt-2'>{text ?? 'No data found'}</div>
    </div>
  )
}

export default EmptyListView