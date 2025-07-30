'use client'

import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import Loader from '@/components/UI/Loader'
import SpringModal from '@/components/UI/SpringModal'
import ClientTypeRadioGroup from '@/features/projects/components/ClientTypeRadioGroup'
import CreateProjectStepThreeExistingClient from '@/features/projects/components/CreateProjectStepThreeExistingClient'
import CreateProjectStepThreeNewClient from '@/features/projects/components/CreateProjectStepThreeNewClient'
import { createProject, updateProject } from '@/features/projects/queryFunctions/projectQueryFunctions'
import { getProjectDetailsQueryOptions, getZipCodeDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { createProjectStepThreeSchema } from '@/features/projects/schemas/createProjectSchema'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

type CreateProjectStepThreeProps = {
    projectIdFromEditProps?: string
}

const CreateProjectStepThree = ({ projectIdFromEditProps }: CreateProjectStepThreeProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const projectId = projectIdFromEditProps ?? searchParams?.get('projectId') ?? ''

    const { data: projectDetails, isFetching: projectDetailsLoader } = useQuery(getProjectDetailsQueryOptions(projectId))

    const defaultValues = {
        email: '',
        name: '',
        phone: '',
        addressLine: '',
        zip: '',
        // city: '',
        // state: '',
        // country: '',
    }
    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(createProjectStepThreeSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const [callZipCodeApi, setCallZipCodeApi] = useState(false)

    const { data: zipCodeDetails, isError: zipCodeError } = useQuery(getZipCodeDetailsQueryOptions(methods.getValues('zip'), callZipCodeApi))
    const [isOpen, setIsOpen] = useState(false);

    const [clientType, setClientType] = useState<'new' | 'existing'>('new')
    const [consentCheck, setConsentCheck] = useState(false)

    const createProjectMutation = useMutation<any, any, any, any>({ mutationFn: projectIdFromEditProps ? updateProject : createProject })

    useEffect(() => {
        if (projectDetails && projectIdFromEditProps) {
            setClientType('existing')
            methods.setValue('client', { value: projectDetails?.client?._id, label: projectDetails?.client?.name })
        }
    }, [projectDetails])

    useEffect(() => {
        const fieldName = ['city', 'state', 'country'] as const
        if (zipCodeDetails) {
            fieldName.forEach(field => methods?.setValue(field, zipCodeDetails[field], { shouldValidate: true, shouldDirty: true }))
        }
        else if (zipCodeError || methods?.getValues('zip')?.trim() == '') {
            fieldName.forEach(field => methods?.setValue(field, null, { shouldValidate: true, shouldDirty: true }))
        }
    }, [zipCodeDetails, zipCodeError])


    const allFieldsEmpty = () => {
        const { email, name, phone, client } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return ((!email || !name || phone?.length < 11) && clientType === 'new') || ((!client?.value) && clientType === 'existing') || hasErrors;
    };

    const onSubmit = (data: FieldValues) => {
        let formData = new FormData();

        formData.append('step', 'client')
        formData.append('projectId', projectId)
        formData.append('phone', `+${methods?.getValues('phone')}`)
        formData.append('receiveUpdate', consentCheck ? 'true' : 'false')

        const fields = ['email', 'name', 'addressLine', 'zip'];
        fields.map(field => formData.append(field, methods?.getValues(field) ?? ''));

        const dropDownFields = ['city', 'state', 'country', 'client'];
        dropDownFields.map(field => formData.append(field, methods?.getValues(field)?.value ?? ''));

        const updatedData = {
            formData,
            projectId
        }

        createProjectMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({ queryKey: ['getActiveProjectsList', { page: 1, size: 10, search: '' }] });
                queryClient.invalidateQueries({ queryKey: ['getUpcomingProjectsList', { page: 1, size: 10, search: '' }] });
                queryClient.invalidateQueries({ queryKey: ['getCompletedProjectsList', { page: 1, size: 10, search: '' }] });

                if (projectIdFromEditProps) {
                    router.push(`/projects/${projectId}/details?projectUpdated=true`)
                } else {
                    router.push(`/projects?projectCreated=true`)
                }
            },
            onError: (error: any) => {
                if (error?.data?.message?.includes('Email address already exists')) {
                    methods.setError('email', { message: 'Email address already exists.' })
                }
                if (error?.data?.message?.includes(`Admin email can't be used as a client email`)) {
                    methods.setError('email', { message: `Admin email can't be used as a client email.` })
                }
            },
        })
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            {
                projectDetailsLoader ? <Loader divClassName='bg-white min-h-114 mt-4 rounded-lg' /> :
                    <section className={cn('bg-white p-4 rounded-xl mt-4', { 'pb-0': clientType === 'new' })}>
                        <H2Text>Client Details</H2Text>
                        <div className={cn('text-xs text-secondaryText mt-1', { 'mb-4': projectIdFromEditProps })}>This user will be marked as primary client user.</div>
                        {
                            !projectIdFromEditProps ?
                                <ClientTypeRadioGroup clientType={clientType} setClientType={setClientType} methods={methods} /> : null
                        }
                        {
                            clientType === 'new' ?
                                <CreateProjectStepThreeNewClient
                                    methods={methods}
                                    consentCheck={consentCheck}
                                    setConsentCheck={setConsentCheck}
                                    setCallZipCodeApi={setCallZipCodeApi}
                                /> : null
                        }
                        {
                            clientType === 'existing' ?
                                <CreateProjectStepThreeExistingClient
                                    methods={methods}
                                    clientIdFromApi={projectDetails?.client?._id}
                                /> : null
                        }
                    </section>
            }
            <section className='flex items-center pb-4'>
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
                    href={projectIdFromEditProps ? `/projects/${projectId}/edit/step-2?temporaryProject=true` : `/projects/create/step-2?projectId=${projectId}`}
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
                    {
                        projectIdFromEditProps ? 'Update' : 'Create'
                    }
                </Button>
            </section>
            <SpringModal projectIdFromEditProps={projectIdFromEditProps} isOpen={isOpen} setIsOpen={setIsOpen} />
        </form>
    )
}

export default CreateProjectStepThree