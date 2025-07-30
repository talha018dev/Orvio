import MotionWrapper from '@/components/MotionWrapper';
import { Button } from '@/components/UI/Button';
import H2Text from '@/components/UI/H2Text';
import H5Text from '@/components/UI/H5Text';
import Icon from '@/components/UI/Icon';
import { COLOR_PRIMARY } from '@/constants/colorConstants';
import PlanDetailsModal from '@/features/vendors/components/VendorSetup/PlanDetailsModal';
import PlansListSkeleton from '@/features/vendors/components/VendorSetup/PlansListSkeleton';
import { vendorSelfSignUp } from '@/features/vendors/queryFunctions/vendorQueryFunctions';
import { getPlansListQueryOptions } from '@/features/vendors/queryOptions/vendorQueryOptions';
import { VendorSignUpInfoType } from '@/features/vendors/types/types';
import { convertIntoTwoDecimals } from '@/helpers/functionHelpers';
import { Radio } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useState } from 'react';
// import classes from './Demo.module.css';

type Step4Props = {
    vendorFormData: any
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

export default function Step5({ vendorFormData, setVendorFormData, setCurrentStep }: Step4Props) {
    const { data: plansList, isFetching: plansListLoader } = useQuery(getPlansListQueryOptions())
    const vendorSelfSignUpMutation = useMutation<any, any, any, any>({ mutationFn: vendorSelfSignUp })

    const [value, setValue] = useState<string | null>(null)
    const [opened, { open, close }] = useDisclosure(false)

    const onSubmit = () => {

        vendorSelfSignUpMutation.mutate(vendorFormData, {
            onSuccess(data, variables, context) {
                setCurrentStep(6)
            },
            onError(error, variables, context) {
                
            },
        })

    }

    return (
        <section className=''>
            <H2Text className='mb-3'>Selected Plan</H2Text>
            {
                <MotionWrapper>

                    <React.Fragment key={vendorFormData?.plan?._id}>
                        <Radio.Card
                            className={'!p-3 data-[checked=true]:!border-primary !rounded-xl'}
                            radius="md"
                            value={vendorFormData?.plan?._id}
                        >
                            <div className='flex items-center gap-3'>
                                <div>{vendorFormData?.plan?.name}</div>
                                <div className='ml-auto border-r-1 pr-3 border-outlineHover'>

                                </div>
                                <Icon onClick={open} name={'ArrowsOutSimple'} color={''} weight='regular' className='' />
                            </div>
                            <div className='text-sm text-primaryText mt-2'>$<span className='text-2xl font-bold'>{convertIntoTwoDecimals(vendorFormData?.plan?.pricing?.yearly)}</span>&nbsp;/year <span className='text-secondaryText'>${convertIntoTwoDecimals(vendorFormData?.plan?.pricing?.monthly)}&nbsp;/month</span></div>
                            <H5Text className='mt-3 font-normal'>{vendorFormData?.plan?.description}</H5Text>
                        </Radio.Card>
                        <PlanDetailsModal
                            plan={vendorFormData?.plan}
                            opened={opened}
                            close={close}
                        />
                    </React.Fragment>
                    <section className='flex flex-col items-center gap-4 pb-4 w-full'>
                        <Button
                            buttonDivClassName='w-full'
                            className='w-full mt-5'
                            onClick={onSubmit}
                            loading={vendorSelfSignUpMutation?.isPending}
                        >
                            Continue
                        </Button>
                    </section>
                </MotionWrapper>
            }

        </section>
    )
}