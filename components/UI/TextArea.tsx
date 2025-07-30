'use client'

import ErrorValidation from '@/components/ErrorValidation'
import { cn } from '@/utils/tailwind-merge'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

type PropTypes = {
    inputDivClassName?: string
    inputClassName?: string
    label?: string
    labelRequired?: boolean
    labelOptional?: boolean
    labelClassName?: string
    name: string
    placeholder: string
    apiError?: any
    value?: string
    inputType?: 'password' | string & {}

    disabled?: boolean
    colorInverse?: boolean
    inputPadding?: string
    maxLimit?: number
    textAreaClassName?: string
}

const TextArea = ({ inputDivClassName, colorInverse,textAreaClassName, inputPadding, maxLimit, inputClassName, label, labelRequired, labelOptional, labelClassName, name, placeholder, apiError, value, inputType, disabled, ...props }: PropTypes) => {

    return (
        <div className={cn('', inputDivClassName)}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <div className='flex items-center'>
                            {
                                label ?
                                    <label className={cn('text-primaryText text-sm whitespace-nowrap', labelClassName, { 'text-errorColor': error?.message && !labelOptional })}>
                                        {label}<span className='pl-[2px] text-secondaryText'>{labelOptional ? '(optional)' : ''}</span>
                                    </label> : null
                            }
                        </div>
                        <div className={cn("relative pb-8", inputPadding)}>
                            <textarea
                                {...field}
                                autoComplete="new-password"
                                value={field?.value ?? value}
                                placeholder={placeholder}
                                className={cn(
                                    "flex h-25 min-h-10 w-full border-b-[1px] border-borderColor hover:border-primary focus:border-primary transition-all duration-300 outline-0 mt-2 py-3 bg-white px-3 text-sm placeholder:text-placeholderText disabled:cursor-not-allowed disabled:opacity-50",
                                    { "border-errorColor hover:border-errorColor focus:border-errorColor focus-visible:ring-errorColor/50": (error?.message || apiError) },
                                    { 'bg-pageBgColor border-borderColor': colorInverse },
                                    textAreaClassName
                                )}
                                {...props}
                            />
                            {
                                !disabled && !labelOptional ? <ErrorValidation name={name} error={error} /> : null
                            }
                            {
                                maxLimit ?
                                    <div className={cn("ml-auto text-right text-secondaryText text-sm mt-2", { 'text-errorColor': field?.value?.length > maxLimit })}>{field?.value?.length ?? 0}/{maxLimit}</div> : null
                            }
                        </div>
                    </>
                )}
            />
        </div>
    )
}

export default TextArea