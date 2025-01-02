import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'
  const origin = requestUrl.origin

  if (code) {
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
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error en el intercambio de código:', error)
        return NextResponse.redirect(`${origin}/error?message=${encodeURIComponent(error.message)}`)
      }

      // Redirigir al usuario a la página que intentaba acceder o al dashboard
      return NextResponse.redirect(`${origin}${next}`)
    } catch (error) {
      console.error('Error en el proceso de autenticación:', error)
      return NextResponse.redirect(`${origin}/error`)
    }
  }

  // Si no hay código, redirigir a la página de inicio de sesión
  return NextResponse.redirect(`${origin}/iniciar-sesion`)
}
