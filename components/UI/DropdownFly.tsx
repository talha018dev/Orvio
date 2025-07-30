'use client'

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/tailwind-merge";
import { ClassNameValue } from "tailwind-merge";



const DropdownFly: React.FC<{
    children: React.ReactNode
    href: string
    FlyoutContent?: React.ElementType
    flyoutContentParentClassName?: ClassNameValue
    onClose?: () => void
}> = ({ children, href, FlyoutContent, flyoutContentParentClassName = '', onClose }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
                onClose?.()
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [onClose])

    const toggleOpen = () => setOpen((prev) => !prev)

    return (
        <div ref={ref} className="relative w-fit h-fit">
            <a href={href} onClick={toggleOpen} className="relative text-white cursor-pointer">
                {children}
                <span
                    style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
                />
            </a>
            <AnimatePresence>
                {open && FlyoutContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ translateX: "-50%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={cn("absolute left-1/2 top-12 bg-white text-black", flyoutContentParentClassName)}
                    >
                        <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                        <FlyoutContent onClose={() => setOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


export default DropdownFly;