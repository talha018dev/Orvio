import { cn } from '@/utils/tailwind-merge'
import React, { ReactNode } from 'react'

const SmallText = ({className, children}: {className?: string, children: ReactNode}) => {
  return (
    <div className={cn('text-xs text-secondaryText mb-1', className)}>{children}</div>
  )
}

export default SmallText