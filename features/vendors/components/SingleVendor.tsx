import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import VendorStatus from '@/features/vendors/components/VendorStatus'
import { inviteVendor, reinviteVendor } from '@/features/vendors/queryFunctions/vendorQueryFunctions'
import { SingleVendorsListType } from '@/features/vendors/types/types'
import { formatDate } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type SingleVendorProps = {
    vendor: SingleVendorsListType
    index: number
    isLastElement: boolean
    lastElementRef: (node: HTMLDivElement) => void
}

const SingleVendor = ({ vendor, index, isLastElement, lastElementRef }: SingleVendorProps) => {
    const inviteVendorMutation = useMutation<any, any, any, any>({ mutationFn: reinviteVendor })
    const router = useRouter()

    const resendInvite = (vendorId: string) => {
        inviteVendorMutation.mutate(vendorId,
            {
                onSuccess(data, variables, context) {
                    close()
                    toast('Vendor invitation has been resent.')
                },
                onError(error, variables, context) {
                    console.log(' onError - error:', error, variables, context)
                    toast(error?.data?.message ?? 'Something went wrong. Try again later.')

                },
                onSettled(data, error, variables, context) {
                },
            },
        )
    }

    return (
        <motion.div
            key={vendor?._id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: (index - Math.floor(index / 10) * 10) * 0.1 }}
            viewport={{ amount: 0.4 }}
            className='cursor-pointer '
        // onClick={() => router.push(`/stages/${stage?._id}/details`)}
        >
            <div
                ref={isLastElement ? lastElementRef : null}
                key={vendor?._id}
                className='flex items-start gap-3 smooth bg-white p-3 rounded-lg text-sm hover:scale-[1.02] perspective-[1px] translate-z-0 transition-all duration-200'
            >
                <div className='bg-pageBgColor rounded-full size-7'></div>
                <div>
                    {
                        vendor?.name ?
                            <H2Text className='mb-2'>{vendor?.name}</H2Text> : null
                    }
                    <div className={cn('text-xs text-primaryText', { 'text-secondaryText': vendor?.name })}>{vendor?.email}</div>
                    <div className='flex items-center mt-2'>
                        <VendorStatus status={vendor?.status} />
                        {
                            vendor?.status === 'invited' ? null :
                                <>
                                    <Icon name={'Calendar'} color={COLOR_SECONDARY_TEXT} weight='regular' className='ml-3' />
                                    <div className='ml-1 text-xs text-secondaryText'>Started {formatDate(vendor?.updatedAt)}</div>
                                </>
                        }
                    </div>
                </div>
                <div className={cn('ml-auto', { 'mt-auto': vendor?.status === 'active' })}>
                    {
                        vendor?.status === 'invited' ?
                            <Button
                                variant='outline'
                                className='border-1 border-borderColor py-2 px-4 text-sm rounded-full cursor-pointer'
                                onClick={() => resendInvite(vendor?._id)}
                                loading={inviteVendorMutation?.isPending}
                                loaderColor={COLOR_PRIMARY_TEXT}
                            >
                                Resend
                            </Button> :
                            <div className='border-1 border-borderColor py-1 px-2 text-xs rounded-full'>Free</div>
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default SingleVendor