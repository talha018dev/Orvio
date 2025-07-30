"use client";
import { FileUpload } from "@/components/UI/FileUpload";
import H3Text from "@/components/UI/H3Text";
import H5Text from "@/components/UI/H5Text";
import ImageComponent from "@/components/UI/ImageComponent";
import { uploadProfileImage } from "@/features/profile/queryFunctions/profileQueryFunctions";
import { cn } from "@/utils/tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";


export default function UserImageUpload({ profileImage, setProfileImage }: { profileImage?: any, setProfileImage?: any }) {
    const uploadProfileImageMutation = useMutation<any, any, any, any>({ mutationFn: uploadProfileImage })

    const [objectFit, setObjectFit] = useState("object-none");
    const [previewUrl, setPreviewUrl] = useState('')
    const [uploadError, setUploadError] = useState(false)

    const handleFileUpload = (files: File[]) => {
        const formData = new FormData()
        const file = files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type) || file.size > maxSize) {
            setUploadError(true)
            return;
        }

        formData.append('file', file)

        uploadProfileImageMutation.mutate(formData,
            {
                onSuccess(data, variables, context) {
                    console.log(' onSuccess - data:', data?.avatar)
                    if (setProfileImage) {
                        setProfileImage(data?.avatar)
                    }
                },
            }
        )
        setUploadError(false)
        const image = URL.createObjectURL(file);
        setPreviewUrl(image);
    }

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        if (img.naturalWidth < 84 || img.naturalHeight < 84) {
            setObjectFit("object-none")
        } else {
            setObjectFit("object-cover")
        }
    }

    return (
        <div className="w-full mx-auto rounded-lg flex items-center gap-4 mb-6">
            {
                !(profileImage || previewUrl) ?
                    <div className="size-21 rounded-full bg-outlineHover"></div> :
                    <ImageComponent
                        onLoad={handleImageLoad}
                        className="rounded-full min-w-21 overflow-hidden border-1 border-borderColor"
                        imageClassName={`${objectFit}`}
                        src={profileImage ?? previewUrl}
                        alt={"preview"}
                        width={"w-21"}
                        height={"h-21"}
                    />
            }
            <div>
                <H3Text>Upload Photo (Optional)</H3Text>
                <H5Text className={cn("mt-1 mb-4", { 'text-errorColor': uploadError })}>Please upload a clear image in JPG, PNG, or JPEG format under 5MB.</H5Text>
                <FileUpload onChange={handleFileUpload} />
            </div>
        </div>
    );
}
