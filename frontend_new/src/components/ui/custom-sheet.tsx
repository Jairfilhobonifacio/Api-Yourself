import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import * as React from "react"

/**
 * Propriedades do componente Sheet
 * 
 * @interface SheetProps
 * @property {React.ReactNode} children - Conteúdo do sheet
 * @property {boolean} open - Controla se o sheet está aberto ou fechado
 * @property {(open: boolean) => void} onOpenChange - Função chamada quando o estado de abertura é alterado
 * @property {'top' | 'right' | 'bottom' | 'left'} [side='right'] - Lado de onde o sheet será exibido
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * 
 * @example
 * // Exemplo básico
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Sheet open={isOpen} onOpenChange={setIsOpen}>
 *   <SheetContent>
 *     Conteúdo do sheet
 *   </SheetContent>
 * </Sheet>
 * 
 * @example
 * // Exemplo com lado personalizado
 * <Sheet open={isOpen} onOpenChange={setIsOpen} side="left">
 *   <SheetContent>
 *     Menu lateral esquerdo
 *   </SheetContent>
 * </Sheet>
 */
interface SheetProps {
  /** Conteúdo do sheet */
  children: React.ReactNode
  /** Controla se o sheet está aberto ou fechado */
  open: boolean
  /** Função chamada quando o estado de abertura é alterado */
  onOpenChange: (open: boolean) => void
  /** Lado de onde o sheet será exibido */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Classes CSS adicionais para estilização personalizada */
  className?: string
}

/**
 * Componente de Sheet (painel deslizante) acessível e responsivo.
 * Pode ser exibido de qualquer lado da tela e inclui gerenciamento de foco e teclado.
 * 
 * @component
 * @example
 * // Exemplo básico de uso controlado
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <div>
 *   <button onClick={() => setIsOpen(true)}>Abrir Sheet</button>
 *   <Sheet open={isOpen} onOpenChange={setIsOpen}>
 *     <SheetContent>
 *       Conteúdo do sheet aqui
 *     </SheetContent>
 *   </Sheet>
 * </div>
 * 
 * @example
 * // Exemplo com posicionamento personalizado
 * <Sheet open={isOpen} onOpenChange={setIsOpen} side="left" className="w-96">
 *   <SheetContent>
 *     <h2 className="text-xl font-bold mb-4">Menu</h2>
 *     <nav>
 *       <ul className="space-y-2">
 *         <li><a href="#" className="hover:text-primary">Início</a></li>
 *         <li><a href="#" className="hover:text-primary">Perfil</a></li>
 *         <li><a href="#" className="hover:text-primary">Configurações</a></li>
 *       </ul>
 *     </nav>
 *   </SheetContent>
 * </Sheet>
 */
function Sheet({
  children,
  open,
  onOpenChange,
  side = 'right',
  className,
  ...props
}: SheetProps) {
  /** Referência para o elemento raiz do sheet */
  const sheetRef = React.useRef<HTMLDivElement>(null)

  /**
   * Efeito para gerenciar eventos de teclado e rolagem do body
   * - Fecha o sheet ao pressionar Escape
   * - Desabilita a rolagem do body quando o sheet está aberto
   */
  React.useEffect(() => {
    /**
     * Fecha o sheet quando a tecla Escape é pressionada
     */
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      // Adiciona o listener para a tecla Escape
      document.addEventListener('keydown', handleEscapeKey)
      // Desabilita a rolagem do body quando o sheet está aberto
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem do body quando o sheet é fechado
      document.body.style.overflow = ''
    }

    // Limpa os listeners quando o componente é desmontado ou o sheet é fechado
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])

  /**
   * Fecha o sheet quando o usuário clica no backdrop (fora do conteúdo)
   */
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onOpenChange(false)
    }
  }

  // Não renderiza nada se o sheet estiver fechado
  if (!open) return null

  /**
   * Mapeamento de classes para cada posição do sheet
   * @private
   */
  const sideClasses = {
    /** Posiciona o sheet no topo da tela */
    top: 'inset-x-0 top-0 border-b',
    /** Posiciona o sheet à direita da tela (padrão) */
    right: 'inset-y-0 right-0 h-full w-full sm:max-w-sm border-l',
    /** Posiciona o sheet na parte inferior da tela */
    bottom: 'inset-x-0 bottom-0 border-t',
    /** Posiciona o sheet à esquerda da tela */
    left: 'inset-y-0 left-0 h-full w-full sm:max-w-sm border-r',
  } as const

  return (
    <div 
      className="fixed inset-0 z-50"
      // Garante que o sheet não roube o foco de outros elementos
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop escuro com desfoque */}
      <div 
        className={cn(
          'fixed inset-0 transition-opacity',
          'bg-black/50 backdrop-blur-sm',
          // Animações de entrada/saída
          open ? 'opacity-100' : 'opacity-0',
          'duration-200 ease-in-out'
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Conteúdo do Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          // Posicionamento e aparência
          'fixed bg-background shadow-lg overflow-hidden',
          // Animações de entrada/saída
          'transition-transform duration-200 ease-in-out',
          // Posicionamento baseado na propriedade 'side'
          sideClasses[side],
          // Animações de entrada específicas para cada lado
          {
            'top': 'animate-in slide-in-from-top sm:slide-in-from-top-8',
            'right': 'animate-in slide-in-from-right sm:slide-in-from-right-8',
            'bottom': 'animate-in slide-in-from-bottom sm:slide-in-from-bottom-8',
            'left': 'animate-in slide-in-from-left sm:slide-in-from-left-8',
          }[side],
          // Classes personalizadas
          className
        )}
        // Suporta todas as propriedades padrão de um elemento div
        {...props}
      >
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Propriedades do componente SheetTrigger
 * 
 * @interface SheetTriggerProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {React.ReactNode} children - Conteúdo do trigger
 * @property {() => void} [onClick] - Função chamada quando o trigger é clicado
 * 
 * @example
 * // Exemplo de uso
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <SheetTrigger onClick={() => setIsOpen(true)}>
 *   <Button>Abrir Menu</Button>
 * </SheetTrigger>
 */
interface SheetTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do trigger */
  children: React.ReactNode
  /** Função chamada quando o trigger é clicado */
  onClick?: () => void
}

/**
 * Componente que ativa a abertura do Sheet quando clicado.
 * Deve ser usado em conjunto com o componente Sheet.
 * 
 * @component
 * @example
 * // Exemplo com ícone
 * <SheetTrigger onClick={() => setIsOpen(true)}>
 *   <Button variant="outline" size="icon">
 *     <Menu className="h-4 w-4" />
 *   </Button>
 * </SheetTrigger>
 */
function SheetTrigger({ 
  children, 
  className,
  onClick,
  ...props 
}: SheetTriggerProps) {
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
      onClick={onClick}
      // Suporta todas as propriedades padrão de um elemento div
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Propriedades do componente SheetContent
 * 
 * @interface SheetContentProps
 * @property {React.ReactNode} children - Conteúdo do sheet
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * @property {() => void} [onClose] - Função chamada quando o botão de fechar é clicado
 * @property {boolean} [showCloseButton=true] - Se verdadeiro, exibe o botão de fechar
 * 
 * @example
 * // Exemplo básico
 * <SheetContent>
 *   <h2 className="text-xl font-bold mb-4">Título</h2>
 *   <p>Conteúdo do sheet aqui</p>
 * </SheetContent>
 * 
 * @example
 * // Exemplo sem botão de fechar
 * <SheetContent showCloseButton={false}>
 *   Conteúdo sem botão de fechar
 * </SheetContent>
 */
interface SheetContentProps {
  /** Conteúdo do sheet */
  children: React.ReactNode
  /** Classes CSS adicionais para estilização personalizada */
  className?: string
  /** Função chamada quando o botão de fechar é clicado */
  onClose?: () => void
  /** Se verdadeiro, exibe o botão de fechar */
  showCloseButton?: boolean
}

/**
 * Componente que envolve o conteúdo do Sheet.
 * Inclui um botão de fechar opcional e estilização de rolagem.
 * 
 * @component
 * @example
 * // Exemplo com conteúdo rolável
 * <SheetContent>
 *   <div className="space-y-4">
 *     <h2 className="text-2xl font-bold">Título</h2>
 *     <p>Conteúdo longo que vai rolar...</p>
 *     {/* Mais conteúdo... *\/}
 *   </div>
 * </SheetContent>
 */
function SheetContent({ 
  children, 
  className,
  onClose,
  showCloseButton = true,
  ...props 
}: SheetContentProps) {
  return (
    <div 
      className={cn(
        // Layout
        'h-full flex flex-col',
        // Classes personalizadas
        className
      )} 
      // Suporta todas as propriedades padrão de um elemento div
      {...props}
    >
      {/* Botão de fechar */}
      {showCloseButton && (
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              // Estilo base
              'rounded-sm opacity-70 transition-opacity',
              // Estados de interação
              'hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'disabled:pointer-events-none',
              // Tema
              'ring-offset-background'
            )}
            // Acessibilidade
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
            {/* Texto escondido apenas para leitores de tela */}
            <span className="sr-only">Fechar</span>
          </button>
        </div>
      )}
      
      {/* Área de conteúdo rolável */}
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        {children}
      </div>
    </div>
  )
}

// Exporta todos os componentes como um objeto para facilitar as importações
const SheetComponent = {
  Root: Sheet,
  Trigger: SheetTrigger,
  Content: SheetContent,
}

export {
  Sheet as Root,
  SheetTrigger as Trigger,
  SheetContent as Content,
  SheetComponent as Sheet
}

export type { 
  SheetProps as RootProps, 
  SheetTriggerProps as TriggerProps, 
  SheetContentProps as ContentProps 
}
