import { cn } from '@/utils/tailwind-merge'
import React, { HTMLAttributes, ReactNode } from 'react'

interface H2TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}

const H2Text = ({ children, className, ...props }: H2TextProps) => {
    return (
        <h2 className={cn("text-base font-bold text-primaryText", className)} {...props}>{children}</h2>
    )
}

export default H2Text