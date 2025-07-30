import { cn } from '@/utils/tailwind-merge'
import React, { HTMLAttributes, ReactNode } from 'react'

interface H2TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}

const H3Text = ({ children, className, ...props }: H2TextProps) => {
    return (
        <h3 className={cn("text-sm font-medium text-primaryText", className)} {...props}>{children}</h3>
    )
}

export default H3Text