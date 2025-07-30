import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reelsync.io Login Page",
  description: "Reelsync.io Login Page",
}
const ForgotPasswordPage = () => {
  return (
    <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center'>
      <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
        <ForgotPasswordForm />
      </main>
    </div>
  )
}

export default ForgotPasswordPage;
