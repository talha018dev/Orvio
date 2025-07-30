'use client'

import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import ImageComponent from '@/components/UI/ImageComponent'
import Link from 'next/link'

const ExpiredTokenUI = () => {
    return (
        <MotionWrapper>
            <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                <H1Text className='mt-4'>Expired</H1Text>
                <ImageComponent className='text-center mx-auto mt-10 mb-4' src={'/warning.svg'} alt={'success'} width={'w-10'} height={'h-8'} />
                <div className='text-sm text-secondaryText mt-2'>This password reset link has expired for security reasons. Please return to the sign-in page and select 'Forgot your password?' to receive a new reset password link.</div>
                <div className='mt-6 text-sm text-primaryText underline text-center'>
                    <Link href='/login'>Go to sign in</Link>
                </div>
            </section>
        </MotionWrapper>
    )
}

export default ExpiredTokenUI