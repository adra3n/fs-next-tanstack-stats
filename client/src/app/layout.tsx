import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TanstackProvider } from '@/utils/providers'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Influencer Card',
  description: 'Created by Sertac Kocagil',
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
