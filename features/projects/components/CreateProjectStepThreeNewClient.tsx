'use client'

import MotionWrapper from '@/components/MotionWrapper'
import CheckboxInput from '@/components/UI/CheckboxInput'
import Input from '@/components/UI/Input'
import PhoneInput2 from '@/components/UI/PhoneInput2'
import { cn } from '@/utils/tailwind-merge'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider } from 'react-hook-form'

type CreateProjectStepThreeNewClientProps = {
    methods: any
    consentCheck: boolean
    setConsentCheck: Dispatch<SetStateAction<boolean>>
    setCallZipCodeApi: Dispatch<SetStateAction<boolean>>
}

const CreateProjectStepThreeNewClient = ({ methods, consentCheck, setCallZipCodeApi, setConsentCheck }: CreateProjectStepThreeNewClientProps) => {
    return (
        <MotionWrapper>
            <FormProvider {...methods}>
                <div className={cn('w-full mt-6')}>
                    <Input name='email' placeholder={'Email'} label={'Email'} colorInverse={true} />
                    <Input name='name' placeholder={'Client/ Company Name'} label={'Client/ Company Name'} colorInverse={true} />
                    <PhoneInput2 />
                    <CheckboxInput checked={consentCheck} setChecked={setConsentCheck} textClassName='text-xs' className='my-4 text-xs' text={'I agree to receive text messages from reelsync.io for updates and notifications. Message & data rates may apply.'} />
                    <Input name='addressLine' placeholder={'Address Line'} label={'Address Line'} colorInverse={true} labelOptional={true} />
                    <div className='grid grid-cols-2 gap-4 items-end'>
                        <Input setCallZipCodeApi={setCallZipCodeApi} name='zip' placeholder={'Zip Code'} label={'Zip Code'} colorInverse={true} labelOptional={true} />
                        <Input disabled name='city' placeholder={'City'} label={'City'} colorInverse={true} labelOptional={true} />
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-end'>
                        <Input disabled name='state' placeholder={'State'} label={'State'} colorInverse={true} labelOptional={true} />
                        <Input disabled name='country' placeholder={'Country'} label={'Country'} colorInverse={true} labelOptional={true} />
                    </div>
                </div>
            </FormProvider>
        </MotionWrapper>
    )
}

export default CreateProjectStepThreeNewClient