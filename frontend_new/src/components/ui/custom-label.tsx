import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Propriedades do componente Label
 * 
 * @interface LabelProps
 * @extends {React.LabelHTMLAttributes<HTMLLabelElement>}
 * @property {boolean} [bold] - Se verdadeiro, o texto ficará em negrito
 * @property {boolean} [italic] - Se verdadeiro, o texto ficará em itálico
 * @property {'default' | 'primary' | 'destructive' | 'muted'} [color='default'] - Cor do texto
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Tamanho do texto
 * @property {boolean} [required] - Se verdadeiro, adiciona um asterisco vermelho indicando campo obrigatório
 * @property {boolean} [uppercase] - Se verdadeiro, exibe o texto em maiúsculas
 * @property {boolean} [lowercase] - Se verdadeiro, exibe o texto em minúsculas
 * @property {boolean} [capitalize] - Se verdadeiro, capitaliza a primeira letra de cada palavra
 * 
 * @example
 * // Label básico
 * <Label>Nome do campo</Label>
 * 
 * @example
 * // Label obrigatório com destaque
 * <Label required color="primary">E-mail</Label>
 * 
 * @example
 * // Label com formatação personalizada
 * <Label bold uppercase color="destructive" className="tracking-wider">
 *   Campo obrigatório
 * </Label>
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Se verdadeiro, o texto ficará em negrito */
  bold?: boolean;
  /** Se verdadeiro, o texto ficará em itálico */
  italic?: boolean;
  /** Cor do texto */
  color?: 'default' | 'primary' | 'destructive' | 'muted';
  /** Tamanho do texto */
  size?: 'sm' | 'md' | 'lg';
  /** Se verdadeiro, adiciona um asterisco vermelho indicando campo obrigatório */
  required?: boolean;
  /** Se verdadeiro, exibe o texto em maiúsculas */
  uppercase?: boolean;
  /** Se verdadeiro, exibe o texto em minúsculas */
  lowercase?: boolean;
  /** Se verdadeiro, capitaliza a primeira letra de cada palavra */
  capitalize?: boolean;
}

/**
 * Componente de Label acessível e altamente personalizável para formulários e interfaces.
 * Suporta temas claros/escuros, tamanhos, estados de erro e formatação de texto.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <div className="grid w-full max-w-sm items-center gap-1.5">
 *   <Label htmlFor="email">E-mail</Label>
 *   <Input type="email" id="email" placeholder="seu@email.com" />
 * </div>
 * 
 * @example
 * // Exemplo com validação e estado de erro
 * <div className="grid w-full max-w-sm items-center gap-1.5">
 *   <Label 
 *     htmlFor="password" 
 *     required 
 *     color={errors.password ? 'destructive' : 'default'}
 *   >
 *     Senha
 *   </Label>
 *   <Input 
 *     type="password" 
 *     id="password" 
 *     className={errors.password ? 'border-destructive' : ''} 
 *   />
 *   {errors.password && (
 *     <p className="text-sm text-destructive">{errors.password.message}</p>
 *   )}
 * </div>
 * 
 * @example
 * // Exemplo com formatação personalizada
 * <div className="flex flex-col gap-4">
 *   <Label size="sm" className="text-muted-foreground">Pequeno e discreto</Label>
 *   <Label size="md" bold>Médio em negrito</Label>
 *   <Label size="lg" uppercase color="primary" className="tracking-wider">
 *     Grande e destacado
 *   </Label>
 * </div>
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({
    className = '',
    bold = false,
    italic = false,
    color = 'default',
    size = 'md',
    required = false,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    children,
    ...props
  }, ref) => {
    /**
     * Mapeamento de variantes de cor
     * @private
     */
    const colorVariants = {
      /** Cor padrão do tema (preto/escuro) */
      default: 'text-foreground',
      /** Cor primária do tema (azul) */
      primary: 'text-primary',
      /** Cor para erros e alertas (vermelho) */
      destructive: 'text-destructive',
      /** Cor para texto secundário (cinza) */
      muted: 'text-muted-foreground',
    } as const

    /**
     * Mapeamento de tamanhos de fonte
     * @private
     */
    const sizeVariants = {
      /** Pequeno (0.75rem / 12px) */
      sm: 'text-xs',
      /** Médio (0.875rem / 14px - padrão) */
      md: 'text-sm',
      /** Grande (1rem / 16px) */
      lg: 'text-base',
    } as const

    /**
     * Combina todas as classes condicionais
     * @private
     */
    const baseClasses = [
      // Espaçamento e alinhamento
      'leading-none',
      // Estados de interação
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70',
      // Tipografia
      bold ? 'font-bold' : 'font-medium',
      // Estilos de texto
      italic && 'italic',
      uppercase && 'uppercase',
      lowercase && 'lowercase',
      capitalize && 'capitalize',
      // Aplica as variantes
      colorVariants[color],
      sizeVariants[size],
      // Transições suaves
      'transition-colors',
      // Classes personalizadas
      className
    ].filter(Boolean)

    return (
      <label
        ref={ref}
        className={cn(baseClasses)}
        // Suporta todas as propriedades padrão de um elemento label
        {...props}
      >
        {children}
        {/* Indicador de campo obrigatório */}
        {required && (
          <span 
            className="ml-1 text-destructive"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }
