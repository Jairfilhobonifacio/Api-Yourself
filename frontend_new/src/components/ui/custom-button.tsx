// Importação de utilitários e tipos do React
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

/**
 * Propriedades do componente Button
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [variant='default'] - Estilo visual do botão
 * @property {'default'|'sm'|'lg'|'icon'} [size='default'] - Tamanho do botão
 * @property {boolean} [isLoading=false] - Se verdadeiro, exibe um indicador de carregamento
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
}

/**
 * Componente Button personalizado com suporte a múltiplas variantes e estados
 * Utiliza forwardRef para permitir o encaminhamento de refs
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,           // Classes CSS adicionais
    variant = 'default', // Variante de estilo do botão
    size = 'default',    // Tamanho do botão
    isLoading = false,   // Estado de carregamento
    children,            // Conteúdo do botão
    disabled,           // Estado desabilitado
    ...props            // Outras propriedades HTML do botão
  }, ref) => {
    // Estilos base aplicados a todos os botões
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'
    
    // Mapeamento de variantes de estilo
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    }

    // Mapeamento de tamanhos
    const sizes = {
      default: 'h-10 py-2 px-4', // Tamanho padrão
      sm: 'h-9 px-3 rounded-md',  // Pequeno
      lg: 'h-11 px-8 rounded-md', // Grande
      icon: 'h-10 w-10',         // Tamanho quadrado para ícones
    }

    // Renderiza o elemento button com as classes apropriadas
    return (
      <button
        className={cn(
          baseStyles,          // Estilos base
          variants[variant],   // Estilo da variante selecionada
          sizes[size],        // Tamanho selecionado
          className           // Classes adicionais personalizadas
        )}
        ref={ref}  // Encaminha a ref para o elemento button
        disabled={isLoading || disabled}  // Desabilita durante o carregamento ou quando especificado
        aria-busy={isLoading}  // Indica para leitores de tela quando está carregando
        {...props}  // Propaga outras propriedades HTML
      >
        {isLoading ? (
          // Estado de carregamento: mostra spinner + texto
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Círculo externo do spinner */}
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              {/* Arco de carregamento */}
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </>
        ) : (
          // Estado normal: apenas o conteúdo do botão
          children
        )}
      </button>
    )
  }
)

// Define o nome de exibição para facilitar a depuração
Button.displayName = 'Button'

export { Button }
