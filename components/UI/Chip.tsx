import { capitalizeFirstLetter } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

type ChipProps = {
    status: ('active' | 'inactive' | 'all') | string & {} | undefined
    className?: ClassNameValue
}

const Chip = ({ status, className = '' }: ChipProps) => {
    return (
        <div
            className={cn('bg-primary rounded-full py-1 px-2 text-xs mr-3 text-white inline-block',
                { 'bg-[#F59E0B]': status === 'inactive' }, className
            )}
        >
            {capitalizeFirstLetter(status ?? '')}
        </div>
    )
}

export default Chip