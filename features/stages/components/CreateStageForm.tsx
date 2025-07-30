'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import Loader from '@/components/UI/Loader'
import { createBoard, editBoard } from '@/features/board/queryFunctions/boardQueryFunctions'
import StageCard from '@/features/stages/components/StageCard'
import { getStageDetailsQueryOptions } from '@/features/stages/queryOptions/stageQueryOptions'
import { createStageSchema } from '@/features/stages/schemas/schema'
import { useModalStore } from '@/store/useModalStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { createStage, updateStage } from '../queryFunctions/stageQueryFunctions'
import { BoardDetailsType, Stage } from '@/features/board/types/types'

type CreateStageFormProps = {
    // templatePreview?: boolean
    formType?: 'boardEdit' | 'boardPreview' | 'edit' | 'create'
    projectId?: string
    projectName?: string
    stageId?: string
    boardDetails?: BoardDetailsType
    boardDetailsLoader?: boolean
}

const CreateStageForm = ({ formType, projectId, projectName, stageId, boardDetails, boardDetailsLoader }: CreateStageFormProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { openModal, closeModal } = useModalStore()
    const { addNotification } = useNotificationStore()

    const { data: stageDetails, isFetching: stageDetailsLoader } = useQuery(getStageDetailsQueryOptions(stageId ?? ''))
    const stageMutation = useMutation({ mutationFn: formType === 'boardEdit' ? editBoard : formType === 'boardPreview' ? createBoard : formType === 'edit' ? updateStage : createStage })

    const defaultValues = {
        templateName: '',
        stage: []
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(createStageSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const { fields: stageFields, append: stageAppend, remove: stageRemove } = useFieldArray({ control: methods?.control, name: "stage" })

    useEffect(() => {
        const stageDetailsLocal = stageDetails || boardDetails

        if (!stageDetailsLoader && stageDetailsLocal) {
            const updatedStagesData = stageDetailsLocal?.stages?.map(stage => ({
                ...stage,
                stageId: stage._id,
                stageName: stage.name,
                tasks: stage.tasks.map(task => ({
                    ...task,
                    taskName: task.name
                }))
            }))
            //@ts-ignore
            methods.setValue('templateName', stageDetailsLocal?.name)
            methods.setValue('stage', updatedStagesData)
        }
    }, [stageDetailsLoader, stageDetails, boardDetails])



    const onSubmit = (data: FieldValues) => {
        let updatedData = data

        if (formType === 'boardEdit') {
            const stage = methods.watch()?.stage?.map((stage: Stage) => (
                //@ts-ignore
                { stageId: stage?._id, stageName: stage?.stageName, tasks: stage?.tasks.map((task: any) => ({ taskId: task?._id, taskName: task?.taskName })) }
            ))

            updatedData = {
                stage,
                boardId: boardDetails?._id
            }

        }

        if (formType === 'boardPreview') {
            if (stageDetails?._id) {
                updatedData = {
                    ...data,
                    templateName: undefined,
                    projectId,
                    stageId
                }
            } else {
                updatedData = {
                    ...data,
                    projectId,
                    stageId
                }

            }
        }
        if (formType === 'edit') {
            updatedData = {
                ...data,
                stageId
            }
        }

        stageMutation?.mutate(updatedData,
            {
                onSuccess: (data: any) => {
                    queryClient.invalidateQueries({ queryKey: ['getStagesList', { page: 1, size: 10, search: '', status: 'active' }] });
                    if (formType === 'boardEdit') {
                        queryClient.invalidateQueries({ queryKey: ['getBoardDetailsStatusById', boardDetails?._id] });
                        queryClient.invalidateQueries({ queryKey: ['getBoardDetailsById', boardDetails?._id] });
                        router.push(`/board/${projectId}/${boardDetails?._id}/details?projectName=${projectName}`)
                    } else if (formType === 'boardPreview') {
                        queryClient.invalidateQueries({ queryKey: ['getActiveProjectsList', { page: 1, size: 10, search: '' }] });
                        router.push(`/board/${projectId ?? 'projectId'}/${data?._id}/details?projectName=${projectName}`)
                    } else if (formType === 'edit') {
                        queryClient.invalidateQueries({ queryKey: ['getStageDetails', stageId] })
                        router.push(`/stages/${stageId}/details?stageUpdated=true`)
                    } else {
                        router.push(`/stages?stageCreated=true`)
                    }
                },
                onError: (error: any) => {

                    if (error?.data?.message === 'Board already exists') {
                        router.push(`/board/${projectId ?? 'projectId'}/${data?._id}/details?projectName=${projectName}`)
                    } else {
                        addNotification('Something went wrong. Please try again')
                    }
                },
            }
        )
    }

    const allFieldsEmpty = () => {
        const { templateName, stage } = methods.watch();
        const emptyStageOrTask = stage.some((st: any) =>
            !st.stageName?.trim() || st?.tasks?.some((task: any) => !task.taskName.trim())
        );
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return (!templateName?.trim() && formType !== 'boardEdit') || hasErrors || emptyStageOrTask
    };

    const cancelModal = () => {
        openModal(
            "Cancel",
            "You are about to leave this page, all changes will be lost. Do you want to leave this page?",
            "Stay",
            "Yes, Leave",
            () => {
                closeModal()
                if (formType === 'boardEdit' || formType === 'boardPreview') {
                    router.back()
                } else {
                    router.push(`/stages`)
                }
            }
        )
    }

    if (stageDetailsLoader || boardDetailsLoader) return <Loader divClassName='mt-30' />

    return (
        <MotionWrapper>
            <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                <section>
                    <FormProvider {...methods}>
                        {
                            formType === 'boardEdit' ? null :
                                <section>
                                    <Input disabled={!!(formType === 'boardPreview' && stageId)} disableFullHeight={true} inputDivClassName='bg-white rounded-lg p-4 mb-4' name={'templateName'} placeholder={'Template Name'} colorInverse={true} label={'Template Name'} inputPadding={'pb-0'} />
                                </section>
                        }
                        <section className='flex flex-col gap-4'>
                            {stageFields.map((stageField, stageIndex) => {
                                return (
                                    <StageCard
                                        key={stageField?.id}
                                        stageField={stageField}
                                        stageIndex={stageIndex}
                                        stageRemove={stageRemove}
                                        methods={methods}
                                    />
                                )
                            })}
                        </section>
                        <Button
                            buttonDivClassName='bg-lightGray rounded-lg p-3 mt-4'
                            variant={'outline'}
                            onClick={() => {
                                stageAppend([
                                    {
                                        stageName: '',
                                        tasks: []
                                    }
                                ])
                            }}
                        >
                            + Add Stage
                        </Button>
                    </FormProvider>
                </section>
                <section className="flex items-center mt-6 gap-2">
                    <Button
                        buttonDivClassName="mr-auto"
                        onClick={() => cancelModal()}
                        variant={'destructiveOutline'}
                    >
                        Cancel
                    </Button>
                    <Button
                        buttonDivClassName="ml-auto"
                        variant={allFieldsEmpty() ? 'disabled' : 'default'}
                        disabled={allFieldsEmpty()}
                        loading={stageMutation?.isPending}
                        type='submit'
                    >
                        {formType === 'boardEdit' ? 'Update' : formType === 'boardPreview' ? 'Start' : formType === 'edit' ? 'Update' : 'Create'}
                    </Button>
                </section>
            </form>
        </MotionWrapper>
    )
}

export default CreateStageForm