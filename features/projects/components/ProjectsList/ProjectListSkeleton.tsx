import { cn } from "@/utils/tailwind-merge"
import { motion } from "framer-motion"

type PropsType = {
    className?: string
    skeletonCount?: number
    skeletonClassName?: string
}

const ProjectListSkeleton = ({ className, skeletonCount = 10, skeletonClassName = '' }: PropsType) => {
    const items = Array.from({ length: skeletonCount }, (_, i) => i);
    return (
        <div className={cn("flex flex-col gap-3 w-full", className)}>
            {
                items.map((item, index) => {
                    return (
                        <motion.div
                            key={item ?? index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
                            viewport={{ amount: 5.4 }}
                        >
                            <div className={cn("h-[76px] animate-pulse rounded-lg  bg-white text-white", skeletonClassName)}></div>
                        </motion.div>
                    )
                })
            }
        </div>
    )
}

export default ProjectListSkeleton