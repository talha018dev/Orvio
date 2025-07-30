'use client'

import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import ImageComponent from '@/components/UI/ImageComponent'
import Link from 'next/link'

const SetupSuccess = () => {
    return (
        <MotionWrapper>
            <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                <H1Text className='mt-4'>Successful</H1Text>
                <ImageComponent className='text-center mx-auto mt-10 mb-4' src={'/success.svg'} alt={'success'} width={'w-10'} height={'h-8'} />
                <div className='text-sm text-secondaryText mt-2'>Your password has been successfully set. You can now log in using your new password.</div>
                <div className='mt-6 text-sm text-primaryText underline text-center'>
                    <Link href='/login'>Go to sign in</Link>
                </div>
            </section>
        </MotionWrapper>
    )
}

export default SetupSuccess