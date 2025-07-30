import { Button } from "@/components/UI/Button";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({ onChange, }: { onChange?: (files: File[]) => void; }) => {
    // const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: File[]) => {
        // setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        onChange && onChange(newFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error: any) => {
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                whileHover="animate"
                className="group/file rounded-lg w-full inline-block"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg"
                />
                <Button variant={'outline'} className="cursor-pointer" onClick={handleClick}>Upload</Button>

            </motion.div>
        </div>
    );
};