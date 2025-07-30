'use client'

import H1Text from "@/components/UI/H1Text";
import Icon from "@/components/UI/Icon";
import { COLOR_PRIMARY, COLOR_PRIMARY_TEXT } from "@/constants/colorConstants";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { capitalizeFirstLetter } from "@/helpers/functionHelpers";
import usePersistStore from "@/helpers/usePersistStore";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Sidebar = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  const store = usePersistStore(useAuthStore, (state) => state)
  const sidebarRef = useRef(null)
  useClickOutside(sidebarRef, () => setOpen(false))

  const pathname = usePathname()
  // const [selected, setSelected] = useState(capitalizeFirstLetter(pathname?.replace('/', '')))
  const [selected, setSelected] = useState('')

  const superAdminMenuItems = ([
    { id: uuidv4(), name: 'General', type: 'tag' },
    { id: uuidv4(), name: 'Template', link: '/board', icon: 'Rows', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Vendors', link: '/vendors', icon: 'BuildingOffice', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Projects', link: '/projects?currentTab=Active', icon: 'StackPlus', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Clients', link: '/clients', icon: 'Users', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Analytics', link: '/analytics', icon: 'ChartPieSlice', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Settings', type: 'tag' },
    { id: uuidv4(), name: 'Users', link: '/users', icon: 'UsersThree', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Roles', link: '/roles', icon: 'UserList', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Stages', link: '/stages', icon: 'RowsPlusBottom', type: 'menuItem', status: 'enabled' },
  ]) as const

  const vendorAdminMenuItems = ([
    { id: uuidv4(), name: 'General', type: 'tag' },
    { id: uuidv4(), name: 'Template', link: '/board', icon: 'Rows', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Vendors', link: '/vendors', icon: 'BuildingOffice', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Projects', link: '/projects?currentTab=Active', icon: 'StackPlus', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Clients', link: '/clients', icon: 'Users', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Analytics', link: '/analytics', icon: 'ChartPieSlice', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Settings', type: 'tag' },
    { id: uuidv4(), name: 'Users', link: '/users', icon: 'UsersThree', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Roles', link: '/roles', icon: 'UserList', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Stages', link: '/stages', icon: 'RowsPlusBottom', type: 'menuItem', status: 'enabled' },
  ]) as const

  const clientMenuItems = ([
    { id: uuidv4(), name: 'General', type: 'tag' },
    { id: uuidv4(), name: 'Activity', link: '/activity', icon: 'ListChecks', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Projects', link: '/projects', icon: 'StackPlus', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Users', link: '/users', icon: 'UsersThree', type: 'menuItem', status: 'enabled' },
    { id: uuidv4(), name: 'Community', link: '/community', icon: 'GlobeSimple', type: 'menuItem', status: 'disabled' },
    { id: uuidv4(), name: 'Help Center', link: '/help-center', icon: 'Question', type: 'menuItem', status: 'disabled' },
  ]) as const

  const currentMenu =
    store?.userInfo?.user?.role === 'Super Admin' ? superAdminMenuItems :
      clientMenuItems

  useEffect(() => {
    if (store?.userInfo?.user?.role === 'Super Admin') {
      setSelected('Template')
    } else {
      setSelected('Activity')
    }
  }, [store?.userInfo?.user?.role])

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          onClick={() => setOpen(false)}
          className='bg-slate-900/20 backdrop-blur z-[100000] p-8 w-full h-screen fixed inset-0 grid place-items-center overflow-y-scroll'
        >
          <motion.nav
            initial={{ x: -400 }}
            animate={{ x: open ? 0 : -400 }}
            exit={{ x: -400 }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={cn("fixed w-full max-w-[400px] top-0 left-0 h-screen mt-auto gap-1 mx-auto px-4", { 'z-[100] bg-white border-r-1 border-borderColor': open }, { 'z-[-100] w-[0px]': !open })}
          >
            {
              open ?
                <div className="flex items-center gap-2 mt-14 cursor-pointer" onClick={() => setOpen((pv: boolean) => !pv)}>
                  <Icon name={"TextOutdent"} color={COLOR_PRIMARY} />
                  <H1Text>Menu</H1Text>
                </div> : null
            }
            <div className="space-y-2 mt-9 text-primaryText">
              {
                currentMenu?.map(item => {
                  return (
                    <div key={item?.id}>
                      {
                        item?.type === 'tag' ? <div className={cn("text-xs text-secondaryText ml-4 mt-8")}>{item?.name}</div> :
                          <div key={item?.name} className="relative">
                            {
                              item?.status === 'disabled' ?
                                <div className="absolute bg-white/70 w-full h-full left-0 top-0 rounded-full cursor-not-allowed"></div> : null
                            }
                            <Link
                              href={item?.link}
                              onClick={() => {
                                setSelected(item?.name)
                                setOpen(false)
                              }}
                              className={cn("flex items-center  group gap-2 py-3 px-4 transition duration-300 rounded-full hover:bg-primaryHover hover:text-white", { 'bg-primaryHover text-white': selected === item?.name })}
                            >
                              <Icon className={cn("group-hover:text-white text-primaryText transition duration-300", { 'text-white': selected === item?.name },)} color={COLOR_PRIMARY_TEXT} name={item?.icon} weight={selected === item?.name ? 'fill' : "regular"} />
                              <div>{item?.name}</div>
                            </Link>
                          </div>
                      }
                    </div>
                  )
                })
              }
            </div>
          </motion.nav>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Sidebar;
