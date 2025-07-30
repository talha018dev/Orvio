import { Button } from '@/components/UI/Button'
import Dropdown from '@/components/UI/Dropdown'
import H1Text from '@/components/UI/H1Text'
import Icon from '@/components/UI/Icon'
import { COLOR_DESTRUCTIVE, COLOR_ERROR, COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import CollaboratorMultiSelect from '@/features/board/components/CollaboratorMultiSelect'
import DependentTaskMultiSelect from '@/features/board/components/DependentTaskMultiSelect'
import TaskDetailsSkeleton from '@/features/board/components/TaskDetailsSkeleton'
import TimelineDatePicker from '@/features/board/components/TimelineDatePicker'
import { updateTaskDetailsInBoard } from '@/features/board/queryFunctions/boardQueryFunctions'
import { getTaskDetailsByIdQueryOptions } from '@/features/board/queryOptions/boardQueryOptions'
import { Todo } from '@/features/board/types/types'
import { Task } from '@/features/stages/types/types'
import { useScrollLock } from '@/hooks/useScrollLock'
import { cn } from '@/utils/tailwind-merge'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import moment from 'moment'
import { useSearchParams } from 'next/navigation'
import { FormEvent, memo, useEffect, useState } from 'react'
import { MultiValue } from 'react-select'

type EditTaskDrawerProps = {
    drawerVisibility: 'Open' | 'Closed'
    setDrawerVisibility: (value: 'Open' | 'Closed') => void
    task: Task
    index: number
    stageMap: Map<string, string>
    boardId: string
    collaboratorsMap: Map<any, any>
    setCollaboratorsMap: React.Dispatch<React.SetStateAction<Map<any, any>>>

}

type OptionType = {
    label: string
    value: string
    role?: string
    stage?: string
}

const EditTaskDrawer = ({ collaboratorsMap, setCollaboratorsMap, task, index, drawerVisibility, setDrawerVisibility, stageMap, boardId }: EditTaskDrawerProps) => {
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()
    useScrollLock(drawerVisibility === 'Open');

    const { data: taskDetails, isFetching: taskDetailsLoader } = useQuery(getTaskDetailsByIdQueryOptions(task?._id, drawerVisibility))
    console.log(' EditTaskDrawer - taskDetails:', taskDetails)
    const updateTaskMutation = useMutation({ mutationFn: updateTaskDetailsInBoard })

    const [tasksMap, setTasksMap] = useState<Map<any, any>>(new Map())


    const [selectedTab, setSelectedTab] = useState<'ToDo' | 'InProgress' | 'Done'>(searchParams.get('currentTab') as 'ToDo' | 'InProgress' | 'Done')
    const [selectedCollaborators, setSelectedCollaborators] = useState([] as MultiValue<OptionType>)
    const [dependentTasks, setDependentTasks] = useState<MultiValue<OptionType>>([])

    const [startDate, setStartDate] = useState<Date | null | undefined>(null)
    const [endDate, setEndDate] = useState<Date | null | undefined>(null)

    const cancel = () => {
        resetState()
    setDrawerVisibility('Closed')
    }

    const resetState = () => {
        // setSelectedTab('ToDo')
        setSelectedCollaborators([])
        setDependentTasks([])
    }

    useEffect(() => {
        if (taskDetails) {
            const tasksMapLocal = new Map()
            const collaboratorsMapLocal = new Map()
            taskDetails?.tasks?.forEach((task) => {
                tasksMapLocal.set(task?._id, { taskName: task?.name, stageName: stageMap?.get(task?.stageId) })
            })
            taskDetails?.collaborators?.forEach((collaborator) => {
                collaboratorsMapLocal.set(collaborator?._id, { name: collaborator?.name, role: collaborator?.role })
            })

            setTasksMap(tasksMapLocal)
            setCollaboratorsMap(collaboratorsMapLocal)
        }
    }, [taskDetails, drawerVisibility])


    useEffect(() => {
        if (taskDetails && tasksMap && collaboratorsMap) {
            setStartDate(taskDetails?.startDate)
            setEndDate(taskDetails?.endDate)
            setSelectedCollaborators(taskDetails?.collaboratorIds?.map((collaborator) => {
                return ({
                    label: collaboratorsMap?.get(collaborator)?.name,
                    value: collaborator,
                    role: collaboratorsMap?.get(collaborator)?.role
                })
            }))
            setDependentTasks(taskDetails?.dependentOn?.map(task => {
                return ({
                    label: tasksMap?.get(task)?.taskName,
                    value: task,
                    stage: tasksMap?.get(task)?.stageName
                })
            }))
        }


    }, [tasksMap, collaboratorsMap, drawerVisibility])

    const updateTask = () => {

        const taskData = {
            id: task?._id,
            dependentOn: dependentTasks.map((task) => task.value).join(','),
            collaboratorIds: selectedCollaborators.map((collaborator) => collaborator.value).join(','),
            startDate: moment(startDate)?.startOf('day')?.toISOString(),
            endDate: endDate ? moment(endDate)?.endOf('day')?.toISOString() : undefined,
            status: selectedTab === 'ToDo' ? 'todo' : selectedTab === 'InProgress' ? 'in progress' : selectedTab === 'Done' ? 'done' : 'todo'
        }
        updateTaskMutation.mutate(taskData,
            {
                onSuccess(data, variables, context) {
                    queryClient.invalidateQueries({ queryKey: ['getBoardDetailsStatusById', boardId] })
                    queryClient.invalidateQueries({ queryKey: ['getTaskDetailsById', data?._id] })
                    setDrawerVisibility('Closed')
                },
                onError(error, variables, context) {

                },
            }
        )
    }


    return (
        <div className=''>
            <AnimatePresence>
                {
                    drawerVisibility === 'Open' ?
                        <motion.div
                            // initial={{ y: 50, opacity: 0 }}
                            // animate={{ y: 0, opacity: 1 }}
                            // exit={{ y: 50, opacity: 0 }}
                            // transition={{ duration: 0.3 }}
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
                                className=' max-w-(--max-width) mx-auto  w-full bottom-0 cursor-default mt-auto'
                            >
                                <div className='flex flex-col wrap bg-white min-h-[600px] max-h-[80dvh] overflow-auto p-4 mx-4 rounded-lg'>
                                    <section className='flex items-start gap-2'>
                                        <H1Text className='break-all text-wrap'>{task?.name}</H1Text>
                                        <div className='ml-auto cursor-pointer mt-1' onClick={(e) => cancel()}>
                                            <Icon name={'X'} color={''} />
                                        </div>
                                    </section>
                                    <section className='grid grid-cols-2 items-center'>
                                        <div className='flex items-center'>
                                            <div className='w-1/4 text-secondaryText'>In List</div>
                                            <div className='w-full'>
                                                <Dropdown
                                                    button={
                                                        <button className="flex items-center gap-2 cursor-pointer bg-pageBgColor py-2 px-3 rounded-full">
                                                            <div>
                                                                {selectedTab === 'ToDo' ? 'To Do' : selectedTab === 'InProgress' ? 'In Progress' : selectedTab === 'Done' ? 'Done' : 'To Do'}
                                                            </div>
                                                            <Icon name={'CaretDown'} color={COLOR_PRIMARY_TEXT} />
                                                        </button>
                                                    }
                                                >
                                                    {
                                                        ['ToDo', 'InProgress', 'Done'].map((item, index) => {
                                                            return (
                                                                <div key={item}
                                                                    onClick={(e) => {
                                                                        setSelectedTab(item as 'ToDo' | 'InProgress' | 'Done')
                                                                    }}
                                                                    className={
                                                                        cn('cursor-pointer hover:bg-pageBgColor hover:rounded-lg pl-6 transition-all duration-300 relative',
                                                                            { 'bg-pageBgColor rounded-lg': selectedTab === item })
                                                                    }
                                                                >
                                                                    {item === 'ToDo' ? 'To Do' : item === 'InProgress' ? 'In Progress' : 'Done'}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        taskDetailsLoader ? <div>
                                            <div className='mt-8 flex -space-x-2'>
                                                <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                                <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                                <div className='bg-pageBgColor size-7 animate-pulse rounded-full'></div>
                                            </div>
                                            <div className='bg-pageBgColor w-full h-10 animate-pulse mt-14'></div>
                                            <div className='bg-pageBgColor w-full h-10 animate-pulse mt-13'></div>
                                        </div> :
                                            <>
                                                <div className='text-secondaryText mt-2 text-sm'>Collaborators</div>
                                                <section className={cn('flex items-center', { 'gap-2': selectedCollaborators?.length })}>

                                                    <div className='flex items-center -space-x-3'>
                                                        {
                                                            selectedCollaborators?.length ? selectedCollaborators?.map(collaborator => {
                                                                const getInitials = collaborator?.label.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
                                                                return (
                                                                    <div
                                                                        key={collaborator?.value}
                                                                        className='size-7.5 leading-7.5 text-center rounded-full bg-lightGray'
                                                                    >
                                                                        {getInitials}
                                                                    </div>
                                                                )
                                                            }) : null
                                                        }
                                                    </div>
                                                    <div className='w-full'>
                                                        <CollaboratorMultiSelect
                                                            collaboratorsList={taskDetails?.collaborators}
                                                            selectedCollaborators={selectedCollaborators}
                                                            setSelectedCollaborators={setSelectedCollaborators}
                                                        />
                                                    </div>
                                                </section>
                                                <TimelineDatePicker
                                                    startDate={startDate}
                                                    setStartDate={setStartDate}
                                                    endDate={endDate}
                                                    setEndDate={setEndDate}
                                                />
                                                <DependentTaskMultiSelect
                                                    name='dependentTask'
                                                    // listItems={taskDetails?.tasks?.map(task => ({ label: task?.name, value: task?._id, stage: stageMap?.get(task?.stageId) }))}
                                                    listItems={taskDetails?.tasks?.map(task => ({ label: task?.name, value: task?._id, stage: task?.stageName }))}
                                                    placeholder='Search and select task'
                                                    selectedTasks={dependentTasks}
                                                    setSelectedTasks={setDependentTasks}
                                                />
                                                <section className='flex flex-col gap-2.5 mb-4'>
                                                    <AnimatePresence>
                                                        {
                                                            dependentTasks?.length ? dependentTasks.map((selectedTask, index) => (
                                                                <motion.div
                                                                    key={selectedTask?.value}
                                                                    className='bg-pageBgColor flex items-start py-2 px-3 rounded-lg'
                                                                    initial={{ opacity: 1 }}
                                                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <div>
                                                                        <div>{selectedTask?.label}</div>
                                                                        <div className='mt-1'>{selectedTask?.stage}</div>
                                                                    </div>
                                                                    <div
                                                                        className='ml-auto cursor-pointer'
                                                                        onClick={() => setDependentTasks(prevState =>
                                                                            prevState?.filter(state => state?.value !== selectedTask?.value) || []
                                                                        )}
                                                                    >
                                                                        <Icon name='Trash' color={COLOR_DESTRUCTIVE} />
                                                                    </div>
                                                                </motion.div>
                                                            )) : null
                                                        }
                                                    </AnimatePresence>
                                                </section>
                                            </>
                                    }
                                    <section className='flex items-center gap-3 mt-auto'>
                                        <Button onClick={cancel} buttonDivClassName='mr-auto' variant={'destructiveOutline'}>Cancel</Button>
                                        <Button onClick={updateTask} disabled={updateTaskMutation?.isPending} loading={updateTaskMutation?.isPending} type='submit'>Save</Button>
                                    </section>


                                </div>
                            </motion.div>
                        </motion.div>
                        : null
                }
            </AnimatePresence>
        </div>
    )
}

export default EditTaskDrawer