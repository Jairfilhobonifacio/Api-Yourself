// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Necessário para o uso de hooks como usePathname e useTheme.
"use client"

// Importa o componente Link do Next.js para navegação otimizada no lado do cliente.
import Link from "next/link"
// Importa o hook usePathname para obter o caminho da URL atual.
import { usePathname } from "next/navigation"
// Importa ícones da biblioteca lucide-react.
import { Moon, Sun, Menu, MapPin, Heart } from "lucide-react"
// Importa o hook useTheme da biblioteca next-themes para gerenciar o tema da aplicação.
import { useTheme } from "next-themes"

// Importa a função de utilidade cn para mesclar classes do Tailwind CSS de forma condicional.
import { cn } from "@/lib/utils"
// Importa o componente de botão personalizado.
import { Button } from "@/components/ui/button"
// Importa os componentes de menu suspenso (Dropdown).
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Importa os componentes de painel lateral (Sheet) para o menu móvel.
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

/**
 * SiteHeader é o componente de cabeçalho principal do site.
 * Inclui o logotipo, a navegação principal, o menu móvel e o seletor de tema.
 * @returns {JSX.Element} O elemento JSX que representa o cabeçalho.
 */
export function SiteHeader() {
  // Obtém o caminho da URL atual para destacar o link de navegação ativo.
  const pathname = usePathname()
  // Obtém a função setTheme para permitir a alteração do tema.
  const { setTheme } = useTheme()

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
    // O elemento <header> é fixo no topo da página (sticky) e possui um efeito de desfoque no fundo.
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-indigo-500/30 via-fuchsia-600/20 to-indigo-500/30 backdrop-blur-md shadow-lg supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-16 items-center">
        {/* Navegação para telas de tamanho médio (md) ou maiores. Fica oculta em telas pequenas. */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <span className="font-bold">Api</span>
            <Heart className="h-5 w-5 text-pink-500 fill-current group-hover:scale-110 transition-transform" />
            <span className="font-bold">Yourself</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // A função cn é usada para aplicar a classe 'text-foreground' se o link estiver ativo.
                className={cn(
                  "transition-colors hover:text-foreground/80 flex items-center",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Menu móvel (Sheet) que é exibido apenas em telas pequenas (oculto em md e maiores). */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="pr-0">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="flex items-center justify-center mb-6">
                  <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-xl font-bold">Api</span>
                    <Heart className="h-6 w-6 text-pink-500 fill-current group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold">Yourself</span>
                  </Link>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block w-full rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent" : "transparent"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {/* Seção direita do cabeçalho, contendo o seletor de tema. */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {/* Dropdown para seleção de tema (claro, escuro, sistema). */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {/* Ícone do sol para o tema claro. */}
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  {/* Ícone da lua para o tema escuro. */}
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Alternar tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Escuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  Sistema
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
