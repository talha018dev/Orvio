import { SingleUserType } from '@/features/users/types/types'
import { capitalizeFirstLetter } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

type UserStatusChipProps = {
    status: SingleUserType['status']
    className?: ClassNameValue
}

const UserStatusChip = ({ status, className = '' }: UserStatusChipProps) => {
    return (
        <div
            className={cn('bg-primary rounded-full py-1 px-2 text-xs mr-3 text-white inline-block',
                { 'bg-[#F59E0B]': status === 'inactive' },
                { 'bg-darkGray text-primaryText': status === 'invited' }, className
            )}
        >
            {capitalizeFirstLetter(status ?? '')}
        </div>
    )
}

export default UserStatusChip