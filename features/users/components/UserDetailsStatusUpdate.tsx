import { Button } from '@/components/UI/Button'
import SmallText from '@/components/UI/SmallText'
import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { updateStageStatus } from '@/features/stages/queryFunctions/stageQueryFunctions'
import { updateUserStatus } from '@/features/users/queryFunctions/userQueryFunctions'
import { UserDetailsType } from '@/features/users/types/types'
import { useModalStore } from '@/store/useModalStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

type UserDetailsStatusUpdateProps = {
    userDetails: UserDetailsType | undefined
}

const UserDetailsStatusUpdate = ({ userDetails }: UserDetailsStatusUpdateProps) => {

    const queryClient = useQueryClient()

    const updateUserStatusMutation = useMutation({ mutationFn: updateUserStatus })
    const { addNotification } = useNotificationStore()
    const { openModal, closeModal } = useModalStore()

    const updateStatus = () => {
        const data = {
            status: userDetails?.status === 'active' || userDetails?.status === 'invited' ? 'inactive' : 'active',
            userId: userDetails?._id
        }
        updateUserStatusMutation?.mutate(data,
            {
                onSuccess: (data: any) => {
                    addNotification('User profile has been updated.')
                    closeModal()
                    queryClient.invalidateQueries({ queryKey: ['getUserDetails', userDetails?._id] })
                    queryClient.invalidateQueries({ queryKey: ['getUsersList', { page: 1, size: 10, search: '' }] })
                },
                onError: (error: any) => {
                    if (error?.data?.message) {
                        addNotification(error?.data?.message)
                    }
                },
            }
        )
    }

    const deactivateModal = () => {
        openModal(
            "Deactivate",
            <div>Deactivating <span className='font-bold text-primaryText'>{userDetails?.name}</span> will revoke their access and remove them from all projects. Do you want to deactivate?</div>,
            "No",
            "Yes, Deactivate",
            () => {
                updateStatus()
            }
        )
    }

    return (
        <section className='bg-white p-4 rounded-lg mt-7 mb-4'>
            <SmallText>{userDetails?.status === 'active' || userDetails?.status === 'invited' ? 'Deactivate' : 'Activate'} User</SmallText>
            <div className='text-sm text-primaryText mb-2'>
                {
                    userDetails?.status === 'active' || userDetails?.status === 'invited' ? 'Once deactivated, this user will no longer be part of any projects.' :
                        'Activating this user allows you to assign them to projects.'
                }
            </div>
            <Button
                onClick={userDetails?.status === 'active' || userDetails?.status === 'invited' ? deactivateModal : updateStatus}
                variant={userDetails?.status === 'active' || userDetails?.status === 'invited' ? 'destructiveOutline' : 'outline'}
                loading={updateUserStatusMutation?.isPending}
                loaderColor={COLOR_PRIMARY}
            >
                {userDetails?.status === 'active' || userDetails?.status === 'invited' ? 'Deactivate' : 'Activate'}
            </Button>
        </section>
    )
}

export default UserDetailsStatusUpdate