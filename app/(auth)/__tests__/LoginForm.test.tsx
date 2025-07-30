'use client';

import LoginForm from '@/features/auth/components/LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/features/auth/queryFunctions/loginQueryFunctions', () => ({ login: jest.fn() }));
jest.mock('@/helpers/cookie-helper', () => ({ setCookie: jest.fn() }));
jest.mock('@/features/auth/store/useAuthStore', () => ({ useAuthStore: jest.fn() }));

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    useSearchParams: () => new URLSearchParams(''),
  }));

const queryClient = new QueryClient();

describe('LoginForm', () => {
    let mockRouter;
    // beforeEach(() => {
    //     mockRouter = { push: jest.fn() };
    //     useRouter.mockReturnValue(mockRouter);
    //     useAuthStore.mockReturnValue({ setUserInfo: jest.fn() });
    // });

    

    test('renders login form elements', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        // expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    });

    // test('disables submit button when fields are empty', () => {
    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <LoginForm />
    //         </QueryClientProvider>
    //     );

    //     const button = screen.getByText('Sign In');
    //     expect(button).toBeDisabled();
    // });

    // test('calls login mutation on valid form submit', async () => {
    //     login.mockResolvedValue({ token: { accessToken: 'test-token', refreshToken: 'refresh-token' } });
        
    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <LoginForm />
    //         </QueryClientProvider>
    //     );

    //     fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    //     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        
    //     const button = screen.getByText('Sign In');
    //     expect(button).not.toBeDisabled();
        
    //     await act(async () => {
    //         fireEvent.click(button);
    //     });

    //     await waitFor(() => expect(login).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com', password: 'password123' })));
    // });

    // test('handles login error and displays notification', async () => {
    //     login.mockRejectedValue({ data: { message: 'Invalid credentials' } });
        
    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <LoginForm />
    //         </QueryClientProvider>
    //     );

    //     fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    //     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        
    //     await act(async () => {
    //         fireEvent.click(screen.getByText('Sign In'));
    //     });

    //     await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
    // });
});
