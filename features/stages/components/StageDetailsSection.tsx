'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import Chip from '@/components/UI/Chip'
import H1Text from '@/components/UI/H1Text'
import H3Text from '@/components/UI/H3Text'
import Icon from '@/components/UI/Icon'
import SmallText from '@/components/UI/SmallText'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import StageDetailsAccordion from '@/features/stages/components/StageDetailsAccordion'
import StageStatusDetails from '@/features/stages/components/StageStatusDetails'
import { getStageDetailsQueryOptions } from '@/features/stages/queryOptions/stageQueryOptions'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

type StageDetailsSectionProps = {
    stageId: string
}

const StageDetailsSection = ({ stageId }: StageDetailsSectionProps) => {
    const { data: stageDetails, isFetching: stageDetailsLoader, refetch: refetchStageDetails } = useQuery(getStageDetailsQueryOptions(stageId))

    return (
        <>
            <section className="flex items-center mb-6">
                <H1Text>{stageDetails?.name}</H1Text>
                <Link href={`/stages/${stageId}/edit`} className='ml-auto'>
                    <Button variant={'outline'} >
                        <Icon name={'PencilSimpleLine'} color={COLOR_PRIMARY_TEXT} fontSize={12} />
                        <div>Edit</div>
                    </Button>
                </Link>
            </section>
            {
                stageDetailsLoader ? null :
                    <MotionWrapper>
                        <SmallText>Template Title</SmallText>
                        <div className='flex items-center gap-4 mb-4 mt-1'>
                            <H3Text>{stageDetails?.name}</H3Text>
                            <Chip status={stageDetails?.status} />
                        </div>
                    </MotionWrapper>
            }
            <StageStatusDetails stageDetails={stageDetails} stageDetailsLoader={stageDetailsLoader} refetchStageDetails={refetchStageDetails} />
            <StageDetailsAccordion stageDetails={stageDetails} stageDetailsLoader={stageDetailsLoader} />
        </>
    )
}

export default StageDetailsSection