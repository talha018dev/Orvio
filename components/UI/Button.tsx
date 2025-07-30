'use client'
import Icon from "@/components/UI/Icon"
import { cn } from "@/utils/tailwind-merge"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
    `flex items-center justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg`,
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primaryHover focus:bg-primaryFocus",
                destructive: "bg-destructive text-white hover:bg-destructiveHover focus:bg-destructiveFocus",
                destructiveOutline: "bg-pageBg text-destructive border-1 border-destructive hover:bg-destructiveHover hover:text-white focus:text-white focus:bg-destructiveFocus",
                outline: "border border-borderColor bg-white text-primaryText hover:bg-lightGray focus:bg-lightGray",
                disabled: "bg-disabledColor cursor-not-allowed text-white",
                disabledOutline: "bg-white border-1 border-borderColor cursor-not-allowed text-secondaryText",

                ghost: "bg-transparent text-primaryText hover:bg-darkGray focus:bg-darkGray",
                link: "size-fit text-primaryText underline underline-offset-3 hover:underline-primary focus:underline-primary hover:text-primary focus:text-primary",
            },
            size: {
                xs: "h-7 px-3 text-sm",
                sm: "h-9 px-5 text-sm",
                md: "h-10 px-4 py-2 text-sm",
                lg: "h-9 px-[18px] text-lg",
                xl: "h-9 px-5 text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    loaderColor?: string
    buttonDivClassName?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, loaderColor, buttonDivClassName, children, ...props }, ref) => {
        return (
            <div className={cn("relative", { "cursor-not-allowed": props?.disabled }, buttonDivClassName)}>
                <button
                    type={props?.type ?? "button"}
                    className={cn(buttonVariants({ variant, size, className }), { 'pointer-events-none opacity-80': loading })}
                    ref={ref}
                    {...props}
                >
                    {
                        <div className='flex items-center gap-x-2'>
                            {/* <div className='flex items-center gap-1 w-fit relative'>
                                {loading ? <Icon name={'Loader'} color={loaderColor ?? '#ffffff'} className='absolute -left-7 animate-spin' fontSize={20} /> : null}
                                {children}
                            </div> */}
                            {
                                loading ? <Icon name={'Loader'} color={loaderColor ?? '#ffffff'} className='animate-spin' fontSize={20} /> : children
                            }

                        </div>
                    }
                </button>
            </div>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

