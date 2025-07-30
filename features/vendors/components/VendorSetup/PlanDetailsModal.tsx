import H3Text from '@/components/UI/H3Text'
import H5Text from '@/components/UI/H5Text'
import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { getPlanDetailsQueryOptions } from '@/features/vendors/queryOptions/vendorQueryOptions'
import { SinglePlanType } from '@/features/vendors/types/types'
import { capitalizeFirstLetter, convertIntoTwoDecimals } from '@/helpers/functionHelpers'
import { cn } from '@/utils/tailwind-merge'
import { Modal, Radio } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

type PlanDetailsModalProps = {
    plan: SinglePlanType
    opened: boolean
    close: any
}

const PlanDetailsModal = ({ plan, opened, close }: PlanDetailsModalProps) => {
    // const { data: planDetails, isFetching: planDetailsLoader } = useQuery(getPlanDetailsQueryOptions(plan?._id))

    const planLimits = plan?.limits && Object.entries(plan?.limits)?.length ?
        Object.entries(plan?.limits)?.map(([key, value]) => {
            return ({ key, value })
        }) : []

    return (
        <Modal
            opened={opened}
            onClose={() => {
                close()
            }}
            centered
            withCloseButton={false}
            className='!rounded-xl'
        >
            <div className='flex items-center gap-3'>
                <div>{plan?.name}</div>
                <div className='ml-auto border-r-1 pr-3 border-outlineHover'>
                    <Radio.Indicator
                        variant='outline'
                        checked={true}
                        color={COLOR_PRIMARY}
                        className="ml-auto border-r border-borderColor [&>svg]:!w-[0.75rem] [&>svg]:!h-[0.75rem]"
                    />
                </div>
                <Icon onClick={close} name={'ArrowsOutSimple'} color={''} weight='regular' className='cursor-pointer' />
            </div>
            <div className='text-sm text-primaryText mt-2'>$<span className='text-2xl font-bold'>{convertIntoTwoDecimals(plan?.pricing?.yearly)}</span>&nbsp;/year <span className='text-secondaryText'>${convertIntoTwoDecimals(plan?.pricing?.monthly)}&nbsp;/month</span></div>
            <H5Text className='mt-3 font-normal'>{plan?.description}</H5Text>
            <section>
                <H3Text className='border-t-1 border-borderColor pt-2'>Key Features</H3Text>
                {
                    planLimits?.length ? planLimits?.map((limit, index) => {
                        return (
                            <section key={limit?.key} className={cn('grid grid-cols-2 gap-y-[1px] border-b-1 border-borderColor text-xs text-primaryText mt-2', { 'border-0': index + 1 === planLimits?.length })}>
                                <div className='bg-white py-2'>{capitalizeFirstLetter(limit?.key)} creation</div>
                                <div className='bg-white py-2'>{limit?.value ?? 0} {limit?.key}</div>
                            </section>
                        )
                    }) : null
                }
            </section>
        </Modal>
    )
}

export default PlanDetailsModal