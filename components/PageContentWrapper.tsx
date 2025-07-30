import { cn } from '@/utils/tailwind-merge'
import { ReactNode } from 'react'

const PageContentWrapper = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <section className={cn('max-w-(--max-width) mx-auto px-4 wrap', className)}>{children}</section>
  )
}

export default PageContentWrapper