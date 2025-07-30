'use client'

import { Button } from '@/components/UI/Button';
import H2Text from '@/components/UI/H2Text';
import Icon from '@/components/UI/Icon';
import { RadioGroup, RadioGroupItem } from '@/components/UI/RadioGroup';
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryState } from "nuqs";
import { useState } from 'react';

const VendorsFilter = () => {
  const [status, setStatus] = useQueryState<"active" | "inactive" | "all">("status", {
    defaultValue: "active",
    parse: (value): "active" | "inactive" | "all" =>
      ["active", "inactive", "all"].includes(value as any) ? (value as "active" | "inactive" | "all") : "active",
    serialize: (value) => value,
  })
  const [drawerVisibility, setDrawerVisibility] = useQueryState("filterDrawer", { defaultValue: 'Closed' })

  const [radioValue, setRadioValue] = useState<"active" | "inactive" | "all">(status)

  const resetFilter = () => {
    setStatus('active')
    setRadioValue('active')
    setDrawerVisibility('Closed')
  }
  const cancelFilter = () => {
    setRadioValue(status)
    setDrawerVisibility('Closed')
  }
  const applyFilter = () => {
    setStatus(radioValue)
    setDrawerVisibility('Closed')
  }

  return (
    <>
      <div onClick={() => setDrawerVisibility('Open')} className="ml-auto bg-white rounded-full p-2 border-1 border-borderColor cursor-pointer hover:border-primary focus:border-primary transition-all duration-300">
        <Icon className="" name={"Faders"} color={COLOR_PRIMARY_TEXT} fontSize={16} />
      </div>
      <AnimatePresence>
        {
          drawerVisibility === 'Open' ?
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => cancelFilter()}
              className='fixed w-[100dvw] left-0 inset-0 z-50 grid place-items-end cursor-pointer'
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-full bottom-0 cursor-default'
              >
                <div className='max-w-(--max-width) mx-auto p-4 wrap'>
                  <div className='flex items-center'>
                    <H2Text>Filter</H2Text>
                    <div className='ml-auto cursor-pointer' onClick={() => cancelFilter()}>
                      <Icon name={'X'} color={COLOR_PRIMARY_TEXT} />
                    </div>
                  </div>
                  <div className='text-secondaryText text-xs mt-8'>Status</div>
                  <RadioGroup
                    className='flex flex-col gap-4 text-sm text-primaryText mt-2 mb-4'
                    defaultValue={radioValue ?? status}
                    value={radioValue ?? status}
                    onValueChange={(value: 'active' | 'inactive' | 'all') => {
                      // setStatus(value)
                      setRadioValue(value)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" className='border-primaryText' />
                      <div>Show only inactive template</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" className='border-primaryText'  />
                      <div>Show both active and inactive template</div>
                    </div>
                  </RadioGroup>
                  <section className='flex items-center gap-3 mt-12'>
                    <Button className='border-primaryText' disabled={radioValue === 'active'} onClick={resetFilter} variant={radioValue === 'active' ? 'disabledOutline' : 'outline'}>Reset All</Button>
                    <Button onClick={cancelFilter} buttonDivClassName='ml-auto' variant={'destructiveOutline'}>Cancel</Button>
                    <Button onClick={applyFilter}>Apply</Button>
                  </section>
                </div>
              </motion.div>
            </motion.div>
            : null
        }
      </AnimatePresence>
    </>
  )
}

export default VendorsFilter