import H1Text from '@/components/UI/H1Text'
import { Collaborator } from '@/features/projects/types/types'
import { SingleClientsListType } from '@/features/users/types/types'
import React from 'react'

type CollaboratorDetailsCardProps = {
    collaborator: Collaborator
    primary?: boolean
}

const CollaboratorDetailsCard = ({ collaborator, primary }: CollaboratorDetailsCardProps) => {
    return (
        <section className='grid grid-cols-[70px_1fr] relative bg-white rounded-xl p-3 border border-borderColor'>
            <div className="size-12 bg-pageBgColor rounded-full"></div>
            <div className="flex flex-col gap-2">
                <H1Text className='text-sm w-[calc(100%-80px)]'>{collaborator?.name}</H1Text>
                <div className="text-xs text-secondaryText">{collaborator?.email}</div>
                <div className="text-xs text-secondaryText">{collaborator?.role}</div>
                {/* <div className="text-xs text-secondaryText">
                    {collaborator?.address?.addressLine ? `${collaborator?.address?.addressLine},` : ''}
                    {collaborator?.address?.city ? `${collaborator?.address?.city}  ,` : ''}
                    {collaborator?.address?.state ? `${collaborator?.address?.state}  ,` : ''}
                    {collaborator?.address?.zipCode ? `${collaborator?.address?.zipCode}` : ''}
                </div> */}
            </div>
            {
                primary ?
                    <div className="absolute top-3 right-3 text-sm bg-pageBgColor py-1 px-2 rounded-full">Primary</div> : null
            }
        </section>
    )
}

export default CollaboratorDetailsCard