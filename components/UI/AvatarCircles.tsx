"use client";

import ImageComponent from "@/components/UI/ImageComponent";
import { cn } from "@/utils/tailwind-merge";


interface Avatar {
    imageUrl: string | null;
    profileName?: string
    profileUrl?: string;
}
interface AvatarCirclesProps {
    className?: string;
    numPeople: number;
    avatarUrls: Avatar[];

    // project: SingleActiveProjectsListType
}

export const AvatarCircles = ({ numPeople, className, avatarUrls }: AvatarCirclesProps) => {
    return (
        <div className={cn("z-10 flex -space-x-2", className)}>
            {
                avatarUrls?.length ? avatarUrls?.map((url, index) => (
                    <div key={index} className="">
                        {
                            !url?.imageUrl ?
                                <div className="flex items-center justify-center size-6 bg-lightGray rounded-full border-1 border-white text-[10px] text-primaryText">{url?.profileName}</div> :
                                <ImageComponent
                                    className="border-1 rounded-full border-white"
                                    src={'/avatar.svg'}
                                    alt={`Avatar ${index + 1}`}
                                    width={"w-6"}
                                    height={"h-6"}
                                />
                        }
                    </div>
                )) : null
            }
            {
                numPeople > 0 && (
                    <div className="flex size-6 items-center justify-center rounded-full border-1 border-white bg-pageBgColor relative text-center text-xs font-medium text-secondaryText">
                        +{numPeople}
                    </div>
                )
            }
        </div>
    );
};
