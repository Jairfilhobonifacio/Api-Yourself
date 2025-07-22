// Importações de bibliotecas e utilitários
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Propriedades do componente Input
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 * 
 * @property {boolean} [error=false] - Se verdadeiro, aplica estilos de erro ao input
 * @property {'sm'|'md'|'lg'} [inputSize='md'] - Tamanho do input (pequeno, médio ou grande)
 * @property {React.ReactNode} [icon] - Ícone opcional para ser exibido à esquerda do input
 * 
 * @example
 * // Todas as propriedades padrão de input HTML são suportadas
 * // Exemplo: placeholder, disabled, type, value, onChange, etc.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

/**
 * Componente de input personalizado com suporte a temas, tamanhos e estados de erro.
 * Implementa acessibilidade e estilização consistente em todo o aplicativo.
 * 
 * @component
 * @example
 * // Input básico
 * <Input placeholder="Digite seu nome" />
 * 
 * @example
 * // Input com estado de erro
 * <Input 
 *   error 
 *   placeholder="Campo obrigatório" 
 *   aria-invalid="true"
 *   aria-describedby="erro-nome"
 * />
 * 
 * @example
 * // Input com ícone e tamanho personalizado
 * <Input 
 *   icon={<Search className="h-4 w-4" />} 
 *   placeholder="Buscar..."
 *   size="sm"
 * />
 * 
 * @example
 * // Input desabilitado
 * <Input 
 *   placeholder="Desabilitado" 
 *   disabled 
 * />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,         // Classes CSS adicionais
    type = 'text',     // Tipo de input (text, email, password, etc.)
    error = false,     // Estado de erro
    inputSize = 'md',  // Tamanho do input
    icon,              // Ícone opcional
    ...props           // Outras propriedades do input HTML
  }, ref) => {
    /**
     * Mapeamento de classes CSS para diferentes tamanhos de input
     */
    const sizeClasses = {
      sm: 'h-8 text-xs px-2',     // Pequeno - para formulários compactos
      md: 'h-10 text-sm px-3',    // Médio - tamanho padrão
      lg: 'h-12 text-base px-4',  // Grande - para maior destaque
    }

    return (
      <div className="relative w-full">
        {/* Renderiza o ícone se fornecido */}
        {icon && (
          <div 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        
        {/* Elemento de input real */}
        <input
          type={type}
          className={cn(
            // Estilos base
            'flex w-full rounded-md border bg-background font-medium ring-offset-background',
            
            // Estilos para inputs do tipo file
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            
            // Estilo do placeholder
            'placeholder:text-muted-foreground/60',
            
            // Estados de foco e interatividade
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            
            // Estilos condicionais
            error 
              ? 'border-destructive focus-visible:ring-destructive/30' 
              : 'border-input focus-visible:ring-ring/30',
            
            // Ajustes de espaçamento
            icon ? 'pl-10' : 'pl-3',  // Padding esquerdo maior quando há ícone
            sizeClasses[inputSize],   // Classes de tamanho
            'py-2',                   // Padding vertical consistente
            className                 // Classes personalizadas adicionais
          )}
          ref={ref}  // Encaminha a ref para o elemento input
          aria-invalid={error ? 'true' : undefined}  // Acessibilidade para estado de erro
          {...props}  // Propaga todas as outras propriedades do input
        />
      </div>
    )
  }
)

// Define o nome de exibição para facilitar a depuração no React DevTools
Input.displayName = "Input"

// Exporta o componente
// O tipo InputProps já está disponível para importação diretamente do módulo
export { Input }
