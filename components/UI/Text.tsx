import React from 'react'

const Text = ({ children, ...props }: React.PropsWithChildren<React.ComponentPropsWithoutRef<"p">>) => {
    return (
        <p {...props}>{children}</p>
    )
}

export default Text