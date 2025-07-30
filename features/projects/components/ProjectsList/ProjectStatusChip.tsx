import { SingleActiveProjectsListType } from '@/features/projects/types/types'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'

const ProjectStatusChip = ({status}: {status: SingleActiveProjectsListType['status']}) => {
    return (
        <div className={cn('text-xs text-primaryText bg-pageBgColor rounded-full py-1 px-2 inline-block mt-3', { 'bg-inProgressColor text-inProgressText': status === 'active' }, { 'bg-completedColor text-completedText': status === 'completed' })}>
            <div>{status === 'active' ? 'Active' : status === 'upcoming' ? 'Upcoming' : 'Completed'}</div>
        </div>
    )
}

export default ProjectStatusChip