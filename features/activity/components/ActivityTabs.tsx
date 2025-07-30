'use client'

import { AceternityTab } from '@/components/AceternityTab'
import EmptyListView from '@/components/EmptyListView'
import MotionWrapper from '@/components/MotionWrapper'
import { AvatarCircles } from '@/components/UI/AvatarCircles'
import H2Text from '@/components/UI/H2Text'
import H5Text from '@/components/UI/H5Text'
import Icon from '@/components/UI/Icon'
import ActivityTaskDrawer from '@/features/activity/components/ActivityTaskDrawer'
import { ActivityDetailsType } from '@/features/activity/types/types'
import TaskStatus from '@/features/board/components/TaskStatus'
import ProjectListSkeleton from '@/features/projects/components/ProjectsList/ProjectListSkeleton'
import { formatDate2 } from '@/helpers/functionHelpers'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ProjectDetailsProps = {
    boardId: 'unavailableBoard' | string & {}
    activityDetails: ActivityDetailsType | undefined
    activityDetailsLoader: boolean
}

const ActivityTabs = ({ boardId, activityDetails, activityDetailsLoader }: ProjectDetailsProps) => {
    const searchParams = useSearchParams()
    const [drawerVisibility, setDrawerVisibility] = useState<'Open' | 'Closed'>('Closed')
    const [taskId, setTaskId] = useState<string>('')

    const tabs = [
        {
            title: "Task",
            value: "Task",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Task' || !searchParams?.get('currentTab') ?
                            <>
                                {
                                    activityDetailsLoader ? <ProjectListSkeleton className='mt-3' /> :
                                        !activityDetails?.tasks?.length ? <EmptyListView /> :
                                            activityDetails?.tasks?.length ? activityDetails?.tasks?.map(task => {
                                                return (
                                                    <section key={task?._id} className='bg-white rounded-xl p-3 mt-3 cursor-pointer' onClick={() => {
                                                        setTaskId(task?._id)
                                                        setDrawerVisibility('Open')
                                                    }} >
                                                        <div className='flex items-start gap-2'>
                                                            <H2Text className='break-all text-wrap'>{task?.name}</H2Text>
                                                            <div className='ml-auto cursor-pointer mt-1'>
                                                                <Icon name={'CaretRight'} color={''} weight='light' />
                                                            </div>
                                                        </div>
                                                        <H5Text className='mt-2 break-all'>Stage - {task?.stageName}</H5Text>
                                                        <div className='flex items-center gap-3 mt-2'>
                                                            <TaskStatus status={task?.status} date={task?.statusChangedAt ? formatDate2(task?.statusChangedAt) : undefined} />
                                                            <AvatarCircles
                                                                numPeople={Math.max(task?.collaborators.length - 3, 0)}
                                                                avatarUrls={task?.collaborators?.slice(0, 3)?.map((collaborator) => {
                                                                    const getInitials = collaborator?.name?.split(' ').slice(0, 2).map((word: string) => word[0]).join('').toUpperCase();
                                                                    return {
                                                                        imageUrl: null,
                                                                        profileName: getInitials
                                                                    }
                                                                })}
                                                            />
                                                            {
                                                                task?.collaborators?.length ?
                                                                    <span className='text-xs text-secondaryText'>are the collaborator(s)</span> : null
                                                            }
                                                        </div>
                                                    </section>
                                            )
                                            }) : null
                                }
                            </> : null
                    }
                </>
            ),
        },
        {
            title: "Files",
            value: "Files",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Files' ?
                            <>
                                {
                                    activityDetailsLoader ? <ProjectListSkeleton className='mt-3' /> :
                                        !activityDetails?.files?.length ? <EmptyListView /> :
                                            activityDetails?.files?.length ? activityDetails?.files?.map(file => {
                                                return (
                                                    <section key={file?._id} className='bg-white rounded-xl p-3 mt-3'>
                                                        <div className='flex items-center'>
                                                            <H2Text>{file?.name}</H2Text>
                                                            <Link
                                                                rel="noopener noreferrer"
                                                                target='_blank'
                                                                className='ml-auto cursor-pointer'
                                                                href={`${file?.url?.startsWith('https') ? file?.url : `http://${file?.url}`}`}
                                                            >
                                                                <Icon name={'Download'} color={''} weight='light' />
                                                            </Link>
                                                        </div>
                                                        <div className='bg-pageBgColor rounded-full py-0.5 px-3 text-primaryText text-xs inline-block mt-2'>Uploaded ({formatDate2(file?.uploadedDate)})</div>
                                                    </section>
                                                )
                                            }) : null
                                }
                            </> : null
                    }
                </>
            ),
        },
    ];

    // if (projectDetailsLoader) return <Loader divClassName=' min-h-114 mt-4 rounded-lg' />

    return (
        <MotionWrapper>
            <section className="[perspective:1000px] relative b flex flex-col w-full  items-start justify-start mt-6 pb-6">
                <AceternityTab tabs={tabs} />
            </section>
            <ActivityTaskDrawer
                drawerVisibility={drawerVisibility}
                setDrawerVisibility={setDrawerVisibility}
                taskId={taskId}
            />
        </MotionWrapper>
    )
}

export default ActivityTabs