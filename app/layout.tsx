import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Operator Path — The Operating System for Amazon Resellers',
    template: '%s | Operator Path',
  },
  description:
    'Learn the Amazon resale model for free. Execute with Pro tools — supplier database, AI prompts, weekly product picks, and a community of active sellers.',
  keywords: [
    'Amazon resale',
    'Amazon FBA',
    'Amazon seller training',
    'resale business',
    'wholesale resale',
    'Amazon course',
    'supplier database',
  ],
  authors: [{ name: 'Operator Path' }],
  creator: 'Operator Path',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Operator Path',
    title: 'Operator Path — The Operating System for Amazon Resellers',
    description:
      'Learn the Amazon resale model for free. Execute with Pro tools — supplier database, AI prompts, weekly product picks, and community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Operator Path — The Operating System for Amazon Resellers',
    description: 'Learn the Amazon resale model for free. Execute with Pro tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-brand-dark text-brand-text antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
