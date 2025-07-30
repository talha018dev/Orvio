"use client";

import EmptyListView from "@/components/EmptyListView";
import Icon from "@/components/UI/Icon";
import ImageComponent from "@/components/UI/ImageComponent";
import { COLOR_LIGHT_GRAY, COLOR_PAGE_BG, COLOR_PLACEHOLDER_TEXT, COLOR_PRIMARY, COLOR_PRIMARY_TEXT } from "@/constants/colorConstants";
import { TaskDetailsType } from "@/features/board/types/types";
import { cn } from "@/utils/tailwind-merge";
import { motion } from "framer-motion";
import React, { useCallback, useMemo } from "react";
import Select, { components, MultiValue, OptionProps } from 'react-select';

type OptionType = {
    value: string;
    label: string;
    role?: string
    stage?: string
}

type PropTypes = React.InputHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    value?: string;
    isLoading?: boolean;
    disabled?: boolean;
    createButtonClicked?: boolean
    useCustomOption?: boolean
    labelOptional?: boolean

    collaboratorsList: TaskDetailsType['collaborators'] | undefined
    selectedCollaborators: MultiValue<OptionType>
    setSelectedCollaborators: React.Dispatch<React.SetStateAction<MultiValue<OptionType>>>

};



export default function CollaboratorMultiSelect({ collaboratorsList, selectedCollaborators, setSelectedCollaborators, disabled, isLoading, labelOptional, useCustomOption = true }: PropTypes) {
    // const [menuOpen, setMenuOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");

    const listItems = useMemo(() => (
        collaboratorsList?.map(collaborator => ({
            value: collaborator._id,
            label: collaborator.name,
            role: collaborator?.role
        })) ?? []
    ), [collaboratorsList]);

    const chargerSelectStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: '1px solid',
            // borderBottom: '1px solid',
            borderRadius: '999px',
            borderColor: `${COLOR_LIGHT_GRAY} !important`,
            fontSize: '14px',
            minHeight: '32x',
            height: '32px',
            boxShadow: 'none !important',
            backgroundColor: `${COLOR_PAGE_BG} !important`,
            transition: 'all 0.3s',
            width: '32px',
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
            display: 'none',
            '& svg': {
                display: 'none',
                fill: '#858C95',
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
        valueContainer: (base: any) => ({
            ...base,
            padding: 0,
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

    const filteredOptions = listItems?.filter((option) =>
        option?.value?.toLowerCase()?.includes(searchText?.toLowerCase())
    );

    const CustomNoOptionsMessage = () => (
        <div className="py-2">
            <EmptyListView className='mt-2 py-2' />
        </div>
    )


    const CustomOption = React.memo((props: OptionProps<OptionType, true>) => {
        const { label, data, isSelected } = props;
        return (
            <components.Option {...props} className="z-[1000]">
                <div className="flex cursor-pointer items-center gap-2 relative">
                    <Icon className={cn("text-primary w-4 h-4", { 'opacity-0': !isSelected })} name={"Check"} color={COLOR_PRIMARY_TEXT} />
                    <ImageComponent src={"/avatar.svg"} alt={"avatar"} width={"w-8"} height={"h-8"} />
                    <div>
                        <div className={cn("text-sm text-primaryText")}>
                            {label}
                        </div>
                        <div className={cn("text-xs text-secondaryText")}>
                            {data?.role}
                        </div>
                    </div>
                </div>
            </components.Option>
        );
    });

    const CustomMenu = (props: any) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <components.Menu {...props} />
            </motion.div>
        );
    };



    const CustomInput = () => null;

    const CustomValueContainer = (props: any) => (
        <components.ValueContainer {...props}>
            {props.hasValue ? null : props.children}
        </components.ValueContainer>
    );



    // const CustomMenuList = React.memo((props: any) => {
    //     const searchTextRef = useRef<string>("");

    //     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         searchTextRef.current = e.target.value;
    //         // You can handle other logic here, like filtering options
    //         props.setSearchText(e.target.value); // Pass the input text back to parent
    //     };

    //     return (
    //         <components.MenuList {...props}>
    //             <div className="px-3 py-2">
    //                 <input
    //                     type="text"
    //                     value={searchTextRef.current} // Bind input value to ref
    //                     onChange={handleSearchChange}
    //                     placeholder="Search and select collaborators"
    //                     className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
    //                 />
    //             </div>
    //             {props.children}
    //         </components.MenuList>
    //     );
    // });

    let componentsConfig = {
        NoOptionsMessage: CustomNoOptionsMessage,
        Option: CustomOption,
        Menu: CustomMenu,
        // ValueContainer: CustomValueContainer,
        // Input: CustomInput,
        // MenuList: (props: any) => <CustomMenuList {...props} setSearchText={setSearchText} />, // Pass search state
    };


    const handleChange = useCallback((selected: MultiValue<OptionType>) => {
        setSelectedCollaborators(selected);
    }, [setSelectedCollaborators]);



    return (
        <div className="pb-1">
            <div className="relative">
                <Select
                    instanceId={'Search and select collaborators'}
                    placeholder=
                    {
                        <div className="rounded-full p-1">
                            <Icon name={"Plus"} color={""} />
                        </div>
                    }
                    // {
                    //     <div className="flex items-center gap-2">
                    //         <Icon name={"MagnifyingGlass"} color={COLOR_SECONDARY_TEXT} fontSize={14} />
                    //         <div>Search and select collaborators</div>
                    //     </div>
                    // }
                    // onChange={e => {
                    //     console.log("eeeeeee", e);
                    //     methods?.setValue(name, e, { shouldValidate: true, shouldDirty: true });
                    // }}
                    // filterOption={customFilter}
                    // onMenuClose={() => setMenuOpen(false)}
                    // menuPlacement="bottom"
                    // menuShouldScrollIntoView={true}
                    // menuIsOpen
                    menuPosition="fixed"
                    isDisabled={disabled}
                    isSearchable={false}
                    styles={chargerSelectStyles}
                    isLoading={isLoading}
                    closeMenuOnSelect={false}
                    controlShouldRenderValue={false}
                    isMulti
                    options={listItems}
                    className={cn("reactSelect mt-1.5 !border-0", { "cursor-not-allowed": disabled })}
                    classNamePrefix="select collaboratorMultiSelect"
                    components={componentsConfig}
                    hideSelectedOptions={false}
                    onChange={(selectedOption) => {
                        handleChange(selectedOption)
                    }}
                    value={selectedCollaborators}
                />
            </div>
        </div>
    );
}
