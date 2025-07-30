'use client'

import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import Link from 'next/link'

const EditProjectButton = ({ projectId }: { projectId: string }) => {
  return (
    <Link className='ml-auto' href={`/projects/${projectId}/edit/step-1`}>
      <div className="flex items-center gap-1 border border-borderColor bg-white text-primaryText hover:bg-transparent focus:bg-transparent justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg">
        <Icon name={"PencilSimpleLine"} color={COLOR_PRIMARY_TEXT} fontSize={14} />
        <div>Edit</div>
      </div>
    </Link>
  )
}

export default EditProjectButton