import { cn } from '@/utils/tailwind-merge'
import React from 'react'

const CardSkeleton = ({ className, childClassName, childSkeletonCount }: { className?: string, childClassName?: string, childSkeletonCount?: number }) => {

  return (
    <div className={cn('h-30 bg-white rounded-lg animate-pulse justify-around flex flex-col gap-2 p-2 items-start', className)}>
      {Array.from({ length: childSkeletonCount ?? 3 }, (_, i) => i + 1).map(item => <div style={{ width: `calc(100% / ${item})` }} key={item} className={cn(`h-4 bg-darkGray animate-pulse rounded-lg`, childClassName)}></div>)}
    </div>
  )
}

export default CardSkeleton