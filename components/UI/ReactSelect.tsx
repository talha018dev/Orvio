"use client";

import EmptyListView from "@/components/EmptyListView";
import Icon from "@/components/UI/Icon";
import { COLOR_ERROR, COLOR_LIGHT_GRAY, COLOR_PAGE_BG, COLOR_PLACEHOLDER_TEXT, COLOR_PRIMARY, COLOR_PRIMARY_TEXT } from "@/constants/colorConstants";
import { cn } from "@/utils/tailwind-merge";
import { motion } from "framer-motion";
import Image from "next/image";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import Select, { components, OptionProps } from 'react-select';

type PropTypes = React.InputHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    name: string;
    listItems: any;
    value?: string;
    isLoading?: boolean;
    placeholder: string;
    disabled?: boolean;
    createButtonClicked?: boolean
    useCustomOption?: boolean
    labelOptional?: boolean

    methods: any
};

type OptionType = {
    label: string;
    value: string;
    email: string;
};

export default function ReactSelect({ methods, label, name, listItems, placeholder, disabled, isLoading, createButtonClicked, labelOptional, useCustomOption = false }: PropTypes) {
    const chargerSelectStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: 'none',
            borderBottom: '1px solid',
            borderRadius: '0',
            borderColor: methods?.formState?.errors[name]?.message ? `${COLOR_ERROR} !important` : `${COLOR_LIGHT_GRAY} !important`,
            fontSize: '14px',
            minHeight: '40x',
            height: '40px',
            boxShadow: 'none !important',
            backgroundColor: `${COLOR_PAGE_BG} !important`,
            transition: 'all 0.3s',
            '&:hover': {
                borderColor: `${COLOR_PRIMARY} !important`,
                cursor: 'pointer'
            },
            '&:focus': {
                boxShadow: 'none !important',
                borderColor: `${COLOR_PRIMARY} !important`,
                cursor: 'pointer'
            },
            '&:active': {
                boxShadow: 'none !important',
                borderColor: `${COLOR_PRIMARY} !important`,
                cursor: 'pointer'
            },
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            '& svg': {
                fill: methods?.formState?.errors[name]?.message ? '#71717A' : disabled ? '#BABA' : '#858C95',
            },
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none'
        }),

        placeholder: (provided: any) => ({
            ...provided,
            color: COLOR_PLACEHOLDER_TEXT,
            fontSize: '14px'
        }),
        //@ts-ignore
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                margin: '6px',
                width: 'calc(100% - 12px)',
                padding: '0.5rem',
                backgroundColor: isDisabled ? null
                    : isSelected ? `${COLOR_PAGE_BG}`
                        : isFocused ? `${COLOR_LIGHT_GRAY}`
                            : null,
                color: isDisabled ? '#ccc' : isSelected ? COLOR_PRIMARY_TEXT : COLOR_PRIMARY_TEXT,
                cursor: isDisabled ? 'not-allowed' : 'default',
                fontSize: '14px',
                borderRadius: '12px',
                '&:active': {
                    backgroundColor: COLOR_PRIMARY,
                    color: COLOR_PRIMARY_TEXT
                },
                '&:hover': {
                    backgroundColor: COLOR_LIGHT_GRAY,
                    color: COLOR_PRIMARY_TEXT,
                    cursor: 'pointer'
                },
            };
        }
    }

    const customFilter = (option: any, searchText: string) => {
        if (!searchText) return true;
        return option.label.toLowerCase().includes(searchText.toLowerCase());
    };

    const CustomNoOptionsMessage = () => (
        <div className="py-2">
            <EmptyListView className='mt-2 py-2' />
        </div>
    )
    let componentsConfig = {
        NoOptionsMessage: CustomNoOptionsMessage,
    };

    const CustomOption = (props: OptionProps<OptionType, true>) => {
        const { label, data, isSelected } = props;
        return (
            <components.Option {...props}>
                <div className="flex cursor-pointer items-center gap-2 relative">
                    {<Icon className={cn("text-primary w-4 h-4", { 'opacity-0': !isSelected })} name={"Check"} color={COLOR_PRIMARY_TEXT} />}
                    <div className="size-8 bg-darkGray rounded-full"></div>
                    <div>
                        <div
                            className={
                                cn("text-sm text-primaryText",
                                    // { '!text-errorColor': methods?.formState?.errors[name]?.message }
                                )}
                        >
                            {label}
                        </div>

                        <div className="text-xs text-secondaryText mt-1">{data?.email}</div>
                    </div>
                    {
                        isSelected ? <div className="absolute top-1/2 transform -translate-y-1/2 right-0 text-sm bg-white text-primaryText py-1 px-2 rounded-full">Primary</div> : null
                    }
                </div>
            </components.Option>
        );
    };

    const SingleValue = (props: any) => {
        return (<components.SingleValue {...props}>
            <div>
                <span className=" relative flex items-center gap-2 rounded-md">
                    <Image
                        src={`/logo.svg`}
                        alt={"icon"}
                        width={16}
                        height={16}
                    />
                    <p>{props.selectProps.value.label}</p>
                </span>
            </div>
        </components.SingleValue>);
    }

    const CustomMenu = (props: any) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <components.Menu {...props} />
            </motion.div>
        );
    };

    if (useCustomOption) {
        componentsConfig = Object.assign(componentsConfig, { Option: CustomOption })
    }
    componentsConfig = Object.assign(componentsConfig, { Menu: CustomMenu, })

    return (
        <div className="pb-8">
            <label className='w-full text-sm text-secondaryText'>
                {label}<span className='pl-[2px] text-secondaryText'>{labelOptional ? '(optional)' : ''}</span>
            </label>
            <Controller
                name={name}
                control={methods?.control}
                render={({ field, fieldState: { error } }) => {
                    return (
                        <div className="relative">
                            <Select
                                {...field}
                                instanceId={name}
                                isDisabled={disabled}
                                styles={chargerSelectStyles}
                                isLoading={isLoading}
                                // onChange={e => {
                                //     console.log("eeeeeee", e);
                                //     methods?.setValue(name, e, { shouldValidate: true, shouldDirty: true });
                                // }}
                                menuPosition="fixed"
                                options={listItems}
                                className={cn("reactSelect mt-1.5 !border-0", { "cursor-not-allowed": disabled })}
                                classNamePrefix="select"
                                placeholder={placeholder}
                                closeMenuOnSelect={true}
                                components={componentsConfig}
                                filterOption={customFilter}
                                // menuIsOpen
                            />
                            {
                                error?.message ?
                                    <div className={cn("absolute flex items-center gap-1 font-medium text-errorColor text-xs transform bottom-0 translate-y-[calc(100%+4px)]")}>
                                        {error?.message as string}
                                    </div> : null
                            }
                            {/* {
                            createButtonClicked && methods?.formState?.errors && methods?.formState?.errors[name] ?
                                <div className={cn("absolute flex items-center gap-1 font-medium text-errorColor text-[12px] transform bottom-0 translate-y-[calc(100%+4px)]")}>
                                    <Icon name={"Warning"} color={COLOR_ERROR} fontSize={16} />
                                    {methods?.formState?.errors[name].message as string}
                                </div> : null
                        } */}
                        </div>
                    )
                }}
            />
        </div>
    );
}
