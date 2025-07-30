'use client'

import { cn } from '@/utils/tailwind-merge'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

const MotionWrapper = ({ className, children }: { className?: string, children: ReactNode }) => {
    const searchParams = useSearchParams()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={cn('', { 'overflow-hidden': searchParams?.get('filterDrawer') }, className)}
        >
            {children}
        </motion.div>
    )
}

export default MotionWrapper