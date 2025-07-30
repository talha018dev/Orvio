import { cn } from "@/utils/tailwind-merge";
import React from "react";

type PropTypes = {
    name: string;
    error: any;
    className?: string;
};

const ErrorValidation = ({ name, error, className }: PropTypes) => {
    return (
        <React.Fragment>
            {
                error?.message ?
                    <div className={cn("absolute text-errorColor text-sm transform bottom-0 translate-y-[calc(100%-28px)]", className)}>
                        {
                            error?.message === "Invalid format" ? `Invalid format` :
                                error?.message === "Required" || error?.message === "Expected string, received object" ? `This field is required` :
                                    `${error?.message}`
                        }
                    </div> : null
            }
        </React.Fragment>
    );
};

export default ErrorValidation;
