'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

interface AuthFormProps {
  view: 'sign-in' | 'sign-up'
}

export function AuthForm({ view }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (view === 'sign-up' && !acceptTerms) {
        throw new Error('Debes aceptar los términos y condiciones')
      }

      const { error } = view === 'sign-in'
        ? await supabase.auth.signInWithPassword({
            email: email || phone,
            password,
          })
        : await supabase.auth.signUp({
            email: email || phone,
            password,
            options: {
              emailRedirectTo: `${location.origin}/auth/callback`,
            },
          })

      if (error) throw error

      router.refresh()
      if (view === 'sign-in') {
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ha ocurrido un error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión con Google')
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {view === 'sign-in' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="emailOrPhone">Correo electrónico o número de teléfono</Label>
          <Input
            id="emailOrPhone"
            type="text"
            value={email || phone}
            onChange={(e) => {
              const value = e.target.value
              if (value.includes('@')) {
                setEmail(value)
                setPhone('')
              } else {
                setPhone(value)
                setEmail('')
              }
            }}
            required
            className="mt-1"
            placeholder="nombre@ejemplo.com o +56912345678"
          />
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
            placeholder="••••••••"
          />
        </div>

        {view === 'sign-up' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Confirmo que he leído y acepto los{' '}
              <a href="/terminos" className="text-blue-600 hover:underline">
                Términos de Uso
              </a>{' '}
              y la{' '}
              <a href="/privacidad" className="text-blue-600 hover:underline">
                Política de Privacidad
              </a>
            </label>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading || (view === 'sign-up' && !acceptTerms)}
        >
          {loading ? 'Cargando...' : view === 'sign-in' ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
            O continuar con
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Google
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
        {view === 'sign-in' ? (
          <>
            ¿No tienes una cuenta?{' '}
            <a
              href="/registro"
              className="text-blue-600 hover:underline font-medium"
            >
              Regístrate
            </a>
          </>
        ) : (
          <>
            ¿Ya tienes una cuenta?{' '}
            <a
              href="/iniciar-sesion"
              className="text-blue-600 hover:underline font-medium"
            >
              Inicia sesión
            </a>
          </>
        )}
      </p>
    </div>
  )
}
