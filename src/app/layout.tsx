import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: '%s | ISA Autenticación',
    default: 'ISA Autenticación',
  },
  description: 'Sistema de autenticación seguro con Next.js y Supabase',
  authors: [{ name: 'ISA' }],
  keywords: ['autenticación', 'seguridad', 'nextjs', 'supabase'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
