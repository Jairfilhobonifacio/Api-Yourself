import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Tipos de variantes disponíveis para o componente Badge
 * @typedef {'default' | 'secondary' | 'destructive' | 'outline'} BadgeVariant
 */
type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

/**
 * Propriedades do componente Badge
 * 
 * @interface BadgeProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {BadgeVariant} [variant='default'] - Define o estilo visual do badge
 * @property {React.ReactNode} [children] - Conteúdo a ser exibido dentro do badge
 * 
 * @example
 * // Exemplo básico
 * <Badge>Novo</Badge>
 * 
 * @example
 * // Exemplo com variante secundária
 * <Badge variant="secondary">Em andamento</Badge>
 * 
 * @example
 * // Exemplo com variante destrutiva e classe personalizada
 * <Badge variant="destructive" className="uppercase">Urgente</Badge>
 * 
 * @example
 * // Exemplo com ícone
 * <Badge>
 *   <CheckCircle className="mr-1 h-3 w-3" />
 *   Concluído
 * </Badge>
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Define o estilo visual do badge */
  variant?: BadgeVariant
  /** Conteúdo a ser exibido dentro do badge */
  children?: React.ReactNode
}

/**
 * Componente de Badge para destacar informações importantes ou status.
 * Pode ser usado para indicar estados, categorias, contadores, etc.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Badge>Novo</Badge>
 * 
 * @example
 * // Exemplo com diferentes variantes
 * <div className="flex gap-2">
 *   <Badge>Padrão</Badge>
 *   <Badge variant="secondary">Secundário</Badge>
 *   <Badge variant="destructive">Erro</Badge>
 *   <Badge variant="outline">Rascunho</Badge>
 * </div>
 * 
 * @example
 * // Exemplo com ícone e contador
 * <Badge className="gap-1">
 *   <Bell className="h-3 w-3" />
 *   <span>3 notificações</span>
 * </Badge>
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    /**
     * Estilos base para o componente Badge
     * @private
     */
    const baseStyles = [
      // Layout e tipografia
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      // Transições e interações
      "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    ].join(" ")

    /**
     * Mapeamento de estilos para cada variante de Badge
     * @private
     */
    const variantStyles = {
      // Estilo padrão (azul)
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      // Estilo secundário (cinza)
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      // Estilo para erros/alertas (vermelho)
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      // Estilo de contorno (borda com fundo transparente)
      outline: "text-foreground"
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Estilos base
          baseStyles,
          // Estilo da variante selecionada (ou padrão se não encontrada)
          variantStyles[variant] || variantStyles.default,
          // Classes personalizadas
          className
        )}
        // Suporta todas as propriedades padrão de um elemento div
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Define o nome de exibição para melhor depuração no React DevTools
Badge.displayName = "Badge"

// Exporta o componente e seus tipos
export { Badge }
export type { BadgeProps, BadgeVariant }
