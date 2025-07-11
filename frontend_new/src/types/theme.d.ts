import "next-themes"

declare module "next-themes" {
  interface ThemeProviderProps {
    children: React.ReactNode
    defaultTheme?: string
    storageKey?: string
    attribute?: string | false
    enableSystem?: boolean
    enableColorScheme?: boolean
    disableTransitionOnChange?: boolean
    themes?: string[]
    forcedTheme?: string | null
    nonce?: string
  }
}
