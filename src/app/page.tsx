import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/ui/button'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={150}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Bienvenido a ISA
          </h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Sistema de autenticación seguro con Next.js y Supabase
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link href="/iniciar-sesion" className="w-full">
            <Button className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/registro" className="w-full">
            <Button variant="outline" className="w-full">
              Crear Cuenta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
