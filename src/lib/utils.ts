import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases CSS utilizando clsx y tailwind-merge
 * @param inputs - Clases CSS a combinar
 * @returns String con las clases combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida si una cadena es un correo electrónico válido
 * @param email - Cadena a validar
 * @returns Boolean indicando si es un correo válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si una cadena es un número de teléfono válido
 * @param phone - Cadena a validar
 * @returns Boolean indicando si es un teléfono válido
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone)
}

/**
 * Formatea un error de Supabase para mostrar al usuario
 * @param error - Error de Supabase
 * @returns Mensaje de error formateado en español
 */
export function formatAuthError(error: Error): string {
  const errorMessage = error.message.toLowerCase()
  
  if (errorMessage.includes('invalid login credentials')) {
    return 'Credenciales inválidas'
  }
  
  if (errorMessage.includes('email not confirmed')) {
    return 'Por favor confirma tu correo electrónico'
  }
  
  if (errorMessage.includes('password')) {
    return 'La contraseña debe tener al menos 6 caracteres'
  }
  
  if (errorMessage.includes('email')) {
    return 'Correo electrónico inválido'
  }

  return 'Ha ocurrido un error. Por favor intenta de nuevo.'
}
