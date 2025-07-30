'use client'

import Icon from '@/components/UI/Icon';
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants';
import { cn } from '@/utils/tailwind-merge';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import { Controller } from 'react-hook-form';

type DatePickerInputProps = {
    name: string
    label?: string
    labelClassName?: string
    labelOptional?: boolean
    text?: string
}

const DatePickerInput = ({ name, label, labelClassName, labelOptional, text }: DatePickerInputProps) => {
    const [startDate, setStartDate] = useState(null)

    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className='pb-8'>
                    {
                        label ?
                            <label className={cn('text-primaryText text-sm whitespace-nowrap', labelClassName, { 'text-errorColor': error?.message })}>
                                {label}<span className='pl-[2px] text-secondaryText'>{labelOptional ? '(optional)' : ''}</span>
                            </label> : null
                    }
                    <DatePicker
                        {...field}
                        ref={() => {
                            //@ts-ignore
                            field?.ref()
                        }}
                        wrapperClassName='w-full h-10 mt-1'
                        className={cn('datepicker bg-pageBgColor hover:border-primary focus:border-primary focus:outline-none transition duration-300 w-full h-10 border-b-1 text-sm !pl-7 border-borderColor', {'border-errorColor' : error?.message})}
                        showIcon
                        placeholderText='Select a date'
                        icon={<Icon name={'Calendar'} className='mt-1.5' fontSize={16} color={COLOR_PRIMARY_TEXT} />}
                        selected={field?.value}
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                    />
                    {
                        text ? <div className={cn('text-secondaryText text-sm mt-1', { 'text-errorColor' : error?.message})}>{text}</div> : null
                    }
                </div>
            )}
        />
    )
}

export default DatePickerInput