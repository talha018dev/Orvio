'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import { getZipCodeDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { getEinDetailsQueryOptions } from '@/features/vendors/queryOptions/vendorQueryOptions'
import { VendorSetupStep2Schema } from '@/features/vendors/schema/schema'
import { VendorSignUpInfoType } from '@/features/vendors/types/types'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type Step2Props = {
    setVendorFormData: Dispatch<SetStateAction<VendorSignUpInfoType>>
    setCurrentStep: Dispatch<SetStateAction<number>>
}

const Step2 = ({ setVendorFormData, setCurrentStep }: Step2Props) => {
    const [callZipCodeApi, setCallZipCodeApi] = useState(false)
    const [callEinApi, setCallEinApi] = useState(false)

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(VendorSetupStep2Schema)
    formConfig["defaultValues"] = {
        ein: '',
        addressLine: '',
        zip: '',
    }
    formConfig['mode'] = 'onSubmit'
    formConfig['criteriaMode'] = 'all'
    formConfig['shouldUseNativeValidation'] = false
    const methods = useForm(formConfig)
    const { data: zipCodeDetails, isError: zipCodeError } = useQuery(getZipCodeDetailsQueryOptions(methods.getValues('zip'), callZipCodeApi))
    const { data: einDetails, isError: einError, isSuccess: einSuccess } = useQuery(getEinDetailsQueryOptions(methods.getValues('ein'), callEinApi))

    useEffect(() => {
        const fieldName = ['city', 'state', 'country'] as const
        if (zipCodeDetails) {
            fieldName.forEach(field => methods?.setValue(field, zipCodeDetails[field], { shouldValidate: true, shouldDirty: true }))
        }
        else if (zipCodeError || methods?.getValues('zip')?.trim() == '') {
            fieldName.forEach(field => methods?.setValue(field, null, { shouldValidate: true, shouldDirty: true }))
        }
    }, [zipCodeDetails, zipCodeError])
    useEffect(() => {
        if (einError) {
            methods.setError('ein', { message: 'EIN already exists.' })
        }
        if (einDetails || einSuccess) {
            methods.clearErrors('ein')
        }
        setCallEinApi(false)
    }, [einDetails, einError])

    const allFieldsEmpty = () => {
        const { ein, addressLine, zip, city } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return ((ein?.length !== 9 || !einSuccess || !addressLine || !zip || !city)) || hasErrors;
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(' onSubmit - data:', data)
        setVendorFormData(prevState => ({
            ...prevState,
            ...data
        }))
        setCurrentStep(3)
    }

    const skipStep = () => {
        methods.reset()
        setVendorFormData(prevState => ({
            ...prevState,
            ein: '',
            addressLine: '',
            zip: '',
            city: '',
            state: '',
            country: ''
        }))
        setCurrentStep(3)
    }


    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <section className={cn('bg-white p-4 rounded-xl mt-4',)}>
                <H2Text>Account Set Up</H2Text>
                <MotionWrapper>
                    <FormProvider {...methods}>
                        <div className={cn('w-full mt-6')}>
                            <Input setCallEinApi={setCallEinApi} name='ein' placeholder={'EIN'} label={'EIN'} colorInverse={true} />
                            <Input name='addressLine' placeholder={'Address Line'} label={'Address Line'} colorInverse={true} />
                            <div className='grid grid-cols-2 gap-4 items-end'>
                                <Input setCallZipCodeApi={setCallZipCodeApi} name='zip' placeholder={'Zip Code'} label={'Zip Code'} colorInverse={true} />
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
            <section className='flex flex-col items-center gap-4 pb-4 w-full'>
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-full'
                    className='w-full mt-5'
                    type='submit'
                // loading={createUserMutation?.isPending}
                >
                    Continue
                </Button>
                <Button onClick={() => { skipStep() }} variant={'ghost'}>Skip this step</Button>
            </section>
        </form>
    )
}

export default Step2