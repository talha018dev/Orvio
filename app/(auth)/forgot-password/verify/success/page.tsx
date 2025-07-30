import SetupSuccess from "@/features/auth/components/SetupSuccess";

const SuccessPage = () => {
    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center [--header-height:5rem] [--max-width:640px]'>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <SetupSuccess />
            </main>
        </div>
    );
};

export default SuccessPage;