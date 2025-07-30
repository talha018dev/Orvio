import { Button } from '@/components/UI/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

type GlobalDrawerProps = {
    drawerVisibility: 'Open' | 'Closed'
    setDrawerVisibility: (value: 'Open' | 'Closed') => void
    children: ReactNode
}

const GlobalDrawer = ({ drawerVisibility, setDrawerVisibility, children }: GlobalDrawerProps) => {
    const cancel = () => {
        setDrawerVisibility('Closed')
    }
    const apply = () => {
        setDrawerVisibility('Closed')
    }

    return (
        <div>
            <AnimatePresence>
                {
                    drawerVisibility === 'Open' ?
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => cancel()}
                            className='fixed w-[100dvw] left-0 top-0 z-50 grid place-items-end cursor-pointer'
                        >
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white w-full bottom-0 cursor-default'
                            >
                                <div className='max-w-(--max-width) mx-auto p-4 wrap'>
                                    {children}
                                    <section className='flex items-center gap-3 mt-12'>
                                        <Button onClick={cancel} buttonDivClassName='ml-auto' variant={'destructiveOutline'}>Cancel</Button>
                                        <Button onClick={apply}>Apply</Button>
                                    </section>
                                </div>
                            </motion.div>
                        </motion.div>
                        : null
                }
            </AnimatePresence>
        </div>
    )
}

export default GlobalDrawer