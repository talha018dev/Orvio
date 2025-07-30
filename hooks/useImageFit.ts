import { useCallback, useState } from "react"

export function useImageFit(minWidth = 84, minHeight = 84) {
    const [objectFit, setObjectFit] = useState('')

    const handleImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.currentTarget
            if (img.naturalWidth < minWidth || img.naturalHeight < minHeight) {
                setObjectFit("object-none")
            } else {
                setObjectFit("object-cover")
            }
        },
        [minWidth, minHeight]
    )

    return { objectFit, handleImageLoad }
}