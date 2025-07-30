import { cn } from '@/utils/tailwind-merge'
import React, { HTMLAttributes, ReactNode } from 'react'

interface H1TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}

const H1Text = ({ children, className, ...props }: H1TextProps) => {
    return (
        <h1 className={cn("text-xl font-bold text-primaryText", className)} {...props}>{children}</h1>
    )
}

export default H1Text