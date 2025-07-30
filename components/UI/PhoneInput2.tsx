import PhoneInputComponent from '@/components/UI/PhoneInput'
import React from 'react'
import { Controller } from 'react-hook-form'

const PhoneInput2 = ({ name }: { name?: string }) => {
    return (
        <Controller
            name={name ?? 'phone'}
            render={({ field, fieldState: { error } }) => (
                <PhoneInputComponent
                    errors={undefined}
                    placeholder={'Phone'}
                    validPhoneNumber={false}
                    // setValidPhoneNumber={null}
                    field={field}
                    colorInverse={true}
                />
            )}
        />
    )
}

export default PhoneInput2