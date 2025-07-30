import { Button } from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Input from '@/components/UI/Input'
import TextArea from '@/components/UI/TextArea'
import { COLOR_ERROR } from '@/constants/colorConstants'
import { useModalStore } from '@/store/useModalStore'
import { useFieldArray } from 'react-hook-form'

type StageCardProps = {
    stageField: any
    stageIndex: number
    stageRemove: any
    methods: any
}

const StageCard = ({ stageField, stageIndex, stageRemove, methods }: StageCardProps) => {
    const { fields: taskFields, append: taskAppend, remove: taskRemove } = useFieldArray({ control: methods?.control, name: `stage.${stageIndex}.tasks` })
    const { openModal, closeModal } = useModalStore()

    const deleteStageModal = (stageName: string, stageIndex: number) => {
        openModal(
            "Delete",
            <div>You're about to delete the <span className='text-primaryText break-all'>{stageName}</span> Stage. This will remove it from all upcoming projects. Are you sure you want to delete?</div>,
            "Keep",
            "Yes, Delete",
            () => {
                closeModal()
                stageRemove(stageIndex)
            }
        );
    };
    const deleteTaskModal = (taskName: string, taskIndex: number) => {
        openModal(
            "Delete",
            <div>You're about to delete the <span className='text-primaryText break-all'>{taskName}</span> Task. This will remove it from all upcoming projects. Are you sure you want to delete?</div>,
            "Keep",
            "Yes, Delete",
            () => {
                closeModal()
                taskRemove(taskIndex)
            }
        );
    };

    return (
        <div key={stageField.id} className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-4">
                <Input name={`stage.${stageIndex}.stageName`} placeholder="Stage" label="Stage" labelClassName='text-xs' colorInverse={true} inputDivClassName="w-full" inputPadding='pb-3' />
                <div
                    onClick={() => {
                        deleteStageModal(methods?.watch()?.stage[stageIndex]?.stageName, stageIndex)
                    }}
                    className="cursor-pointer mt-5.5 relative bottom-1"
                >
                    <Icon name="Trash" color={COLOR_ERROR} fontSize={16} />
                </div>
            </div>
            {
                taskFields.map((taskField, taskIndex) => (
                    <div key={taskField.id} className="flex items-center gap-4">
                        <TextArea
                            name={`stage.${stageIndex}.tasks.${taskIndex}.taskName`}
                            placeholder="Task"
                            label="Task"
                            labelClassName='text-xs'
                            colorInverse={true}
                            inputDivClassName="w-full"
                            inputPadding='pb-3'
                            textAreaClassName={'h-10 overflow-hidden focus:h-25 focus:overflow-auto'}
                        />
                        <div
                            onClick={() => {
                                deleteTaskModal(methods?.watch()?.stage[stageIndex]?.tasks[taskIndex]?.taskName, taskIndex)
                            }}
                            className="cursor-pointer mt-5.5 relative bottom-1"
                        >
                            <Icon name="Trash" color={COLOR_ERROR} fontSize={16} />
                        </div>
                    </div>
                ))
            }
            <Button
                variant="outline"
                onClick={() => taskAppend({ taskName: "" })}
            >
                + Add Task
            </Button>

        </div>

    )
}

export default StageCard