import { capitalizeFirstLetter } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'

const VendorStatus = ({status}: {status: 'invited' | 'active'}) => {
  return (
    <div className={cn('rounded-full py-1 px-2 text-primaryText text-xs bg-lightGray', {'bg-primary text-white': status === 'active'})}>{capitalizeFirstLetter(status)}</div>
  )
}

export default VendorStatus