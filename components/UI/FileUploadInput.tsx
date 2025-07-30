import { Button } from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { convertMBtoByte } from '@/helpers/functionHelpers';
import { cn } from '@/utils/tailwind-merge';
import { Dispatch, SetStateAction, useState } from 'react';

type PropTypes = {
    name: string
    setValue: any
    // setFileSizeError: Dispatch<SetStateAction<boolean>>
    // fileSizeError: boolean
    fileUrl: string | null
    setFileUrl: Dispatch<SetStateAction<string | null>>
    imageSize?: number
    checkImagePixels?: boolean
    validFileTypes: string[]
    text?: string

    label?: string
    labelOptional?: boolean
    labelClassName?: string
}

const FileUploadInput = ({ name, setValue, fileUrl, label, labelOptional, labelClassName, setFileUrl, imageSize, text, validFileTypes, checkImagePixels = false }: PropTypes) => {
    const [fileName, setFileName] = useState('')


    const handleProfileChange = (event: any) => {
        const file = event.target.files[0];
        const img = new Image()
        if (file) {
            // const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            setFileName(file?.name)

            const isValidFileType = validFileTypes.includes(file?.type);
            if (file?.size > convertMBtoByte(imageSize ?? 5) || !isValidFileType) {
                setValue(name, "", { shouldValidate: true })
                // setFileSizeError(true)
                return
            }
            img.src = window.URL.createObjectURL(event.target.files[0])
            img.onload = () => {
                if (checkImagePixels && (img.width < 148 || img.height < 48)) {
                    setValue(name, "", { shouldValidate: true })
                    // setFileSizeError(true)
                } else {
                    // setFileSizeError(false)
                    setFileUrl(URL.createObjectURL(file));
                    const fileWithBlob = {
                        blob: new Blob([file], { type: file.type }),
                        name: file.name,
                    };
                    setValue(name, fileWithBlob, { shouldValidate: true })
                }
            }
            event.target.value = ''
        }
    }

    const handleRemoveStudioLogo = () => {
        setFileUrl(null)
        setValue(name, '', { shouldValidate: true })
    }

    return (
        <>
            {
                label ?
                    <label className={cn('text-primaryText text-sm whitespace-nowrap', labelClassName,)}>
                        {label}<span className='pl-[2px] text-secondaryText'>{labelOptional ? '(optional)' : ''}</span>
                    </label> : null
            }
            <div className='flex gap-2 relative mb-6'>
                <div
                    onClick={() => document?.getElementById(name)?.click()}
                    className='w-full'
                >
                    <Input name={name} placeholder={'Choose File'} value={'Choose File'} colorInverse={true} text={'File should be under 10MB.'} inputClassName='placeholder:text-primaryText' inputPadding={'pb-0 cursor-pointer'} />
                    {
                        fileName ? <div className='absolute left-24 top-4 w-[calc(100% - 6rem)] z-[100]'>{fileName}</div> : null
                    }
                </div>
                <input id={name} className="hidden w-full cursor-pointer rounded-md border border-borderColor bg-white  text-sm text-textMuted" type="file" onChange={handleProfileChange} />
                {
                    fileUrl ?
                        <Button onClick={() => handleRemoveStudioLogo()} type="button" variant={'destructiveOutline'} className='focus:outline-0'>Remove</Button> : null
                }
            </div>
        </>
    )
}

export default FileUploadInput