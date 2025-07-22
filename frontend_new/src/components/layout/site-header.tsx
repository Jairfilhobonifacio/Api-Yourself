// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Necessário para o uso de hooks como usePathname e useTheme.
"use client"

// Importa o componente Link do Next.js para navegação otimizada no lado do cliente.
import Link from "next/link"
// Importa o hook usePathname para obter o caminho da URL atual.
import { usePathname } from "next/navigation"
// Importa hooks do React
import { useEffect, useState } from "react"
// Importa ícones da biblioteca lucide-react.
import { Menu, Moon, Sun, Monitor, MapPin, Heart, X } from "lucide-react"
// Importa o hook useTheme da biblioteca next-themes para gerenciar o tema da aplicação.
import { useTheme } from "next-themes"

// Componente separado para o tema toggle que só renderiza no cliente
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Efeito para garantir que o componente seja montado apenas no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Se não estiver montado, renderiza um placeholder com as mesmas dimensões
  if (!mounted) {
    return (
      <button 
        className="h-9 w-9 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
        aria-label="Carregando tema..."
        disabled
      >
        <div className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  return (
    <div className="relative inline-block text-left">
      <button 
        className="h-9 px-3 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
        onClick={() => document.getElementById('theme-menu')?.classList.toggle('hidden')}
        aria-label="Alternar tema"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {theme === 'light' ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.1rem] w-[1.1rem]" />
        )}
        <span className="sr-only">Alternar tema</span>
      </button>
      
      <div 
        id="theme-menu" 
        className="hidden absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700"
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        onMouseLeave={() => document.getElementById('theme-menu')?.classList.add('hidden')}
      >
        <div className="py-1" role="none">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Tema
          </div>
          <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
          <button
            onClick={() => {
              setTheme("light");
              document.getElementById('theme-menu')?.classList.add('hidden');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer flex items-center"
            role="menuitem"
            tabIndex={-1}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Claro</span>
          </button>
          <button
            onClick={() => {
              setTheme("dark");
              document.getElementById('theme-menu')?.classList.add('hidden');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer flex items-center"
            role="menuitem"
            tabIndex={-1}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Escuro</span>
          </button>
          <button
            onClick={() => {
              setTheme("system");
              document.getElementById('theme-menu')?.classList.add('hidden');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer flex items-center"
            role="menuitem"
            tabIndex={-1}
          >
            <Monitor className="mr-2 h-4 w-4" />
            <span>Sistema</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Importa a função de utilidade cn para mesclar classes do Tailwind CSS de forma condicional.
import { cn } from "@/lib/utils"
// Importações de componentes personalizados serão adicionadas conforme necessário

/**
 * SiteHeader é o componente de cabeçalho principal do site.
 * Inclui o logotipo, a navegação principal, o menu móvel e o seletor de tema.
 * @returns {JSX.Element} O elemento JSX que representa o cabeçalho.
 */
export function SiteHeader() {
  // Obtém o caminho da URL atual para destacar o link de navegação ativo.
  const pathname = usePathname()

  // Define os itens de navegação em um array para facilitar a renderização.
  const navItems = [
    { name: "Início", href: "/" },
    { name: "Pontos de Doação", href: "/pontos" },
    { 
      name: "Mapa", 
      href: "/mapa",
      icon: <MapPin className="h-4 w-4 mr-1" /> // Ícone opcional para o item de menu.
    },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
    { name: "Estatísticas", href: "/estatisticas" },
  ]

  return (
    // O elemento <header> é fixo no topo da página (sticky) com um design limpo e minimalista
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Navegação para telas de tamanho médio (md) ou maiores. Fica oculta em telas pequenas. */}
        <div className="mr-4 hidden md:flex">
          <Link 
            href="/" 
            className="mr-8 flex items-center space-x-1.5 group"
            aria-label="Página inicial"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Api</span>
            <Heart className="h-6 w-6 text-pink-500 fill-current mx-1 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Yourself</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // A função cn é usada para aplicar a classe 'text-foreground' se o link estiver ativo.
                className={cn(
                  "text-[15px] font-medium px-3 py-1.5 rounded-md transition-colors flex items-center hover:text-blue-700 dark:hover:text-blue-300",
                  pathname === item.href
                    ? "text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Menu móvel (Sheet) que é exibido apenas em telas pequenas (oculto em md e maiores). */}
        <div className="md:hidden">
          <button
            onClick={() => document.getElementById('mobile-menu')?.classList.remove('hidden')}
            className="mr-1 p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            aria-label="Menu de navegação"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </button>
          
          {/* Mobile menu panel, show/hide based on menu state */}
          <div 
            id="mobile-menu" 
            className="fixed inset-0 z-50 hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}></div>
            
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
              <div className="flex h-full flex-col overflow-y-auto">
                <div className="p-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
                    onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
                  >
                    <span className="sr-only">Fechar menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="px-4 py-2">
                  <div className="flex items-center justify-center mb-6">
                    <Link href="/" className="flex items-center space-x-1.5 group" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Api</span>
                      <Heart className="h-6 w-6 text-pink-500 fill-current mx-1 group-hover:scale-110 transition-transform" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Yourself</span>
                    </Link>
                  </div>
                  
                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                            isActive 
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                          )}
                          onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
                        >
                          <div className="flex items-center">
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.name}
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Seção direita do cabeçalho, contendo o seletor de tema. */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {/* Componente ThemeToggle que lida com a lógica de tema */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
