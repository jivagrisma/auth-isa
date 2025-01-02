import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import Image from 'next/image'

export default async function Dashboard() {
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

  if (!session) {
    redirect('/iniciar-sesion')
  }

  async function signOut() {
    'use server'
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
    await supabase.auth.signOut()
    redirect('/iniciar-sesion')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                ISA Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <form action={signOut}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Información del Usuario
              </h2>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>ID:</strong> {session.user.id}</p>
                <p>
                  <strong>Último inicio de sesión:</strong>{' '}
                  {new Date(session.user.last_sign_in_at || '').toLocaleString('es-ES')}
                </p>
                <p>
                  <strong>Método de autenticación:</strong>{' '}
                  {session.user.app_metadata.provider === 'google'
                    ? 'Google'
                    : 'Email y contraseña'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const metadata = {
  title: 'Dashboard | ISA Autenticación',
  description: 'Panel de control del usuario',
}
