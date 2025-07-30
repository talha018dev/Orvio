import { Button } from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Input from '@/components/UI/Input'
import ReactSelect from '@/components/UI/ReactSelect'
import { COLOR_ERROR } from '@/constants/colorConstants'
import { addProjectFileLinks } from '@/features/projects/queryFunctions/projectQueryFunctions'
import { addFileLinkSchema } from '@/features/projects/schemas/fileLinkSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { FieldValues, FormProvider, useFieldArray, useForm } from 'react-hook-form'

type AddFileLinkFormProps = {
    projectId: string
    setIsOpen: any
    refetchProjectDetails: any
}

const AddFileLinkForm = ({ projectId, setIsOpen, refetchProjectDetails }: AddFileLinkFormProps) => {
    const queryClient = new QueryClient()

    const defaultValues = {
        expirationDate: '', files: [{ url: '' }]
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(addFileLinkSchema)
    formConfig["defaultValues"] = defaultValues
    const methods: any = useForm(formConfig)

    const addProjectFileLinksMutation = useMutation({ mutationFn: addProjectFileLinks })
    const { fields, append, remove } = useFieldArray({ control: methods?.control, name: "files" })

    const expiredOptions = [
        { value: '3', label: 'Expired in 3 Days' },
        { value: '7', label: 'Expired in 7 Days' },
        { value: '15', label: 'Expired in 15 Days' },
        { value: '30', label: 'Expired in 30 Days' },
    ]

    const allFieldsEmpty = () => {
        const { expirationDate, files } = methods.watch();
        const fileUrlEmpty = files?.some((file: any) => !file?.url)
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return !expirationDate || fileUrlEmpty || hasErrors
    };

    const onSubmit = (data: FieldValues) => {
        const updatedData = {
            projectId,
            expirationDate: data?.expirationDate?.value,
            files: data?.files
        }
        addProjectFileLinksMutation?.mutate(updatedData,
            {
                onSuccess: (data: any) => {
                    queryClient.invalidateQueries({ queryKey: ['getProjectDetails', projectId] });
                    refetchProjectDetails()
                    setIsOpen(false)
                },
                onError: (error: any) => {

                },
            }
        )
    }

    return (
        <>
            <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                <section>
                    <FormProvider {...methods}>
                        <ReactSelect
                            name={'expirationDate'}
                            placeholder={"Select"}
                            listItems={expiredOptions?.map(option => {
                                return { value: option?.value, label: option?.label }
                            })}
                            methods={methods}
                            className='mt-4'
                        />
                        {
                            fields?.map((field, index) => {
                                return (
                                    <div key={field?.id} className='flex items-start gap-2'>
                                        <Input name={`files.${index}.url`} placeholder={'Paste file link'} colorInverse={true} inputDivClassName='w-full' />
                                        {
                                            index != 0 ?
                                                <div onClick={() => remove(index)} className="cursor-pointer mt-5.5">
                                                    <Icon name={"Trash"} color={COLOR_ERROR} fontSize={16} />
                                                </div> : null
                                        }
                                    </div>
                                )
                            })
                        }
                        <Button
                            variant={'ghost'}
                            onClick={() => {
                                append({ url: '' })
                            }}
                        >
                            + Add Another Link
                        </Button>
                    </FormProvider>
                </section>
                <section className="flex items-center mt-6 gap-2">
                    <Button buttonDivClassName="mr-auto" onClick={() => setIsOpen(false)} variant={'outline'}>Cancel</Button>
                    <Button
                        buttonDivClassName="ml-auto"
                        variant={allFieldsEmpty() ? 'disabled' : 'default'}
                        disabled={allFieldsEmpty()}
                        loading={addProjectFileLinksMutation?.isPending}
                        type='submit'
                    >
                        Upload
                    </Button>
                </section>
            </form>
        </>
    )
}

export default AddFileLinkForm