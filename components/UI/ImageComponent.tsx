import { cn } from '@/utils/tailwind-merge'
import Image from 'next/image'

type PropTypes = {
  src: string,
  alt: string,
  width: string,
  height: string,
  className?: string
  imageClassName?: string
  onLoad?: any
}

const ImageComponent = ({ src, alt, width, height, className, imageClassName, onLoad = undefined }: PropTypes) => {
  return (
    <div className={cn("relative ", `${height} ${width} ${className}`)}>
      <Image onLoad={onLoad} style={{ overflow: "hidden", fontSize: "10px" }} fill src={src} alt={alt} className={imageClassName} />
    </div>
  )
}

export default ImageComponent