import MotionWrapper from '@/components/MotionWrapper';
import { Button } from '@/components/UI/Button';
import H2Text from '@/components/UI/H2Text';
import H5Text from '@/components/UI/H5Text';
import Icon from '@/components/UI/Icon';
import { COLOR_PRIMARY } from '@/constants/colorConstants';
import PlanDetailsModal from '@/features/vendors/components/VendorSetup/PlanDetailsModal';
import PlansListSkeleton from '@/features/vendors/components/VendorSetup/PlansListSkeleton';
import { getPlansListQueryOptions } from '@/features/vendors/queryOptions/vendorQueryOptions';
import { SinglePlanType, VendorSignUpInfoType } from '@/features/vendors/types/types';
import { convertIntoTwoDecimals } from '@/helpers/functionHelpers';
import { Radio } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useState } from 'react';
// import classes from './Demo.module.css';

type Step4Props = {
    setVendorFormData: Dispatch<SetStateAction<VendorSignUpInfoType>>
    setCurrentStep: Dispatch<SetStateAction<number>>
}

const planData = [
    {
        id: 'Free',
        name: 'Free Plan',
        yearlyAmount: '0.00',
        monthlyAmount: '0.00',
        description: 'Are working on personal projects. Need basic design, presentation, and brainstorming tools, Want to try Figma products.',
    },
] as const

export default function Step4({ setVendorFormData, setCurrentStep }: Step4Props) {
    const { data: plansList, isFetching: plansListLoader } = useQuery(getPlansListQueryOptions())

    const [selectedPlan, setSelectedPlan] = useState<SinglePlanType>()
    const [value, setValue] = useState<string | null>(null)
    const [opened, { open, close }] = useDisclosure(false)

    const onSubmit = () => {
        setCurrentStep(5)
        setVendorFormData(prevState => ({
            ...prevState,
            plan: selectedPlan,
            planId: selectedPlan?._id
        }))
    }

    return (
        <section className=''>
            <H2Text className='mb-3'>Choose Plan</H2Text>
            {
                plansListLoader ? <PlansListSkeleton /> :
                    <MotionWrapper>
                        <Radio.Group
                            value={value}
                            onChange={setValue}
                            className='[&>div]:flex [&>div]:flex-col [&>div]:gap-3'
                        >
                            {
                                plansList?.length ? plansList?.slice(0, 1)?.map(plan => {
                                    return (

                                        <React.Fragment key={plan?._id}>
                                            <Radio.Card
                                                className={'!p-3 data-[checked=true]:!border-primary !rounded-xl'}
                                                radius="md"
                                                value={plan?._id}
                                                onClick={() => setSelectedPlan(plan)}
                                            >
                                                <div className='flex items-center gap-3'>
                                                    <div>{plan?.name}</div>
                                                    <div className='ml-auto border-r-1 pr-3 border-outlineHover'>
                                                        <Radio.Indicator
                                                            variant='outline'
                                                            color={COLOR_PRIMARY}
                                                            className="ml-auto border-r border-borderColor [&>svg]:!w-[0.75rem] [&>svg]:!h-[0.75rem]"
                                                        />
                                                    </div>
                                                    <Icon onClick={open} name={'ArrowsOutSimple'} color={''} weight='regular' className='' />
                                                </div>
                                                <div className='text-sm text-primaryText mt-2'>$<span className='text-2xl font-bold'>{convertIntoTwoDecimals(plan?.pricing?.yearly)}</span>&nbsp;/year <span className='text-secondaryText'>${convertIntoTwoDecimals(plan?.pricing?.monthly)}&nbsp;/month</span></div>
                                                <H5Text className='mt-3 font-normal'>{plan?.description}</H5Text>
                                            </Radio.Card>
                                            <PlanDetailsModal
                                                plan={plan}
                                                opened={opened}
                                                close={close}
                                            />
                                        </React.Fragment>
                                    )
                                }) : null
                            }
                        </Radio.Group>
                        <section className='flex flex-col items-center gap-4 pb-4 w-full'>
                            <Button
                                variant={!value ? 'disabled' : 'default'}
                                disabled={!value}
                                buttonDivClassName='w-full'
                                className='w-full mt-5'
                                onClick={onSubmit}
                            // loading={createUserMutation?.isPending}
                            >
                                Continue
                            </Button>
                        </section>
                    </MotionWrapper>
            }

        </section>
    )
}