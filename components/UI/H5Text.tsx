import { cn } from '@/utils/tailwind-merge'
import React, { HTMLAttributes, ReactNode } from 'react'

interface H2TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}

const H5Text = ({ children, className, ...props }: H2TextProps) => {
    return (
        <h5 className={cn("text-xs font-medium text-secondaryText", className)} {...props}>{children}</h5>
    )
}

export default H5Text