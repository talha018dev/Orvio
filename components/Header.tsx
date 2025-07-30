'use client'

// import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/UI/Button'
import DropdownFly from '@/components/UI/DropdownFly'
import H3Text from '@/components/UI/H3Text'
import Icon from '@/components/UI/Icon'
import ImageComponent from '@/components/UI/ImageComponent'
import { COLOR_ERROR, COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import cookieHelper from '@/helpers/cookie-helper'
import usePersistStore from '@/helpers/usePersistStore'
import { useImageFit } from '@/hooks/useImageFit'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const Header = () => {

    const { objectFit, handleImageLoad } = useImageFit()
    const store = usePersistStore(useAuthStore, (state) => state)
    const pathname = usePathname();

    const router = useRouter()

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/forgot") || pathname.includes("/verify");
    const [open, setOpen] = useState(false);

    const logout = () => {
        cookieHelper.removeCookie('accessTokenSkyhaus')
        cookieHelper.removeCookie('refreshTokenSkyhaus')
        store?.setUserInfo(undefined)
        router.push('/login')
    }

    if(pathname?.includes('login')){
        return
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="landing"
        >
            {store?.userInfo?.token?.accessToken ? <Sidebar open={open} setOpen={setOpen} /> : null}
            <div className="fixed h-20 w-screen top-0 left-0 z-[10000]  bg-pageBgColor">
                <div className="flex items-end mt-auto h-full gap-1 max-w-(--max-width) mx-auto px-4 pb-2">
                    {
                        store?.userInfo?.token?.accessToken ?
                            <div
                                onClick={() => setOpen((pv) => !pv)}
                                className="cursor-pointer transition-colors mr-1 hover:bg-slate-100"
                            >
                                <div className="flex items-center">
                                    {
                                        <div
                                            className="text-xs font-medium"
                                        >
                                            <Icon name={'List'} color={COLOR_PRIMARY_TEXT} />
                                        </div>
                                    }
                                </div>
                            </div> : null
                    }
                    {/* <ImageComponent src={'/logo.svg'} alt={'logo'} className="size-4.5 relative bottom-[2px]" width={''} height={''} /> */}
                    {/* <h2>Orvio</h2> */}
                    <div className="font-semibold text-sm text-primaryText">Orvio</div>
                    {
                        store?.userInfo?.token?.accessToken ?
                            <section className='ml-auto'>
                                <DropdownFly
                                    href="#"
                                    flyoutContentParentClassName='min-w-[250px] left-6 top-7 -translate-x-1/2 rounded-lg shadow-sm p-4'
                                    FlyoutContent={({ onClose }) => {
                                        return (
                                            <div>
                                                <H3Text>{store?.userInfo?.user?.name}</H3Text>
                                                <div className='text-xs text-secondaryText mt-1'>{store?.userInfo?.user?.role}</div>
                                                <Link
                                                    onClick={() => onClose()}
                                                    href={`/profile/${store?.userInfo?.user?._id}/details`}
                                                    className='flex items-center gap-2 mt-7 cursor-pointer mb-6'
                                                >
                                                    <Icon name={'User'} color={COLOR_SECONDARY_TEXT} fontSize={14} />
                                                    <H3Text>My Profile</H3Text>
                                                    <div className='ml-auto'>
                                                        <Icon name={'CaretRight'} color={COLOR_SECONDARY_TEXT} fontSize={14} />
                                                    </div>
                                                </Link>
                                                <Button
                                                    onClick={() => {
                                                        onClose()
                                                        logout()
                                                    }}
                                                    variant='outline'
                                                    className='flex items-center gap-2 text-errorColor border-errorColor'
                                                >
                                                    <Icon name={'SignOut'} color={COLOR_ERROR} fontSize={14} />
                                                    <H3Text className='text-errorColor'>Logout</H3Text>
                                                </Button>
                                            </div>
                                        )
                                    }}
                                >
                                    <ImageComponent
                                        src={store?.userInfo?.user?.avatar ?? '/avatar.svg'}
                                        onLoad={handleImageLoad}
                                        imageClassName={`rounded-full ${objectFit}`}
                                        alt={'avatar'}
                                        width={'w-6'}
                                        height={'h-6'}
                                    />
                                </DropdownFly>
                            </section> : null
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default Header