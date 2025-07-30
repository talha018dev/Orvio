import H1Text from '@/components/UI/H1Text'
import { SingleClientsListType } from '@/features/users/types/types'
import React from 'react'

type ClientDetailsCardProps = {
    clientDetails: SingleClientsListType | undefined
    primary?: boolean
}

const ClientDetailsCard = ({ clientDetails, primary }: ClientDetailsCardProps) => {
    return (
        <section className='grid grid-cols-[70px_1fr] relative bg-white rounded-xl p-3 border border-borderColor'>
            <div className="size-12 bg-pageBgColor rounded-full"></div>
            <div className="flex flex-col gap-2">
                <H1Text className='text-sm w-[calc(100%-80px)]'>{clientDetails?.name}</H1Text>
                <div className="text-xs text-secondaryText">{clientDetails?.email}</div>
                <div className="text-xs text-secondaryText">{clientDetails?.phone}</div>
                <div className="text-xs text-secondaryText">
                    {clientDetails?.address?.addressLine ? `${clientDetails?.address?.addressLine},` : ''}
                    {clientDetails?.address?.city ? `${clientDetails?.address?.city}  ,` : ''}
                    {clientDetails?.address?.state ? `${clientDetails?.address?.state}  ,` : ''}
                    {clientDetails?.address?.zipCode ? `${clientDetails?.address?.zipCode}` : ''}
                </div>
            </div>
            {
                primary ?
                    <div className="absolute top-3 right-3 text-sm bg-pageBgColor py-1 px-2 rounded-full">Primary</div> : null
            }
        </section>
    )
}

export default ClientDetailsCard