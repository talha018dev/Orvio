'use client'

import Stepper from '@/components/Stepper'
import Step1 from '@/features/vendors/components/VendorSetup/Step1'
import Step2 from '@/features/vendors/components/VendorSetup/Step2'
import Step3 from '@/features/vendors/components/VendorSetup/Step3'
import Step4 from '@/features/vendors/components/VendorSetup/Step4'
import Step5 from '@/features/vendors/components/VendorSetup/Step5'
import { vendorTokenVerification } from '@/features/vendors/queryFunctions/vendorQueryFunctions'
import { VendorSignUpInfoType } from '@/features/vendors/types/types'
import { useLogout } from '@/hooks/useLogout'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

type VendorSetupStepOneProps = {
    token: string | undefined
}

const VendorSetup = ({ token }: VendorSetupStepOneProps) => {
    const router = useRouter()
    const vendorSelfSignUpMutation = useMutation<any, any, any, any>({ mutationFn: vendorTokenVerification })

    const { logoutWithoutRedirect } = useLogout()

    useEffect(() => {
        logoutWithoutRedirect()
        vendorSelfSignUpMutation.mutate({ token }, {
            onSuccess(data, variables, context) {
                setCurrentStep(1)
            },
            onError(error, variables, context) {
                router.push(`/forgot-password/verify/expired`)
            },
        })
    }, [])


    const [email] = useQueryState("email", { defaultValue: '' })
    console.log(' VendorSetupStepOne - email:', email)

    const [currentStep, setCurrentStep] = useState(0)
    console.log(' VendorSetupStepOne - currentStep:', currentStep)

    const [vendorFormData, setVendorFormData] = useState<VendorSignUpInfoType>({
        vendorEmail: email,
        vendorName: undefined,
        vendorPhone: undefined,
        ein: undefined,
        email: undefined,
        name: undefined,
        phone: undefined,
        receiveUpdate: undefined,
        password: undefined,
        confirmPassword: undefined,
        plan: undefined,
        planId: undefined,
    })
    console.log(' VendorSetupStepOne - vendorFormData:', vendorFormData)

    return (
        <>
            <Stepper className='pt-8 pb-4' currentStep={currentStep} maxLength={5} />
            <section className='bg-white p-4 rounded-xl mt-4'>
                {
                    currentStep === 1 ?
                        <Step1
                            vendorFormData={vendorFormData}
                            setVendorFormData={setVendorFormData}
                            setCurrentStep={setCurrentStep}
                        /> :
                        currentStep === 2 ?
                            <Step2
                                setVendorFormData={setVendorFormData}
                                setCurrentStep={setCurrentStep}
                            /> :
                            currentStep === 3 ?
                                <Step3
                                    setVendorFormData={setVendorFormData}
                                    setCurrentStep={setCurrentStep}
                                /> :
                                currentStep === 4 ?
                                    <Step4
                                        setVendorFormData={setVendorFormData}
                                        setCurrentStep={setCurrentStep}
                                    /> :
                                    currentStep === 5 ?
                                        <Step5
                                            vendorFormData={vendorFormData}
                                            setVendorFormData={setVendorFormData}
                                            setCurrentStep={setCurrentStep}
                                        /> : null
                }
            </section>
        </>
    )
}

export default VendorSetup