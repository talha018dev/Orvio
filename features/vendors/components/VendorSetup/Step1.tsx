'use client'

import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import PhoneInput2 from '@/components/UI/PhoneInput2'
import { VendorSetupStep1Schema } from '@/features/vendors/schema/schema'
import { VendorSignUpInfoType } from '@/features/vendors/types/types'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Step1Props = {
  vendorFormData: VendorSignUpInfoType
  setVendorFormData: Dispatch<SetStateAction<VendorSignUpInfoType>>
  setCurrentStep: Dispatch<SetStateAction<number>>
}

const Step1 = ({vendorFormData, setVendorFormData, setCurrentStep }: Step1Props) => {

  const formConfig: { [key: string]: any } = {}
  formConfig["resolver"] = zodResolver(VendorSetupStep1Schema)
  formConfig["defaultValues"] = {
    vendorEmail: vendorFormData?.vendorEmail,
    vendorName: '',
    vendorPhone: '',
  }
  const methods = useForm(formConfig)

  const allFieldsEmpty = () => {
    const { vendorEmail, vendorName, vendorPhone } = methods.watch();
    const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
    return ((!vendorEmail || !vendorName || vendorPhone?.length < 11)) || hasErrors;
  };

  const onSubmit = (data: Partial<VendorSignUpInfoType>) => {
    console.log(' onSubmit - data:', data)
    setVendorFormData(prevState => ({
      ...prevState,
      ...data
    }))
    setCurrentStep(2)
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
      <section className={cn('bg-white p-4 rounded-xl',)}>
        <H2Text>Account Set Up</H2Text>
        <FormProvider {...methods}>
          <div className={cn('w-full mt-6')}>
            <Input name='vendorEmail' placeholder={'Email'} label={'Email'} colorInverse={true} disabled={true} />
            <Input name='vendorName' placeholder={'Company Name'} label={'Company Name'} colorInverse={true} />
            <PhoneInput2 name='vendorPhone' />
          </div>
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

export default Step1