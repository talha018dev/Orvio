
import { cn } from "@/utils/tailwind-merge";
import Link from "next/link";
import React from "react";

type BreadcrumbProps = {
    breadcrumbItems: {
        label: string;
        path: string;
    }[]
}

const Breadcrumb = ({ breadcrumbItems }: BreadcrumbProps) => {
    return (
        <div className="flex items-center gap-2 py-4">
            {
                breadcrumbItems?.map((item, index) => {
                    return (
                        (
                            <React.Fragment key={index}>
                                {/* index === breadcrumbItems.length - 1 */}
                                <Link href={item.path}
                                    className={cn(`text-xs text-secondaryText hover:underline`, { 'text-primaryText': index === breadcrumbItems.length - 1 })}>{item.label}</Link>
                                {
                                    index !== breadcrumbItems.length - 1 && (
                                        <div className="text-xs">/</div>
                                    )
                                }
                            </React.Fragment>
                        )
                    )
                })
            }
        </div>
    );
};

export default Breadcrumb;
