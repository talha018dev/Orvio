'use client'

import ErrorValidation from '@/components/ErrorValidation'
import { cn } from '@/utils/tailwind-merge'
import { Dispatch, SetStateAction, useState } from 'react'
import { Controller } from 'react-hook-form'

type PropTypes = {
    inputDivClassName?: string
    inputClassName?: string
    label?: string
    labelOptional?: boolean
    labelClassName?: string
    name: string
    placeholder: string
    apiError?: any
    value?: string
    inputType?: 'password' | string & {}

    disabled?: boolean
    disableFullHeight?: boolean
    colorInverse?: boolean
    prefix?: any
    text?: string
    inputPadding?: string

    setCallZipCodeApi?: Dispatch<SetStateAction<boolean>>
    setCallEinApi?: Dispatch<SetStateAction<boolean>>
}

const InputWithLabel = ({ inputDivClassName, disableFullHeight, setCallZipCodeApi,setCallEinApi, text, inputPadding, prefix, colorInverse, inputClassName, label, labelOptional, labelClassName, name, placeholder, apiError, value, inputType, disabled, ...props }: PropTypes) => {
    const [passwordStatus, setPasswordStatus] = useState<'Show' | 'Hide'>('Show')

    const changePasswordStatus = () => {
        setPasswordStatus(prevState => (prevState === 'Show' ? 'Hide' : 'Show'))
    }

    const handleInputChange = () => {
        if (name === 'zipCode' || name === 'zip') {
            if (setCallZipCodeApi) {
                setCallZipCodeApi(false);
            }
            let typingTimer;
            clearTimeout(typingTimer);
            typingTimer = setTimeout(function () {
                if (setCallZipCodeApi) {
                    setCallZipCodeApi(true);
                }
            }, 2000);
        }
        if (name === 'ein') {
            if (setCallEinApi) {
                setCallEinApi(false);
            }
            let typingTimer;
            clearTimeout(typingTimer);
            typingTimer = setTimeout(function () {
                if (setCallEinApi) {
                    setCallEinApi(true);
                }
            }, 2000);
        }
    };

    return (
        <div className={cn('', inputDivClassName)}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => {
                    return (
                        <>
                            <div className='flex items-center'>
                                {
                                    label ?
                                        <label className={cn('text-primaryText text-sm whitespace-nowrap', labelClassName, { 'text-errorColor': error?.message }, { 'text-[#94A3B8]': disabled })}>
                                            {label}<span className='pl-[2px] text-secondaryText'>{labelOptional ? '(optional)' : ''}</span>
                                        </label> : null
                                }
                                {
                                    inputType === 'password' ? <div className='ml-auto cursor-pointer text-sm underline' onClick={changePasswordStatus}>{passwordStatus}</div> : null
                                }
                            </div>
                            <div className={cn("relative pb-8", inputPadding)}>
                                <input
                                    {...field}
                                    autoComplete="new-password"
                                    value={field?.value ?? ''}
                                    type={inputType === 'password' && passwordStatus === 'Show' ? 'Password' : 'text'}
                                    placeholder={placeholder}
                                    onKeyUp={handleInputChange}
                                    className={cn(
                                        "flex h-10 w-full border-b-[1px] border-borderColor hover:border-primary focus:border-primary transition-all duration-300 outline-0 mt-2 py-3 bg-white px-3 text-sm placeholder:text-placeholderText disabled:cursor-not-allowed disabled:opacity-50",
                                        { "border-b-[1px] border-errorColor hover:border-errorColor focus:border-errorColor focus-visible:ring-errorColor/50": (error?.message || apiError) },
                                        { 'bg-pageBgColor border-borderColor': colorInverse && !error?.message },
                                        { 'pl-8': prefix },
                                        inputClassName
                                    )}
                                    {...props}
                                />
                                {
                                    disabled ?
                                        <div className={cn("absolute top-0 z-40 w-full h-[calc(100%-2rem)] cursor-not-allowed bg-[#F3F4F6]/50", { 'h-full': disableFullHeight })}></div>
                                        : null
                                }
                                {
                                    !disabled ? <ErrorValidation name={name} error={error} /> : null
                                }
                                {
                                    prefix ? <div className='absolute top-2.5 left-2 text-sm text-primaryText'>{prefix}</div> : null
                                }
                                {
                                    text ? <div className='text-secondaryText text-sm mt-1'>{text}</div> : null
                                }
                            </div>
                        </>
                    )
                }}
            />
        </div>
    )
}

export default InputWithLabel