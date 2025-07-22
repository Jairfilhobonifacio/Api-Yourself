import { cn } from "@/lib/utils"
import * as React from "react"

/**
 * Propriedades do componente DropdownMenu
 * 
 * @interface DropdownMenuProps
 * @property {React.ReactNode} children - Itens do menu suspenso (DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator)
 * @property {React.ReactNode} trigger - Elemento que ativa o menu suspenso ao ser clicado
 * @property {'start' | 'center' | 'end'} [align='end'] - Alinhamento do menu em relação ao trigger
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * 
 * @example
 * // Exemplo básico
 * <DropdownMenu trigger={<Button>Opções</Button>}>
 *   <DropdownMenuItem>Perfil</DropdownMenuItem>
 *   <DropdownMenuItem>Configurações</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Sair</DropdownMenuItem>
 * </DropdownMenu>
 */
interface DropdownMenuProps {
  /** Itens do menu suspenso (DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator) */
  children: React.ReactNode
  /** Elemento que ativa o menu suspenso ao ser clicado */
  trigger: React.ReactNode
  /** Alinhamento do menu em relação ao trigger */
  align?: 'start' | 'center' | 'end'
  /** Classes CSS adicionais para estilização personalizada */
  className?: string
}

/**
 * Componente de menu suspenso (dropdown) acessível e estilizável.
 * Gerencia automaticamente o estado de abertura/fechamento e interações do teclado.
 * 
 * @component
 * @example
 * // Exemplo com alinhamento personalizado e itens desabilitados
 * <DropdownMenu 
 *   trigger={<Button>Menu</Button>} 
 *   align="start"
 *   className="w-64"
 * >
 *   <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
 *   <DropdownMenuItem onSelect={() => console.log('Perfil')}>
 *     Meu Perfil
 *   </DropdownMenuItem>
 *   <DropdownMenuItem disabled>Configurações</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Sair</DropdownMenuItem>
 * </DropdownMenu>
 */
function DropdownMenu({ 
  children, 
  trigger, 
  align = 'end',
  className 
}: DropdownMenuProps) {
  // Estado que controla se o menu está aberto ou fechado
  const [isOpen, setIsOpen] = React.useState(false)
  // Referência para o elemento raiz do dropdown
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  /**
   * Efeito que adiciona listeners para fechar o menu quando:
   * 1. O usuário clica fora do menu
   * 2. O usuário pressiona a tecla Escape
   */
  React.useEffect(() => {
    /**
     * Fecha o menu quando o usuário clica fora dele
     */
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    /**
     * Fecha o menu quando o usuário pressiona a tecla Escape
     */
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    // Adiciona os listeners apenas quando o menu estiver aberto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    // Limpa os listeners quando o componente for desmontado ou o menu for fechado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  /**
   * Mapeamento de classes para alinhamento do menu
   * @private
   */
  const alignmentClasses = {
    /** Alinha o menu à esquerda do trigger */
    start: 'left-0',
    /** Centraliza o menu em relação ao trigger */
    center: 'left-1/2 -translate-x-1/2',
    /** Alinha o menu à direita do trigger (padrão) */
    end: 'right-0',
  }

  return (
    <div 
      className="relative inline-block text-left" 
      ref={dropdownRef}
    >
      {/* Elemento que ativa o dropdown quando clicado */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        {trigger}
      </div>
      
      {/* Menu suspenso */}
      {isOpen && (
        <div
          className={cn(
            // Estilos base
            'absolute mt-2 w-56 rounded-md shadow-lg',
            // Tema claro/escuro
            'bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5',
            // Foco e sobreposição
            'focus:outline-none z-50',
            // Alinhamento
            alignmentClasses[align],
            // Classes personalizadas
            className
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {React.Children.map(children, (child) => {
              // Clona cada item do menu para adicionar o comportamento de fechar ao selecionar
              if (React.isValidElement<{ onSelect?: () => void }>(child)) {
                const { onSelect, ...childProps } = child.props || {}
                return React.cloneElement(child, {
                  ...childProps,
                  onSelect: () => {
                    onSelect?.()
                    setIsOpen(false)
                  }
                })
              }
              return child
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Propriedades do componente DropdownMenuTrigger
 * 
 * @interface DropdownMenuTriggerProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {React.ReactNode} children - Conteúdo do trigger
 * @property {boolean} [asChild] - Se verdadeiro, renderiza o componente como seu filho direto
 * 
 * @example
 * // Exemplo de uso
 * <DropdownMenuTrigger>
 *   <Button>Menu</Button>
 * </DropdownMenuTrigger>
 */
interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do trigger */
  children: React.ReactNode
  /** Se verdadeiro, renderiza o componente como seu filho direto */
  asChild?: boolean
}

/**
 * Componente que ativa o menu suspenso quando clicado.
 * Deve ser usado como filho de DropdownMenu.
 * 
 * @component
 * @example
 * // Exemplo com ícone
 * <DropdownMenuTrigger>
 *   <Button variant="outline">
 *     <Menu className="h-4 w-4 mr-2" />
 *     Opções
 *   </Button>
 * </DropdownMenuTrigger>
 */
function DropdownMenuTrigger({ 
  children, 
  className,
  ...props 
}: DropdownMenuTriggerProps) {
  return (
    <div 
      className={cn(
        // Estilo de cursor para indicar que é clicável
        "cursor-pointer",
        // Classes personalizadas
        className
      )}
      role="button"
      tabIndex={0}
      // Suporta todas as propriedades padrão de um elemento div
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Propriedades do componente DropdownMenuItem
 * 
 * @interface DropdownMenuItemProps
 * @property {React.ReactNode} children - Conteúdo do item do menu
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * @property {() => void} [onSelect] - Função chamada quando o item é selecionado
 * @property {boolean} [disabled] - Se verdadeiro, desabilita o item
 * 
 * @example
 * // Exemplo de uso
 * <DropdownMenuItem 
 *   onSelect={() => console.log('Item selecionado')}
 *   disabled={isDisabled}
 *   className="font-medium"
 * >
 *   Meu Item
 * </DropdownMenuItem>
 */
interface DropdownMenuItemProps {
  /** Conteúdo do item do menu */
  children: React.ReactNode
  /** Classes CSS adicionais para estilização personalizada */
  className?: string
  /** Função chamada quando o item é selecionado */
  onSelect?: () => void
  /** Se verdadeiro, desabilita o item */
  disabled?: boolean
}

/**
 * Item individual do menu suspenso.
 * Pode ser clicado para executar uma ação e/ou fechar o menu.
 * 
 * @component
 * @example
 * // Exemplo com ícone
 * <DropdownMenuItem onSelect={() => handleProfileClick()}>
 *   <User className="mr-2 h-4 w-4" />
 *   <span>Perfil</span>
 * </DropdownMenuItem>
 */
function DropdownMenuItem({ 
  children, 
  className,
  onSelect,
  disabled = false,
  ...props 
}: DropdownMenuItemProps) {
  return (
    <div
      className={cn(
        // Layout e tipografia
        'block w-full text-left px-4 py-2 text-sm',
        // Cores e estados
        'text-gray-700 dark:text-gray-200',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        // Cursor e interação
        'cursor-pointer transition-colors',
        // Estado desabilitado
        disabled && 'opacity-50 cursor-not-allowed',
        // Classes personalizadas
        className
      )}
      onClick={(e) => {
        if (!disabled && onSelect) {
          e.preventDefault()
          onSelect()
        }
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled && onSelect) {
          e.preventDefault()
          onSelect()
        }
      }}
      role="menuitem"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      // Suporta todas as propriedades padrão de um elemento div
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Propriedades do componente DropdownMenuLabel
 * 
 * @interface DropdownMenuLabelProps
 * @property {React.ReactNode} children - Texto do rótulo
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * 
 * @example
 * // Exemplo de uso
 * <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
 */
interface DropdownMenuLabelProps {
  /** Texto do rótulo */
  children: React.ReactNode
  /** Classes CSS adicionais para estilização personalizada */
  className?: string
}

/**
 * Rótulo para agrupar itens relacionados no menu suspenso.
 * Não é interativo.
 * 
 * @component
 * @example
 * // Exemplo de uso
 * <DropdownMenu>
 *   <DropdownMenuLabel>Configurações</DropdownMenuLabel>
 *   <DropdownMenuItem>Conta</DropdownMenuItem>
 *   <DropdownMenuItem>Notificações</DropdownMenuItem>
 *   <DropdownMenuLabel>Outras opções</DropdownMenuLabel>
 *   <DropdownMenuItem>Ajuda</DropdownMenuItem>
 * </DropdownMenu>
 */
function DropdownMenuLabel({ 
  children, 
  className 
}: DropdownMenuLabelProps) {
  return (
    <div 
      className={cn(
        // Layout e tipografia
        'px-4 py-2 text-xs font-semibold uppercase tracking-wider',
        // Cores
        'text-gray-500 dark:text-gray-400',
        // Classes personalizadas
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Linha separadora para agrupar itens do menu.
 * 
 * @component
 * @example
 * // Exemplo de uso
 * <DropdownMenu>
 *   <DropdownMenuItem>Perfil</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Sair</DropdownMenuItem>
 * </DropdownMenu>
 */
function DropdownMenuSeparator({ 
  className 
}: { 
  /** Classes CSS adicionais para estilização personalizada */
  className?: string 
}) {
  return (
    <div 
      className={cn(
        // Dimensões e espaçamento
        'my-1 h-px',
        // Cores
        'bg-gray-100 dark:bg-gray-700',
        // Classes personalizadas
        className
      )} 
      role="separator"
      aria-hidden="true"
    />
  )
}

// Exporta todos os componentes como um objeto para facilitar as importações
const Dropdown = {
  Root: DropdownMenu,
  Trigger: DropdownMenuTrigger,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
}

export {
  DropdownMenu as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuItem as Item,
  DropdownMenuLabel as Label,
  DropdownMenuSeparator as Separator,
  Dropdown
}

export type { 
  DropdownMenuProps as RootProps, 
  DropdownMenuTriggerProps as TriggerProps, 
  DropdownMenuItemProps as ItemProps, 
  DropdownMenuLabelProps as LabelProps 
}
