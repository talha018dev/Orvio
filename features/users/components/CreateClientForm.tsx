'use client'

import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import SpringModal from '@/components/UI/SpringModal'
import ClientTypeRadioGroup from '@/features/projects/components/ClientTypeRadioGroup'
import CreateProjectStepThreeExistingClient from '@/features/projects/components/CreateProjectStepThreeExistingClient'
import CreateProjectStepThreeNewClient from '@/features/projects/components/CreateProjectStepThreeNewClient'
import { getZipCodeDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { createProjectStepThreeSchema } from '@/features/projects/schemas/createProjectSchema'
import { addExistingClientToProject, createClient } from '@/features/users/queryFunctions/userQueryFunctions'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

type CreateClientFormProps = {
    projectId: string
}

const CreateClientForm = ({ projectId }: CreateClientFormProps) => {
    const router = useRouter()


    const defaultValues = {
        email: '',
        name: '',
        phone: '',
        address: '',
        zipCode: '',
        // city: '',
        // state: '',
        // country: '',
    }
    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(createProjectStepThreeSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const [callZipCodeApi, setCallZipCodeApi] = useState(false)

    const { data: zipCodeDetails, isError: zipCodeError } = useQuery(getZipCodeDetailsQueryOptions(methods.getValues('zipCode'), callZipCodeApi))
    const [isOpen, setIsOpen] = useState(false);

    const [clientType, setClientType] = useState<'new' | 'existing'>('new')
    const [consentCheck, setConsentCheck] = useState(false)

    const createClientMutation = useMutation<any, any, any, any>({ mutationFn: clientType === 'existing' ? addExistingClientToProject : createClient })

    useEffect(() => {
        const fieldName = ['city', 'state', 'country'] as const
        if (zipCodeDetails) {
            fieldName.forEach(field => methods?.setValue(field, zipCodeDetails[field], { shouldValidate: true, shouldDirty: true }))
        }
        else if (zipCodeError || methods?.getValues('zipCode')?.trim() == '') {
            fieldName.forEach(field => methods?.setValue(field, null, { shouldValidate: true, shouldDirty: true }))
        }
    }, [zipCodeDetails, zipCodeError])

    const allFieldsEmpty = () => {
        const { email, name, phone, client } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return ((!email || !name || phone?.length < 11) && clientType === 'new') || ((!client?.value) && clientType === 'existing') || hasErrors;
    };

    const onSubmit = (data: FieldValues) => {
        let updatedData
        if (clientType === 'existing') {
            updatedData = {
                projectId,
                clientId: methods?.watch()?.client?.value
            }
        } else {
            updatedData = {
                ...methods?.watch(),
                receiveUpdate: consentCheck?.toString(),
                projectId
            }
        }

        createClientMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                router.push(`/projects/${projectId}/details?currentTab=Client&clientCreated=true`)
            },
            onError: (error: any) => {
                if (error?.data?.message?.includes('Email address already exists') && clientType === 'new') {
                    methods.setError('email', { message: 'Email address already exists.' })
                }
                if (error?.data?.message?.includes(`Admin email can't be used as a client email`)) {
                    methods.setError('email', { message: `Admin email can't be used as a client email.` })
                }
                if (error?.data?.message?.includes('Email address already exists') && clientType === 'existing') {
                    methods.setError('client', { message: 'Email address already exists.' })
                }
                if (error?.data?.message?.includes('User Already Assigned') && clientType === 'existing') {
                    methods.setError('client', { message: 'User Already Assigned' })
                }
            },
        })
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <section className={cn('bg-white p-4 rounded-xl mt-4', { 'pb-0': clientType === 'new' })}>
                <H2Text>Client Details</H2Text>
                <div className='text-xs text-secondaryText mt-1'>This user will be marked as primary client user.</div>
                <ClientTypeRadioGroup methods={methods} clientType={clientType} setClientType={setClientType} />
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
                        /> : null
                }
            </section>
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
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-fit'
                    className='w-20 mt-5 ml-2'
                    type='submit'
                    loading={createClientMutation?.isPending}
                >
                    Create
                </Button>
            </section>
            <SpringModal leaveUrl={`/projects/${projectId}/details`} isOpen={isOpen} setIsOpen={setIsOpen} />
        </form>
    )
}

export default CreateClientForm