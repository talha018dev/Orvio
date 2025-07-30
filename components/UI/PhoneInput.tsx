'use client'
import Icon from '@/components/UI/Icon';
import { COLOR_ERROR } from '@/constants/colorConstants';
import { cn } from '@/utils/tailwind-merge';
import { Dispatch, SetStateAction } from 'react';
import PhoneInput from 'react-phone-input-2';

type PropsType = {
    errors: any
    placeholder: string
    className?: string
    value?: string
    createButtonClicked?: boolean
    validPhoneNumber: boolean
    setValidPhoneNumber?: Dispatch<SetStateAction<boolean>>
    phoneNumber?: string
    setPhoneNumber?: Dispatch<SetStateAction<string>>
    field: any
    colorInverse?: boolean
}

const PhoneInputComponent = ({ colorInverse, field, placeholder, className, createButtonClicked, validPhoneNumber, setValidPhoneNumber, phoneNumber, setPhoneNumber }: PropsType) => {

    const validatePhoneNumber = (value: any, inputNumber: any) => {
        if (value.length == inputNumber?.format?.split('.').length - 1) {
            // setValidPhoneNumber(true);
            return true;
        }
        // setValidPhoneNumber(false)
        return false;
    }

    return (
        <div className={cn("relative pb-4", { "border rounded border-errorColor": createButtonClicked && !validPhoneNumber && (phoneNumber?.length !== 0) }, className)}>
            <PhoneInput
                {...field}
                placeholder={placeholder}
                country={'us'}
                onlyCountries={["us"]}
                preferredCountries={["us"]}
                countryCodeEditable={false}
                disableDropdown={true}
                // excludeCountries={['bd']}
                // onChange={phone => { setValue(name, phone, { shouldValidate: true }) }}
                isValid={(value: any, inputNumber: any) => {
                    if (setPhoneNumber) {
                        setPhoneNumber(value);
                    }
                    return validatePhoneNumber(value, inputNumber);
                }}
                inputClass={cn(
                    "flex h-10 w-full border-b-[1px] border-borderColor hover:border-primary focus:border-primary transition-all duration-300 outline-0 mt-2 py-3 bg-white px-3 text-sm placeholder:text-placeholderText disabled:cursor-not-allowed disabled:opacity-50",
                    { "border-errorColor hover:border-errorColor focus:border-errorColor focus-visible:ring-errorColor/50": field?.error?.message },
                    { 'bg-pageBgColor border-borderColor': colorInverse },
                    // { 'pl-8': prefix },
                    // inputClassName
                )}
            />
            {
                createButtonClicked && !validPhoneNumber ?
                    <p className={cn("absolute flex items-center gap-1 font-medium text-errorColor text-[12px] -bottom-6", className)}>
                        {
                            phoneNumber?.length !== 0 ?
                                <>
                                    <Icon name={"Warning"} color={COLOR_ERROR} fontSize={16} />
                                    Invalid format: Use &quot;+1 123 456 7890&quot; pattern.
                                </>
                                : null
                        }
                    </p>
                    : null
            }
        </div>
    );
};

export default PhoneInputComponent;