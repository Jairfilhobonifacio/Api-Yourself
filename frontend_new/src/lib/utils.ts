import { type ClassValue } from 'class-variance-authority/types'

// Implementação simplificada de cn() que não depende de tailwind-merge
export function cn(...inputs: ClassValue[]) {
  // Filtra valores nulos/undefined e junta as classes
  return inputs
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || ""}${path}`
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}
