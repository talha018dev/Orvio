import { Button } from '@/components/UI/Button'
import SmallText from '@/components/UI/SmallText'
import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { useModalStore } from '@/store/useModalStore'
import React from 'react'

type StatusUpdateCardProps = {
    details: any
    updateFn: any
    updateMutation: any
}

const StatusUpdateCard = ({ details, updateFn, updateMutation }: StatusUpdateCardProps) => {
    const { openModal, closeModal } = useModalStore()

    const deactivateModal = () => {
        openModal(
            "Deactivate",
            `Deactivating ${details?.name} will remove it for upcoming projects. Do you want to proceed?`,
            "No",
            "Yes, Deactivate",
            () => {
                updateFn()
            }
        )
    }

    return (
        <section className='bg-white p-4 rounded-lg'>
            <SmallText>{details?.status === 'active' || details?.status === 'invited' ? 'Deactivate' : 'Activate'} User</SmallText>
            <div className='text-sm text-primaryText mb-2'>
                {
                    details?.status === 'active' ? 'Once deactivated, this user will no longer be part of any projects.' :
                        'Activating this user allows you to assign them to projects.'
                }
            </div>
            <Button
                onClick={details?.status === 'active' || details?.status === 'invited'  ? deactivateModal : updateFn}
                variant={details?.status === 'active' || details?.status === 'invited' ? 'destructiveOutline' : 'outline'}
                loading={updateMutation?.isPending}
                loaderColor={COLOR_PRIMARY}
            >
                {details?.status === 'active' || details?.status === 'invited' ? 'Deactivate' : 'Activate'}
            </Button>
        </section>
    )
}

export default StatusUpdateCard