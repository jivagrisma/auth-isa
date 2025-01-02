import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crea un cliente de Supabase para el servidor
 * @param cookieStore - Almacén de cookies de Next.js
 * @returns Cliente de Supabase configurado
 */
export async function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // El error puede ocurrir si intentamos modificar las cookies después de enviar la respuesta
            console.error('Error al establecer cookie:', error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            console.error('Error al eliminar cookie:', error)
          }
        },
      },
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
        storage: {
          getItem: (key: string) => {
            const value = cookieStore.get(key)?.value
            return value ? JSON.parse(value) : null
          },
          setItem: (key: string, value: string) => {
            cookieStore.set(key, value)
          },
          removeItem: (key: string) => {
            cookieStore.delete(key)
          },
        },
      },
    }
  )
}

/**
 * Obtiene las URLs de redirección para la autenticación
 * @returns Objeto con las URLs de redirección
 */
export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Establece esto en producción
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automático en Vercel
    'http://localhost:3000/'

  // Asegurarse de que la URL tenga el formato correcto
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`

  return {
    baseURL: url,
    authCallbackURL: `${url}auth/callback`,
  }
}
