'use client'

import { cn } from "@/utils/tailwind-merge";
import { motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";

const DropDown = ({ children, button, dropdownClassName = '', dropdownItemsClassName = '' }: { children: ReactNode, button: ReactNode, dropdownClassName?: string, dropdownItemsClassName?: string }) => {
    const [open, setOpen] = useState(false);
     const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            };
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }, []);

    return (
        <div ref={ref} className={cn("flex items-center justify-center w-full transition-all duration-300", dropdownClassName)}>
            <motion.div
                animate={open ? "open" : "closed"}
                className="relative w-full group"
            >
                <div onClick={() => setOpen((pv) => !pv)}>
                    {button}
                </div>
                <motion.ul
                    onClick={() => setOpen((pv) => !pv)}
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className={cn("max-h-[200px] z-[10000] absolute overflow-auto flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl top-[120%] left-[50%] w-full", dropdownItemsClassName)}
                >
                    {children}
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({
    text,
    Icon,
    setOpen,
}: {
    text: string;
    Icon: IconType;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

export default DropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};