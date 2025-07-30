import EmptyListView from '@/components/EmptyListView';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/UI/Accordion';
import CardSkeleton from '@/components/UI/CardSkeleton';
import H1Text from '@/components/UI/H1Text';
import { StageDetailsType } from '@/features/stages/types/types';
import { ChevronDown } from 'lucide-react';

type StageDetailsAccordionProps = {
    stageDetails: StageDetailsType | undefined
    stageDetailsLoader: boolean
}

const StageDetailsAccordion = ({ stageDetails, stageDetailsLoader }: StageDetailsAccordionProps) => {

    if (stageDetailsLoader) return (
        <section className='flex w-full flex-col gap-4 mt-14'>
            {
                [1, 2, 3, 4].map((item) => <CardSkeleton key={item} className='bg-white h-14' childClassName='h-2' />)
            }
        </section>
    )
    if (!stageDetails?.stages?.length) return <EmptyListView text={'No stage found'} />

    return (
        <section className='mt-4'>
            <H1Text className='font-normal mb-4'>Stages</H1Text>
            <Accordion
                className='flex w-full flex-col gap-4'
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                {
                    stageDetails?.stages?.length ? stageDetails?.stages?.map(stage => {
                        return (
                            <AccordionItem key={stage?._id} value={stage?._id} className='py-4 px-2 rounded-lg bg-white '>
                                <AccordionTrigger className='w-full text-left text-primaryText '>
                                    <div className='flex items-center justify-between'>
                                        <div className='break-all'>{stage?.name}</div>
                                        <ChevronDown className='h-4 w-4 min-w-4 text-primaryText transition-transform duration-200 group-data-expanded:-rotate-180 ' />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className='flex flex-col gap-2 mt-4'>
                                    {
                                        stage?.tasks?.length ? stage?.tasks?.map(task => {
                                            return (
                                                <div key={task?._id} className='bg-pageBgColor text-sm text-primaryText rounded-lg py-2 px-3 break-all'>{task?.name}</div>
                                            )
                                        }) : <EmptyListView text={'No task found'} className='mt-0 py-6' />
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        )
                    }) : null
                }
            </Accordion>
        </section>
    )
}

export default StageDetailsAccordion