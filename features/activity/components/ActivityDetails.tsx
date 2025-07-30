'use client'

import { Button } from '@/components/UI/Button'
import H5Text from '@/components/UI/H5Text'
import Icon from '@/components/UI/Icon'
import ActivitySteps2 from '@/features/activity/components/ActivitySteps2'
import ActivityTabs from '@/features/activity/components/ActivityTabs'
import { getActivityDetailsByBoardIdQueryOptions } from '@/features/activity/queryOptions/activityQueryOptions'
import ProjectListDropdown from '@/features/board/components/ProjectListDropdown'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const ActivityDetails = ({ boardId, projectId, projectName }: { boardId: string, projectId: string, projectName: string }) => {
    const { data: activityDetails, isFetching: activityDetailsLoader, refetch: refetchActivityDetails } = useQuery(getActivityDetailsByBoardIdQueryOptions(boardId))

    return (
        <>
            <section>
                <H5Text className='flex items-center gap-1 justify-center bg-white p-1.5 mt-2 cursor-pointer' onClick={() => refetchActivityDetails()}>
                    <Icon name={'ArrowCounterClockwise'} color={''} fontSize={12} weight='light' />
                    <div>Tap or click here to see new activities</div>
                </H5Text>
            </section>
            <section className='flex items-start mt-3 gap-2'>
                <ProjectListDropdown
                    page={'ActivityDetailsPage'}
                    projectId={projectId}
                    projectName={projectName}
                    projectListType='all'
                />
                <Link href={`/projects/${projectId}/details`}>
                    <Button variant={'outline'} className='ml-auto'>
                        Details
                        <Icon name={'CaretRight'} color={''} fontSize={14} weight='light' />
                    </Button>
                </Link>
            </section >
            <section className='bg-white rounded-xl p-3 mt-3'>
                <ActivitySteps2
                    boardId={boardId}
                    activityDetails={activityDetails}
                    activityDetailsLoader={activityDetailsLoader}
                />
            </section>
            <ActivityTabs
                boardId={boardId}
                activityDetails={activityDetails}
                activityDetailsLoader={activityDetailsLoader}
            />
        </>
    )
}

export default ActivityDetails