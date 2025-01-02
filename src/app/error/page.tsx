import Link from 'next/link'
import { Button } from '../../components/ui/button'

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Ha ocurrido un error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Lo sentimos, ha ocurrido un error durante el proceso de autenticación.
            Por favor, intenta de nuevo.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link href="/iniciar-sesion" className="w-full">
              <Button className="w-full" variant="default">
                Volver a intentar
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button className="w-full" variant="outline">
                Ir al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Error | ISA Autenticación',
  description: 'Ha ocurrido un error durante el proceso de autenticación',
}
