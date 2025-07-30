'use client'

import { Button } from '@/components/UI/Button'
import CheckboxInput from '@/components/UI/CheckboxInput'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import Loader from '@/components/UI/Loader'
import PhoneInput2 from '@/components/UI/PhoneInput2'
import SpringModal from '@/components/UI/SpringModal'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { Token } from '@/features/auth/types/types'
import { updateProfile } from '@/features/profile/queryFunctions/profileQueryFunctions'
import { getProfileDetailsQueryOptions } from '@/features/profile/queryOptions/profileQueryOptions'
import { updateProfileSchema } from '@/features/profile/schemas/schema'
import { getZipCodeDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import UserImageUpload from '@/features/users/components/UserImageUpload'
import usePersistStore from '@/helpers/usePersistStore'
import useUserInfo from '@/hooks/useUserInfo'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const ProfileEditForm = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const store = usePersistStore(useAuthStore, (state) => state)


    const userInfo = useUserInfo()
    const { data: profileDetails, isFetching: profileDetailsLoader, refetch: refetchProfileDetails } = useQuery(getProfileDetailsQueryOptions(userInfo?.user?._id ?? ''))
    const uploadProfileImageMutation = useMutation<any, any, any, any>({ mutationFn: updateProfile })

    const [profileImage, setProfileImage] = useState(null)
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
    formConfig["resolver"] = zodResolver(updateProfileSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const [callZipCodeApi, setCallZipCodeApi] = useState(false)
    const [consentCheck, setConsentCheck] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const { data: zipCodeDetails, isError: zipCodeError } = useQuery(getZipCodeDetailsQueryOptions(methods.getValues('zip'), callZipCodeApi))

    useEffect(() => {
        if (profileDetails) {
            // const fields = ['name, email, phone, addressLine']
            // fields.forEach(field => methods.setValue(field, ))
            setProfileImage(profileDetails?.avatar)

            methods.setValue('name', profileDetails?.name)
            methods.setValue('email', profileDetails?.email)
            methods.setValue('phone', profileDetails?.phone)
            setConsentCheck(profileDetails?.receiveUpdate === 'true' ? true : false)
            methods.setValue('addressLine', profileDetails?.address?.addressLine)
            methods.setValue('zip', profileDetails?.address?.zip)
            methods.setValue('city', profileDetails?.address?.city)
            methods.setValue('state', profileDetails?.address?.state)
            methods.setValue('country', profileDetails?.address?.country)
        }
    }, [profileDetails])


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
        const { email, name, phone } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return ((!email || !name || phone?.length < 11)) || hasErrors;
    };

    const onSubmit = (data: FieldValues) => {
        const updatedData = {
            ...methods.watch(),
            userId: userInfo?.user?._id,
            receiveUpdate: consentCheck ? 'true' : 'false',
            avatar: profileImage ?? '',
        }

        uploadProfileImageMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({ queryKey: ['getProfileDetails', userInfo?.user?._id] });
                store?.setUserInfo({
                    token: userInfo?.token as Token,
                    user: data
                })
                router.push(`/profile/${data?._id}/details`)
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
        <section className='bg-white rounded-xl p-4 mt-4'>
            <H2Text className='mb-4'>User Details</H2Text>

            <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                <FormProvider {...methods}>
                    <div className={cn('w-full mt-6')}>
                        <UserImageUpload
                            profileImage={profileImage}
                            setProfileImage={setProfileImage}
                        />
                        {
                            profileDetailsLoader ? <Loader divClassName='min-h-[400px]' /> :
                                <>
                                    <Input name='name' placeholder={'Full Name'} label={'Full Name'} colorInverse={true} />
                                    <Input name='email' placeholder={'Email'} label={'Email'} colorInverse={true} disabled={true} />
                                    <PhoneInput2 />
                                    <CheckboxInput checked={consentCheck} setChecked={setConsentCheck} textClassName='text-xs' className='my-4 text-xs' text={'I agree to receive text messages from reelsync.io for updates and notifications. Message & data rates may apply.'} />
                                    <Input name='addressLine' placeholder={'Address Line'} label={'Address Line'} colorInverse={true} labelOptional={true} />
                                    <div className='grid grid-cols-2 gap-4 items-end'>
                                        <Input setCallZipCodeApi={setCallZipCodeApi} name='zip' placeholder={'Zip Code'} label={'Zip Code'} colorInverse={true} labelOptional={true} />
                                        <Input disabled name='city' placeholder={'City'} label={'City'} colorInverse={true} />
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 items-end'>
                                        <Input disabled name='state' placeholder={'State'} label={'State'} colorInverse={true} />
                                        <Input disabled name='country' placeholder={'Country'} label={'Country'} colorInverse={true} />
                                    </div>
                                </>
                        }
                    </div>
                </FormProvider>
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
                        loading={uploadProfileImageMutation?.isPending}
                    >
                        Update
                    </Button>
                </section>
                <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </form>
        </section>
    )
}

export default ProfileEditForm