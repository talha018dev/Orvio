import H1Text from '@/components/UI/H1Text';
import H2Text from '@/components/UI/H2Text';
import H5Text from '@/components/UI/H5Text';
import Icon from '@/components/UI/Icon';
import ImageComponent from '@/components/UI/ImageComponent';
import TaskStatus from '@/features/board/components/TaskStatus';
import { getTaskDetailsByIdQueryOptions } from '@/features/board/queryOptions/boardQueryOptions';
import { formatDate2 } from '@/helpers/functionHelpers';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';


type ActivityTaskDrawerProps = {
    drawerVisibility: 'Open' | 'Closed'
    setDrawerVisibility: (value: 'Open' | 'Closed') => void
    taskId: string
}

const ActivityTaskDrawer = ({ drawerVisibility, setDrawerVisibility, taskId }: ActivityTaskDrawerProps) => {
    const [dependentTasks, setDependentTasks] = useState([]) as any
    const [collaboratorsMap, setCollaboratorsMap] = useState(new Map())

    useScrollLock(drawerVisibility === 'Open');

    const cancel = () => {
        // resetState()
        setDrawerVisibility('Closed')
    }

    const { data: taskDetails, isFetching: taskDetailsLoader } = useQuery(getTaskDetailsByIdQueryOptions(taskId, drawerVisibility))

    useEffect(() => {
        if (taskDetails) {
            const collaboratorsMapLocal = new Map()
            taskDetails?.collaborators?.forEach((collaborator) => {
                collaboratorsMapLocal.set(collaborator?._id, { name: collaborator?.name, role: collaborator?.role })
            })
            setCollaboratorsMap(collaboratorsMapLocal)

            const dependentTasks = taskDetails.tasks?.filter(task =>
                taskDetails.dependentOn.includes(task._id?.toString())
            ) || [];
            setDependentTasks(dependentTasks)
        }
    }, [taskDetails, drawerVisibility])

    return (
        <div className=''>
            <AnimatePresence>
                {
                    drawerVisibility === 'Open' ?
                        <motion.div
                            onClick={(e) => {
                                cancel()
                            }}
                            className='fixed bg-slate-900/20 backdrop-blur w-[100dvw] shadow-sm h-full left-0 bottom-0 z-[10000] grid place-items-end cursor-pointer'
                        >
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                                className=' max-w-(--max-width) mx-auto min-h-[600px] bg-white w-full bottom-0 cursor-default mt-auto'
                            >
                                <section className='min-h-[600px] max-h-[80dvh] overflow-auto p-4'>

                                    {
                                        taskDetailsLoader ?
                                            <div>
                                                <div className='mt-8 flex -space-x-2'>
                                                    <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                                    <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                                    <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                                </div>
                                                <div className='bg-pageBgColor w-full h-10 animate-pulse mt-14'></div>
                                                <div className='bg-pageBgColor w-full h-10 animate-pulse mt-13'></div>
                                            </div> :
                                            <>
                                                <section className='flex items-start gap-2'>
                                                    <H1Text className='break-all'>{taskDetails?.name}</H1Text>
                                                    <div className='ml-auto mt-1 cursor-pointer' onClick={() => cancel()}>
                                                        <Icon name={'X'} color={''} />
                                                    </div>
                                                </section>
                                                <H5Text className='mt-3 break-all'>Stage - {taskDetails?.stageName}</H5Text>
                                                <div className='flex items-center gap-2 mt-3'>
                                                    <TaskStatus className='inline-block' status={taskDetails?.status as 'todo' | 'in progress' | 'done'} />
                                                    {taskDetails?.startDate ?
                                                        <div className='flex items-center gap-1 bg-pageBgColor py-1 px-2 rounded-full'>
                                                            <Icon name={'Calendar'} color={''} weight='light' />
                                                            <div className='text-[12px] text-primaryText'>{taskDetails?.startDate ? formatDate2(taskDetails?.startDate) : undefined} - {taskDetails?.endDate ? formatDate2(taskDetails?.endDate) : undefined}</div>
                                                        </div> : null
                                                    }
                                                </div>
                                                <section className='flex items-center gap-1 mt-3'>
                                                    {
                                                        taskDetails?.collaboratorIds?.length ? taskDetails?.collaboratorIds?.map(collaborator => {
                                                            return (
                                                                <ImageComponent key={collaborator} className='rounded-full' src={collaboratorsMap?.get(collaborator)?.avatar ?? '/avatar.svg'} alt={'avatar'} width={'w-8'} height={'h-8'} />
                                                            )
                                                        }) : null
                                                    }
                                                </section>
                                                {dependentTasks?.length ?
                                                    <section className='mt-6'>
                                                        <H5Text className='mt-3'>Dependent On</H5Text>
                                                        {dependentTasks?.map((task: any) => {
                                                            return (
                                                                <div key={task?._id} className='py-2 px-3 bg-pageBgColor rounded-xl mt-3'>
                                                                    <H2Text className='break-all'>{task?.name}</H2Text>
                                                                    <H5Text className='mt-2 break-all'>Stage - {task?.stageName}</H5Text>
                                                                </div>
                                                            )
                                                        })}
                                                    </section> : null}
                                                {taskDetails?.activities?.length ?
                                                    <section className='mt-6'>
                                                        <H5Text className='mt-3 mb-3'>Activity</H5Text>
                                                        <div className='flex items-center gap-2 my-3 flex-wrap'>
                                                            {taskDetails?.activities?.map((activity, idx) => {
                                                                const isLast = idx === ((taskDetails?.activities?.length ?? 0) - 1);
                                                                return (
                                                                    <React.Fragment key={activity?._id}>
                                                                        <TaskStatus className='inline-block whitespace-nowrap' status={activity?.action === "Todo" ? 'todo' : activity?.action === "In Progress" ? "in progress" : "done"} date={formatDate2(activity?.createdAt)} />
                                                                        {activity.action === 'Done' ?
                                                                            <div className='w-full'></div> :
                                                                            !isLast ? (
                                                                                <Icon name='ArrowRight' color='' fontSize={14} weight='regular' />
                                                                            ) : null
                                                                        }
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </div>
                                                    </section> : null}
                                            </>
                                    }
                                </section>
                            </motion.div>
                        </motion.div>
                        : null
                }
            </AnimatePresence>
        </div>
    )
}

export default ActivityTaskDrawer