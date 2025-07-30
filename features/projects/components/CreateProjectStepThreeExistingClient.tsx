'use client'

import MotionWrapper from '@/components/MotionWrapper'
import ReactSelect from '@/components/UI/ReactSelect'
import ClientDetailsCard from '@/features/users/components/ClientDetailsCard'
import { getClientDetailsQueryOptions, getClientsListQueryOptions } from '@/features/users/queryOptions/userQueryOptions'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'

type CreateProjectStepThreeExistingClientProps = {
    methods: any
    clientIdFromApi?: string
}

const CreateProjectStepThreeExistingClient = ({ methods, clientIdFromApi }: CreateProjectStepThreeExistingClientProps) => {
    const pathname = usePathname()

    const [clientId, setClientId] = useState<string | null>(clientIdFromApi ?? null)

    const { data: clientsList } = useQuery(getClientsListQueryOptions())
    const { data: clientDetails, isFetching: clientDetailsLoader } = useQuery(getClientDetailsQueryOptions(clientId))

    useEffect(() => {
        if (methods?.watch('client')?.value) {
            setClientId(methods?.watch('client')?.value)
        }
    }, [methods?.watch('client')?.value])

    useEffect(() => {
        if (clientDetails) {
            methods.setValue('email', clientDetails?.email)
            methods.setValue('name', clientDetails?.name)
            methods.setValue('phone', `${clientDetails?.phone}`)
            methods.setValue('address', clientDetails?.address?.addressLine)
            methods.setValue('zipCode', clientDetails?.address?.zipCode)
            methods.setValue('city', clientDetails?.address?.city)
            methods.setValue('state', clientDetails?.address?.state)
            methods.setValue('country', clientDetails?.address?.country)
        }
    }, [clientDetails])

    return (
        <MotionWrapper>
            <FormProvider {...methods}>
                <ReactSelect
                    name={'client'}
                    placeholder={"Select"}
                    label={'Select Client'}
                    listItems={clientsList?.map(client => {
                        return { value: client?._id, label: client?.name, email: client?.email }
                    })}
                    methods={methods}
                    className='mt-4'
                    useCustomOption={true}
                />
                {
                    clientDetailsLoader ? <div className='h-25 w-full bg-pageBgColor rounded-lg animate-pulse'></div> :
                        !clientDetailsLoader && clientDetails ?
                            <ClientDetailsCard primary={pathname?.includes('create-client') ? false : true} clientDetails={clientDetails} /> : null
                }
            </FormProvider>
        </MotionWrapper>
    )
}

export default CreateProjectStepThreeExistingClient