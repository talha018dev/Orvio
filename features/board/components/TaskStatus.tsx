import { cn } from '@/utils/tailwind-merge'
import { ClassNameValue } from 'tailwind-merge'

const TaskStatus = ({ status, className = '', date = '' }: { status: 'todo' | 'in progress' | 'done', className?: ClassNameValue, date?: string }) => {
    return (
        <div className={cn
            ('bg-outlineHover py-1 px-2 rounded-full text-xs',
                className,
                { 'bg-inProgressColor text-inProgressText': status === 'in progress' },
                { 'bg-completedColor text-completedText': status === 'done' },

            )}>
            {
                status === 'todo' ? 'To Do' : status === 'in progress' ? 'In Progress' : 'Done'
            }&nbsp;
            {date ? `(${date})` : null}
        </div>
    )
}

export default TaskStatus