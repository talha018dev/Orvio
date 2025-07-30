'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import CheckboxInput from '@/components/UI/CheckboxInput'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import Loader from '@/components/UI/Loader'
import PhoneInput2 from '@/components/UI/PhoneInput2'
import SpringModal from '@/components/UI/SpringModal'
import { getZipCodeDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { createProjectStepThreeSchema } from '@/features/projects/schemas/createProjectSchema'
import UserImageUpload from '@/features/users/components/UserImageUpload'
import useUser from '@/features/users/hooks/useUser'
import { createUser } from '@/features/users/queryFunctions/userQueryFunctions'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type CreateProjectStepThreeProps = {
    projectIdFromEditProps?: string
}

const CreateUserStepOne = ({ projectIdFromEditProps }: CreateProjectStepThreeProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const projectId = projectIdFromEditProps ?? searchParams?.get('projectId') ?? ''

    const { incompleteUser, incompleteUserLoader } = useUser()

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

    const createUserMutation = useMutation<any, any, any, any>({ mutationFn: createUser })

    useEffect(() => {
        if (incompleteUser?.length && !incompleteUserLoader) {
            methods.setValue('email', incompleteUser[0]?.email)
            methods.setValue('name', incompleteUser[0]?.name)
            methods.setValue('phone', `${incompleteUser[0]?.phone}`)
            methods.setValue('addressLine', incompleteUser[0]?.address?.addressLine)
            methods.setValue('zip', incompleteUser[0]?.address?.zip)
            methods.setValue('city', incompleteUser[0]?.address?.city)
            methods.setValue('state', incompleteUser[0]?.address?.state)
            methods.setValue('country', incompleteUser[0]?.address?.country)
            setConsentCheck(incompleteUser[0]?.receiveUpdate === 'true' ? true : false)
        }
    }, [incompleteUser, incompleteUserLoader])

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
        // let formData = new FormData();

        // formData.append('step', 'client')
        // formData.append('projectId', projectId)
        // formData.append('phone', `+${methods?.getValues('phone')}`)
        // formData.append('receiveUpdate', consentCheck ? 'true' : 'false')

        // const fields = ['email', 'name', 'address', 'zipCode'];
        // fields.map(field => formData.append(field, methods?.getValues(field) ?? ''));

        // const dropDownFields = ['city', 'state', 'country', 'client'];
        // dropDownFields.map(field => formData.append(field, methods?.getValues(field)?.value ?? ''));

        const updatedData = {
            ...methods.watch(),
            receiveUpdate: consentCheck ? 'true' : 'false',
            // formData,
            // projectId
        }

        createUserMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                // queryClient.invalidateQueries({ queryKey: ['getIncompleteUser'] });

                router.push(`/users/create/step-2?userId=${data?._id}`)
            },
            onError: (error: any) => {
                // if (error?.data?.message?.includes('Email address already exists')) {
                //     methods.setError('email', { message: 'Email address already exists.' })
                // }
                if (error?.data?.message?.includes(`Admin email can't be used as a client email`)) {
                    methods.setError('email', { message: `Admin email can't be used as a client email.` })
                }
            },
        })
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            {
                incompleteUserLoader ? <Loader divClassName='bg-white min-h-114 mt-4 rounded-lg' /> :
                    <section className={cn('bg-white p-4 rounded-xl mt-4', { 'pb-0': clientType === 'new' })}>
                        <H2Text>User Details</H2Text>
                        <MotionWrapper>
                            <FormProvider {...methods}>
                                <div className={cn('w-full mt-6')}>
                                    <UserImageUpload />
                                    <Input name='name' placeholder={'User Name'} label={'User Name'} colorInverse={true} />
                                    <Input name='email' placeholder={'Email'} label={'Email'} colorInverse={true} />
                                    <PhoneInput2 />
                                    <CheckboxInput checked={consentCheck} setChecked={setConsentCheck} textClassName='text-xs' className='my-4 text-xs' text={'I agree to receive text messages from Orvio for updates and notifications. Message & data rates may apply.'} />
                                    <Input name='addressLine' placeholder={'Address Line'} label={'Address Line'} colorInverse={true} labelOptional={true} />
                                    <div className='grid grid-cols-2 gap-4 items-end'>
                                        <Input setCallZipCodeApi={setCallZipCodeApi} name='zip' placeholder={'Zip Code'} label={'Zip Code'} colorInverse={true} labelOptional={true} />
                                        <Input disabled name='city' placeholder={'City'} label={'City'} colorInverse={true} />
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 items-end'>
                                        <Input disabled name='state' placeholder={'State'} label={'State'} colorInverse={true} />
                                        <Input disabled name='country' placeholder={'Country'} label={'Country'} colorInverse={true} />
                                    </div>
                                </div>
                            </FormProvider>
                        </MotionWrapper>
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
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-fit'
                    className='w-20 mt-5 ml-2'
                    type='submit'
                    loading={createUserMutation?.isPending}
                >
                    Next
                </Button>
            </section>
            <SpringModal projectIdFromEditProps={projectIdFromEditProps} isOpen={isOpen} setIsOpen={setIsOpen} leaveUrl={`/users`} />
        </form>
    )
}

export default CreateUserStepOne