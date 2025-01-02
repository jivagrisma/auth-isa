import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { AuthForm } from '../../components/auth/AuthForm'

export default async function SignIn() {
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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <AuthForm view="sign-in" />
    </div>
  )
}

export const metadata = {
  title: 'Iniciar Sesión | ISA Autenticación',
  description: 'Inicia sesión en tu cuenta de ISA',
}
