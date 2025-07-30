import H3Text from '@/components/UI/H3Text'
import { RadioGroup, RadioGroupItem } from '@/components/UI/RadioGroup'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type ClientTypeRadioGroupProps = {
    clientType: 'new' | 'existing'
    setClientType: Dispatch<SetStateAction<"new" | "existing">>
    methods: any
}

const ClientTypeRadioGroup = ({clientType, setClientType,methods }: ClientTypeRadioGroupProps) => {
    return (
        <>
            <H3Text className='mt-4'>Type</H3Text>
            <RadioGroup
                className='flex items-center gap-2 text-sm text-primaryText mt-2 mb-4'
                defaultValue="new"
                value={clientType}
                onValueChange={(value: 'new' | 'existing') => {
                    setClientType(value)
                    methods?.reset()
                }}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="r1" />
                    <div>New Client</div>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="r1" />
                    <div>Existing Client</div>
                </div>
            </RadioGroup>
        </>
    )
}

export default ClientTypeRadioGroup