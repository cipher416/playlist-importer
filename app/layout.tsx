import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextSessionProvider from '@/app/_providers/NextSessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextThemeProvider from './_providers/NextThemeProvider'
import ToastProvider from './_providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className}>
        <NextThemeProvider>
          <ToastProvider>
            <NextSessionProvider session={session}>
              {children}
            </NextSessionProvider>
          </ToastProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
