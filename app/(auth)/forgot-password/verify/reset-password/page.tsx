import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: "Orvio Reset Password Page",
    description: "Orvio Reset Password Page",
}
const ResetPasswordPage = async () => {
    const token =  (await cookies()).get('accessToken')

    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center'>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <ResetPasswordForm />
            </main>
        </div>
    )
}

export default ResetPasswordPage;
