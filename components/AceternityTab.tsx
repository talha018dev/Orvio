"use client";

import { cn } from "@/utils/tailwind-merge";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Tab = {
    title: string;
    value: string;
    content?: string | React.ReactNode | any;
};

export const AceternityTab = ({ tabOnClick, tabs, containerClassName, activeTabClassName, tabClassName, contentClassName }: {
    tabOnClick?: any
    tabs: Tab[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [activeTab, setActiveTab] = useState(searchParams?.get('currentTab') ?? tabs[0]?.value);

    return (
        <>
            <div
                className={cn(
                    "flex flex-row gap-1 items-center justify-around [perspective:1000px] transition-all duration-300 bg-lightGray  p-1 rounded-full overflow-clip sm:overflow-visible no-visible-scrollbar max-w-full w-full",
                    containerClassName
                )}
            >
                {tabs.map((tab, idx) => (
                    <button
                        key={tab.value}
                        onClick={() => {
                            setActiveTab(tab?.value)
                            const params = new URLSearchParams(searchParams);
                            params.set("currentTab", tab?.value)
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        className={cn("px-3 py-2 text-xs rounded-full transition-all duration-300 w-full cursor-pointer hover:bg-white", tabClassName)}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {activeTab === tab.value && (
                            <motion.div
                                layoutId="clickedbutton"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                className={cn("absolute inset-0 bg-white  rounded-full ", activeTabClassName)}
                            />
                        )}

                        <span className={cn("relative block text-secondaryText hover:text-primary", { 'text-textPrimary': activeTab === tab.value })}>
                            {tab.title}
                        </span>
                    </button>
                ))}
            </div>
            {tabs.map((tab, idx) => (
                <div
                    className="w-full"
                    key={tab.value}
                >
                    {tab.content}
                </div>
            ))}
        </>
    );
};
