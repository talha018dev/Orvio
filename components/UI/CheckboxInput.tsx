'use client'

import { cn } from "@/utils/tailwind-merge";
import React, { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";

type CheckboxInputProps = {
    text?: string
    className?: string
    textClassName?: string
    checked: boolean
    setChecked: Dispatch<SetStateAction<boolean>>
}

const CheckboxInput = ({ text, className = '',textClassName, checked, setChecked, }: CheckboxInputProps) => {


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    return (
        <Controller
            name={'check'}
            render={({ field, fieldState: { error } }) => {
                return (
                    <label className={cn("flex items-start gap-[10px] cursor-pointer", className)}>
                        <input
                            type="checkbox"
                            className="hidden"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <div className="relative mt-0.5 bg-white border-[1px] border-borderColor rounded-xs">
                            <span
                                className={`${checked
                                    ? "opacity-100 z-20 scale-[1]"
                                    : "opacity-0 scale-[0.4] z-[-1]"
                                    } transition-all duration-200 absolute top-0 left-0`}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Group 335">
                                        <rect
                                            id="Rectangle 331"
                                            x="-0.00012207"
                                            y="6.10352e-05"
                                            width="20"
                                            height="20"
                                            rx="4"
                                            className="fill-primary"
                                        // stroke="primary"
                                        ></rect>
                                        <path
                                            id="Vector"
                                            d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                                            fill="white"
                                        ></path>
                                    </g>
                                </svg>
                            </span>
                            <span
                                className={`${!checked
                                    ? "opacity-100 z-20 scale-[1]"
                                    : "opacity-0 scale-[0.4] z-[-1]"
                                    } transition-all duration-200 bg-white`}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Group 335">
                                        <rect
                                            id="Rectangle 331"
                                            x="-0.00012207"
                                            y="6.10352e-05"
                                            width="20"
                                            height="20"
                                            rx="4"
                                            className="fill-transparent"
                                        // stroke={BORDER_COLOR}
                                        ></rect>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        {
                            text ?
                                <span className={cn("text-sm text-primaryText", textClassName)}>{text}</span> : null
                        }
                    </label>
                )
            }}
        />
    );
};

export default CheckboxInput;
