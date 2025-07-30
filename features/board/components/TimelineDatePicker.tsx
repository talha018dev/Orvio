import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import { cn } from '@/utils/tailwind-merge'
import moment from 'moment'
import React from 'react'
import DatePicker from 'react-datepicker'

type TimelineDatePickerProps = {
    startDate: Date | null | undefined
    setStartDate: (date: Date | null | undefined) => void
    endDate: Date | null | undefined
    setEndDate: (date: Date | null | undefined) => void
}

const TimelineDatePicker = ({ startDate, setStartDate, endDate, setEndDate }: TimelineDatePickerProps) => {

    const handleBlur = () => {
        if (startDate && !endDate) {
            setStartDate(undefined)
            setEndDate(undefined)
        }
    }

    const handleDateFilter = (dateRange: [Date | null, Date | null]) => {
        const [startDate, endDate] = dateRange
        setStartDate(startDate)
        setEndDate(endDate)
    }
    //@ts-ignore
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <div className='relative'>
            <div className='absolute left-0 top-3'>
                <Icon name={'Calendar'} color={COLOR_PRIMARY_TEXT} weight='regular' />
            </div>
            <input
                onClick={onClick}
                // ref={ref}
                value={value}
                placeholder="Select timeline"
                className="pl-6 react-datepicker-ignore-onclickoutside h-10 text-primaryText !w-full focus-visible:outline-transparent focus-visible:outline-0"
                readOnly
            />
        </div>
    ))

    return (
        <section className='mt-6'>
            <label className='text-secondaryText text-xs'>Timeline</label>
            <div
                //  className='dateRangePicker fullWidthCalendar relative w-full md:w-auto bg-pageBgColor'
                className={cn(
                    "dateRangePicker fullWidthCalendar w-full md:w-auto flex h-10 border-b-[1px] border-borderColor hover:border-primary focus:border-primary !focus-visible:outline-transparent !focus-visible:outline-0 bg-pageBgColor transition-all duration-300 !outline-0  mt-1 px-3 pl-0 text-sm placeholder:text-placeholderText disabled:cursor-not-allowed disabled:opacity-50",
                    // { "border-b-[1px] border-errorColor hover:border-errorColor focus:border-errorColor focus-visible:ring-errorColor/50": (error?.message || apiError) },
                )}
            >
                <DatePicker
                    className=''
                    // swapRange
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => handleDateFilter(update)}
                    isClearable={false}
                    calendarClassName={cn('showTwoMonthVertical !flex !flex-col bg-white timelineDatePicker')}
                    placeholderText="Filter by start - end date"
                    dateFormat="MMM d"
                    icon={<Icon name={"Calendar"} color={'#71717A'} weight='regular' fontSize={20} />}
                    monthsShown={2}
                    popperPlacement="bottom-start"
                    popperModifiers={[
                        {
                            name: "myModifier",
                            fn(state) {
                                // Do something with the state
                                return state;
                            },
                        },
                    ]}

                    onCalendarClose={() => { handleBlur() }}
                    showPopperArrow={false}

                    customInput={<CustomInput />}
                    renderCustomHeader={({ date, decreaseMonth, increaseMonth, customHeaderCount }) => (
                        <div className="flex items-center px-2">
                            {customHeaderCount === 0 && (
                                <button onClick={decreaseMonth} className='border-1 border-[#E2E8F0] rounded-lg p-1.5 cursor-pointer hover:bg-primaryText transition-all duration-300'>
                                    <Icon name="CaretLeft" color={COLOR_SECONDARY_TEXT} fontSize={12} />
                                </button>
                            )}
                            {customHeaderCount === 1 && (
                                <button onClick={increaseMonth} className='border-1 border-[#E2E8F0] rounded-lg p-1.5 opacity-0 pointer-events-none'>
                                    <Icon name="CaretLeft" color={COLOR_SECONDARY_TEXT} fontSize={12} />
                                </button>
                            )}
                            <span className="text-sm font-medium mx-auto w-full">
                                {
                                    customHeaderCount === 0 ?
                                        moment(date)?.format('MMMM yyyy') : moment(date).add(1, 'month').format('MMMM yyyy')
                                }
                            </span>
                            {customHeaderCount === 0 && (
                                <button onClick={decreaseMonth} className='border-1 border-[#E2E8F0] rounded-lg p-1.5  opacity-0 pointer-events-none'>
                                    <Icon name="CaretRight" color={COLOR_SECONDARY_TEXT} fontSize={12} />
                                </button>
                            )}
                            {customHeaderCount === 1 && (
                                <button onClick={increaseMonth} className='border-1 border-[#E2E8F0] rounded-lg p-1.5 cursor-pointer hover:bg-primaryText transition-all duration-300'>
                                    <Icon name="CaretRight" color={COLOR_SECONDARY_TEXT} fontSize={12} />
                                </button>
                            )}
                        </div>
                    )}

                />
            </div>
        </section>
    )
}

export default TimelineDatePicker