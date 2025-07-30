import { cn } from '@/utils/tailwind-merge'
import React, { HTMLAttributes, ReactNode } from 'react'

interface H2TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}

const Label = ({ children, className, ...props }: H2TextProps) => {
    return (
        <div className={cn("text-xs font-medium text-[#64748B]", className)} {...props}>{children}</div>
    )
}

export default Label