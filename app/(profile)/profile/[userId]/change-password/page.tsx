import ChangePasswordForm from '@/features/profile/components/ChangePasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Reelsync.io Change Password Page",
    description: "Reelsync.io Change Password Page",
}
const ChangePasswordPage = async ({params}: {params: any}) => {
    const {userId} = await params

    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center'>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <ChangePasswordForm userId={userId} />
            </main>
        </div>
    )
}

export default ChangePasswordPage;
