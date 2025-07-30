'use client'

import { Button } from '@/components/UI/Button'
import DatePickerInput from '@/components/UI/DatePickerInput'
import H2Text from '@/components/UI/H2Text'
import Icon from '@/components/UI/Icon'
import Input from '@/components/UI/Input'
import Loader from '@/components/UI/Loader'
import ReactMultiSelect from '@/components/UI/ReactMultiSelect'
import SpringModal from '@/components/UI/SpringModal'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { createProject, updateProject } from '@/features/projects/queryFunctions/projectQueryFunctions'
import { getProjectDetailsQueryOptions, getTemporaryProjectDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { createProjectStepTwoSchema } from '@/features/projects/schemas/createProjectSchema'
import { getCollaboratorsListQueryOptions } from '@/features/users/queryOptions/userQueryOptions'
import { convertIntoTwoDecimals } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type CreateProjectStepTwoProps = {
    projectIdFromEditProps?: string
}

const CreateProjectStepTwo = ({ projectIdFromEditProps }: CreateProjectStepTwoProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const projectId = projectIdFromEditProps ?? searchParams?.get('projectId') ?? ''
    const temporaryProject = searchParams?.get('temporaryProject') ?? ''

    const [isOpen, setIsOpen] = useState(false);

    const { data: projectDetails, isFetching: projectDetailsLoader } = useQuery(temporaryProject ? getTemporaryProjectDetailsQueryOptions(projectId) : getProjectDetailsQueryOptions(projectId))
    const { data: collaboratorsList } = useQuery(getCollaboratorsListQueryOptions())

    const createProjectMutation = useMutation<any, any, any, any>({ mutationFn: projectIdFromEditProps ? updateProject : createProject })

    let defaultValues = {
        budget: '',
        startDate: '',
        endDate: '',
        collaborators: '',
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(createProjectStepTwoSchema)
    formConfig["defaultValues"] = defaultValues

    const methods = useForm(formConfig)

    useEffect(() => {
        const budget =
            projectDetails?.budget === 0 || projectDetails?.budget ? convertIntoTwoDecimals(projectDetails?.budget?.toString()) :
                projectDetails?.contract?.budget === 0 || projectDetails?.contract?.budget ? convertIntoTwoDecimals(projectDetails?.contract?.budget?.toString()) :
                    projectIdFromEditProps && (!projectDetails?.budget || !projectDetails?.contract?.budget) ? '0.00' :
                        null
        const startDate = projectDetails?.startDate ? new Date(projectDetails?.startDate) : projectDetails?.contract?.startDate ? new Date(projectDetails?.contract?.startDate) : null
        const endDate = projectDetails?.endDate ? new Date(projectDetails?.endDate) : projectDetails?.contract?.endDate ? new Date(projectDetails?.contract?.endDate) : null
        const document = projectDetails?.document ?? projectDetails?.contract?.document ?? ''

        const collaborators = projectDetails?.collaborators

        if (projectDetails) {
            methods.setValue('budget', budget)
            methods.setValue('startDate', startDate)
            methods.setValue('endDate', endDate)
            methods.setValue('document', document)
            methods.setValue('collaborators', collaborators?.map(collaborator => {
                return (
                    { value: collaborator?._id, label: collaborator?.name }
                )
            }))
        }
    }, [projectDetails])

    const allFieldsEmpty = () => {
        const { budget, startDate, endDate, collaborators } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return !budget || !startDate || !collaborators?.length || hasErrors;
    }

    const onSubmit = (data: FieldValues) => {
        const { startDate, endDate } = methods?.watch()

        if (startDate && endDate && moment(endDate)?.endOf('day')?.isBefore(moment(startDate).startOf('day'))) {
            methods.setError('endDate', { message: `End date should be after start date.` })
        } else {
            let formData = new FormData();
            const fields = ['budget'];
            fields.map(field => formData.append(field, methods?.getValues(field) ?? ''));

            formData.append('step', 'contract')
            formData.append('projectId', projectId ?? '')
            formData.append('startDate', moment(methods?.getValues('startDate'))?.startOf('day')?.toISOString() ?? '')
            if (methods?.getValues('endDate')) {
                formData.append('endDate', moment(methods?.getValues('endDate'))?.endOf('day')?.toISOString() ?? '')
            }
            formData.append('document', (methods?.getValues('document')))
            formData.append('collaborators', (methods?.getValues('collaborators')).map((item: any) => item.value))

            const updatedData = {
                formData,
                projectId
            }

            createProjectMutation.mutate(updatedData, {
                onSuccess: (data: any) => {
                    if (projectIdFromEditProps) {
                        router.push(`/projects/${projectId}/edit/step-3?temporaryProject=true`)
                    } else {
                        router.push(`/projects/create/step-3?projectId=${data?.projectId}`)
                    }
                },
                onError: (error: any) => {
                    if (error?.data?.message[0] === 'Budget must less then 9007199254740991') {
                        methods.setError('budget', { message: 'Budget must be less than 9 quadrillion.' })
                    }
                },
            })
        }
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            {
                projectDetailsLoader ? <Loader divClassName='bg-white min-h-114 mt-4 rounded-lg' /> :
                    <section className='bg-white p-4 pb-0 rounded-xl mt-4'>
                        <H2Text>Contract Details</H2Text>
                        <FormProvider {...methods}>
                            <div className={cn('w-full mt-6')}>
                                <Input
                                    name='budget'
                                    prefix={
                                        <Icon name={'CurrencyCircleDollar'}
                                            className='chart'
                                            color={COLOR_PRIMARY_TEXT}
                                        />
                                    }
                                    placeholder={'0.00'}
                                    label={'Budget'} colorInverse={true}
                                />
                                <DatePickerInput
                                    name='startDate'
                                    label={'Starting Date'}
                                />
                                <DatePickerInput
                                    name='endDate'
                                    label={'Expected Ending Date'}
                                    labelOptional={true}
                                    text={'Should be a current or future date.'}
                                />
                                <Input
                                    name='document'
                                    placeholder={'Paste file link'}
                                    label={'Document'}
                                    colorInverse={true}
                                    labelOptional={true}
                                />
                                <ReactMultiSelect
                                    name={'collaborators'}
                                    placeholder={"Select"}
                                    label={'Add Collaborators'}
                                    listItems={collaboratorsList?.map(collaborator => {
                                        return { value: collaborator?._id, label: collaborator?.name }
                                    })}
                                    methods={methods}
                                />
                            </div>
                        </FormProvider>
                    </section>
            }
            <section className='flex items-center'>
                <Button
                    variant={'destructiveOutline'}
                    buttonDivClassName='w-full'
                    className='w-20 mt-5'
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    Cancel
                </Button>
                <Link
                    className='ml-auto'
                    href={projectIdFromEditProps ? `/projects/${projectId}/edit/step-1?temporaryProject=true` : `/projects/create/step-1?projectId=${projectId}`}
                >
                    <Button
                        variant={'ghost'}
                        buttonDivClassName='w-fit'
                        className='w-20 mt-5'
                    >
                        Back
                    </Button>
                </Link>
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-fit'
                    className='w-20 mt-5 ml-2'
                    type='submit'
                    loading={createProjectMutation?.isPending}
                >
                    Next
                </Button>
            </section>
            <SpringModal projectIdFromEditProps={projectIdFromEditProps} isOpen={isOpen} setIsOpen={setIsOpen} />
        </form>
    )
}

export default CreateProjectStepTwo