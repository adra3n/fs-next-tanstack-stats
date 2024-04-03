import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TanstackProvider } from '@/utils/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Influencer Stats (Next,Tanstack)',
  description: 'Developed by Sertac Kocagil',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*provider for tanstack as wrapper*/}
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  )
}
