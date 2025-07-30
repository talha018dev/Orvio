import Header from "@/components/Header";
import GlobalModal from "@/components/UI/GlobalModal";
import GlobalNotifications from "@/components/UI/GlobalNotification";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from "react";
import Head from 'next/head'
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Reelsync.io",
  description: "Reelsync.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" {...mantineHtmlProps} className="bg-pageBgColor">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ColorSchemeScript />
      </Head>
      <body className={`${inter.className} antialiased text-primaryText bg-pageBgColor [--header-height:5rem] [--max-width:640px]`}>
        <Toaster position="top-center" expand={true} className="w-full bg-black text-white" />
        <ReactQueryProvider>
          <NuqsAdapter>
            <Header />
            <Suspense fallback={<div></div>}>
              <MantineProvider theme={{
                components: {
                  Checkbox: {
                    defaultProps: {
                    },
                  },
                },
              }}>
                {children}
              </MantineProvider>
            </Suspense>
            <GlobalModal />
            <GlobalNotifications />
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
