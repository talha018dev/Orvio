import LoginForm from '@/features/auth/components/LoginForm';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: "Reelsync.io Login Page",
    description: "Reelsync.io Login Page",
}
const LoginPage = async () => {
    const token =  (await cookies()).get('accessToken')
    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center '>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <LoginForm />
            </main>
        </div>
    )
}

export default LoginPage;
