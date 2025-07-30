'use client'

import { Button } from '@/components/UI/Button'
import CheckboxInput from '@/components/UI/CheckboxInput'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import PhoneInput2 from '@/components/UI/PhoneInput2'
import { VendorSetupStep3Schema } from '@/features/vendors/schema/schema'
import { VendorSignUpInfoType } from '@/features/vendors/types/types'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type Step3Props = {
    setVendorFormData: Dispatch<SetStateAction<VendorSignUpInfoType>>
    setCurrentStep: Dispatch<SetStateAction<number>>
}

const Step3 = ({ setVendorFormData, setCurrentStep }: Step3Props) => {
    const [consentCheck, setConsentCheck] = useState(false)
    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(VendorSetupStep3Schema)
    formConfig["defaultValues"] = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    }
    const methods = useForm(formConfig)

    const allFieldsEmpty = () => {
        const { email, name, phone, password, confirmPassword } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return ((!email || !name || phone?.length < 11)) || !password || !confirmPassword || hasErrors;
    };

    const onSubmit = (data: FieldValues) => {
        console.log(' onSubmit - data:', data)
        setVendorFormData(prevState => ({
            ...prevState,
            ...data,
            receiveUpdate: consentCheck ? 'true' : 'false',
        }))
        setCurrentStep(4)
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <section className={cn('bg-white p-4 rounded-xl mt-4',)}>
                <H2Text>User Admin Set Up</H2Text>
                <FormProvider {...methods}>
                    <div className={cn('w-full mt-6')}>
                        <Input name='name' placeholder={'User Name'} label={'User Name'} colorInverse={true} />
                        <Input name='email' placeholder={'Email'} label={'Email'} colorInverse={true} />
                        <PhoneInput2 />
                        <CheckboxInput checked={consentCheck} setChecked={setConsentCheck} textClassName='text-xs' className='my-4 text-xs' text={'I agree to receive text messages from reelsync.io for updates and notifications. Message & data rates may apply.'} />
                    </div>
                    <div className='relative'>
                        <Input inputType='password' inputDivClassName='' name='password' placeholder={'Password'} label={'Password'} colorInverse={true} />
                        {!methods?.formState?.errors["password"] ?
                            <p
                                className={cn('text-sm text-[#64748B] absolute transform bottom-0 translate-y-[calc(100%-28px)]', { 'text-errorColor': methods?.formState?.errors["password"] })}
                            >
                                Use at least 8 characters, with a mix of upper & lower case letters and a number.
                            </p>
                            : null
                        }
                    </div>
                    <Input inputType='password' inputDivClassName='pt-4' name='confirmPassword' placeholder={'Retype Password'} label={'Retype Password'} colorInverse={true} />
                </FormProvider>
            </section>
            <section className='flex items-center pb-4'>
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-full'
                    className='w-full mt-5'
                    type='submit'
                >
                    Continue
                </Button>
            </section>
        </form>
    )
}

export default Step3