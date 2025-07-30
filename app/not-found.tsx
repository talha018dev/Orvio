'use client'

import MotionWrapper from '@/components/MotionWrapper'
import PageContentWrapper from '@/components/PageContentWrapper'
import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()
    return (
        <main className='bg-pageBgColor text-primaryText mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
            <MotionWrapper>
                <PageContentWrapper>
                    <H2Text className='mt-40 text-center'>Page not found</H2Text>
                    <Button variant={'destructiveOutline'} className='mt-10 w-1/4 max-w-[200px] mx-auto text-center cursor-pointer hover:underline' onClick={() => router.back()}>Go back</Button>
                </PageContentWrapper>
            </MotionWrapper>
        </main>
    )
}

export default NotFound