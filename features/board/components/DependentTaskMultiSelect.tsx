"use client";

import EmptyListView from "@/components/EmptyListView";
import Icon from "@/components/UI/Icon";
import { COLOR_BORDER, COLOR_ERROR, COLOR_LIGHT_GRAY, COLOR_PAGE_BG, COLOR_PLACEHOLDER_TEXT, COLOR_PRIMARY, COLOR_PRIMARY_TEXT, COLOR_WHITE } from "@/constants/colorConstants";
import { cn } from "@/utils/tailwind-merge";
import { motion } from "framer-motion";
import Image from "next/image";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import Select, { components, MultiValue, OptionProps } from 'react-select';

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

    selectedTasks: any
    setSelectedTasks: any

};

type OptionType = {
    label: string;
    value: string;
    stage: string;
};

export default function DependentTaskMultiSelect({ selectedTasks, setSelectedTasks, label, name, listItems, placeholder, disabled, isLoading, createButtonClicked, labelOptional, useCustomOption = false }: PropTypes) {
    console.log(' DependentTaskMultiSelect - listItems:', listItems)
    const chargerSelectStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: 'none',
            borderBottom: '1px solid',
            borderRadius: '0',
            borderColor: `${COLOR_LIGHT_GRAY} !important`,
            fontSize: '14px',
            minHeight: '40x',
            // height: '40px',
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
                fill: disabled ? '#BABA' : '#858C95',
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
                margin: '6px !important',
                width: 'calc(100% - 12px)',
                padding: '0.5rem',
                backgroundColor: isDisabled ? null
                    : isSelected ? `${COLOR_PRIMARY}`
                        : isFocused ? `${COLOR_LIGHT_GRAY}`
                            : null,
                color: isDisabled ? '#ccc' : isSelected || isFocused ? 'white' : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
                fontSize: '14px',
                borderRadius: '12px',
                '&:active': {
                    backgroundColor: COLOR_PRIMARY,
                    color: COLOR_WHITE
                },
                '&:hover': {
                    backgroundColor: COLOR_PRIMARY,
                    color: `${COLOR_WHITE} !important`,
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



    const CustomOption = (props: OptionProps<OptionType, true>) => {
        const { label, data, isSelected } = props;
        console.log(' CustomOption - label:', label)
        return (
            <components.Option {...props} className="group transition-all duration-300">
                <div className="flex cursor-pointer items-start gap-2 relative ">
                    <div>
                        <Icon className={cn("text-primary w-4 h-4", { 'opacity-0': !isSelected })} name={"Check"} color={isSelected ? COLOR_WHITE : COLOR_PRIMARY_TEXT} />
                    </div>
                    <div>
                        <div className={cn("text-sm text-primaryText group-hover:text-white break-all text-wrap", { 'text-white': isSelected })}>{label}</div>
                        <div className={cn("text-xs text-secondaryText mt-1 group-hover:text-white break-all text-wrap", { 'text-white': isSelected })}>{data?.stage}</div>
                    </div>
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

    let componentsConfig = {
        NoOptionsMessage: CustomNoOptionsMessage,
        Option: CustomOption,
        ClearIndicator: () => null,
        MultiValue: ({ data, removeProps }: { data: any, removeProps: any }) => (
            <div className="flex items-center px-2 py-1 m-1 text-xs text-primaryText bg-white rounded-full border-borderColor border-1">
                {data.label}
                <div
                    className="ml-2 text-primaryText"
                    {...removeProps}
                >
                    ✕
                </div>
            </div>
        ),
    };


    if (useCustomOption) {
        componentsConfig = Object.assign(componentsConfig, { Option: CustomOption })
    }
    componentsConfig = Object.assign(componentsConfig, { Menu: CustomMenu, })

    return (
        <div className="pb-8 mt-6">
            <label className='w-full text-xs text-secondaryText'>
                Dependent On
            </label>
            <div className="relative">
                <Select
                    instanceId={name}
                    isDisabled={disabled}
                    styles={chargerSelectStyles}
                    isLoading={isLoading}
                    onChange={e => {
                        setSelectedTasks(e)
                    }}
                    value={selectedTasks}
                    menuPosition="fixed"
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    options={listItems}
                    className={cn("reactSelect mt-1.5 !border-0", { "cursor-not-allowed": disabled })}
                    classNamePrefix="select"
                    placeholder={placeholder}
                    components={componentsConfig}
                    filterOption={customFilter}
                    controlShouldRenderValue={false}
                    // menuIsOpen
                />
                {/* {
                    createButtonClicked && methods?.formState?.errors && methods?.formState?.errors[name] ?
                        <div className={cn("absolute flex items-center gap-1 font-medium text-errorColor text-[12px] transform bottom-0 translate-y-[calc(100%+4px)]")}>
                            <Icon name={"Warning"} color={COLOR_ERROR} fontSize={16} />
                            {methods?.formState?.errors[name].message as string}
                        </div> : null
                } */}
            </div>
        </div>
    );
}
