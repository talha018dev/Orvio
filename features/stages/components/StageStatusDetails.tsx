import { Button } from '@/components/UI/Button'
import CardSkeleton from '@/components/UI/CardSkeleton'
import SmallText from '@/components/UI/SmallText'
import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { updateStageStatus } from '@/features/stages/queryFunctions/stageQueryFunctions'
import { StageDetailsType } from '@/features/stages/types/types'
import { useModalStore } from '@/store/useModalStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query'

type StageStatusDetailsProps = {
    stageDetails: StageDetailsType | undefined
    stageDetailsLoader: boolean
    refetchStageDetails: (options?: RefetchOptions) => Promise<QueryObserverResult<StageDetailsType, Error>>
}

const StageStatusDetails = ({ stageDetails, stageDetailsLoader, refetchStageDetails }: StageStatusDetailsProps) => {
    const queryClient = useQueryClient()

    const updateStageStatusMutation = useMutation({ mutationFn: updateStageStatus })
    const { addNotification } = useNotificationStore()
    const { openModal, closeModal } = useModalStore()

    const updateStatus = () => {
        const data = {
            status: stageDetails?.status === 'active' ? 'inactive' : 'active',
            stageId: stageDetails?._id
        }
        updateStageStatusMutation?.mutate(data,
            {
                onSuccess: (data: any) => {
                    addNotification('Stage template has been updated.')
                    closeModal()
                    // refetchStageDetails()
                    queryClient.invalidateQueries({ queryKey: ['getStageDetails', stageDetails?._id] })
                    queryClient.invalidateQueries({ queryKey: ['getStagesList', { page: 1, size: 10, search: '', status: 'active' }] })
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
            `Deactivating ${stageDetails?.name} will remove it for upcoming projects. Do you want to proceed?`,
            "No",
            "Yes, Deactivate",
            () => {
                updateStatus()
            }
        )
    }

    if (stageDetailsLoader) return <CardSkeleton className='mt-21 bg-white' childClassName='h-3' childSkeletonCount={3} />

    return (
            <section className='bg-white p-4 rounded-lg'>
                <SmallText>{stageDetails?.status === 'active' ? 'Deactivate' : 'Activate'} Template</SmallText>
                <div className='text-sm text-primaryText mb-2'>
                    {
                        stageDetails?.status === 'active' ? 'Once deactivated, this template will no longer be available for future projects.' :
                            'Activating the template will make it available for all projects.'
                    }
                </div>
                <Button
                    onClick={stageDetails?.status === 'active' ? deactivateModal : updateStatus}
                    variant={stageDetails?.status === 'active' ? 'destructiveOutline' : 'outline'}
                    loading={updateStageStatusMutation?.isPending}
                    loaderColor={COLOR_PRIMARY}
                >
                    {stageDetails?.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
            </section>
    )
}

export default StageStatusDetails