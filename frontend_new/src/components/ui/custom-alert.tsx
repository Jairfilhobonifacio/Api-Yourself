import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Tipos de variantes disponíveis para o componente Alert
 * @typedef {'default' | 'destructive'} AlertVariant
 */
type AlertVariant = "default" | "destructive"

/**
 * Propriedades do componente Alert
 * 
 * @interface AlertProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {AlertVariant} [variant='default'] - Define a variante de estilo do alerta
 * @property {React.ReactNode} [icon] - Ícone opcional a ser exibido no canto superior esquerdo
 * 
 * @example
 * // Exemplo básico
 * <Alert>
 *   <AlertTitle>Alerta</AlertTitle>
 *   <AlertDescription>Esta é uma mensagem de alerta importante.</AlertDescription>
 * </Alert>
 * 
 * @example
 * // Exemplo com variante destrutiva e ícone
 * <Alert variant="destructive" icon={<AlertCircle className="h-4 w-4" />}>
 *   <AlertTitle>Erro</AlertTitle>
 *   <AlertDescription>Ocorreu um erro ao processar sua solicitação.</AlertDescription>
 * </Alert>
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Define a variante de estilo do alerta */
  variant?: AlertVariant
  /** 
   * Ícone opcional a ser exibido no canto superior esquerdo.
   * Deve ser um componente React que aceita a prop `className`.
   */
  icon?: React.ReactNode
}

/**
 * Componente de Alerta para exibir mensagens importantes para o usuário.
 * Suporta diferentes variantes de estilo e pode incluir um ícone opcional.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Alert>
 *   <AlertTitle>Atenção</AlertTitle>
 *   <AlertDescription>Esta é uma mensagem informativa importante.</AlertDescription>
 * </Alert>
 * 
 * @example
 * // Exemplo com variante destrutiva
 * <Alert variant="destructive">
 *   <AlertTitle>Erro</AlertTitle>
 *   <AlertDescription>Não foi possível completar a operação.</AlertDescription>
 * </Alert>
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, icon, ...props }, ref) => {
    /**
     * Estilos base para o componente Alert
     * @private
     */
    const baseStyles = [
      // Layout e espaçamento
      "relative w-full rounded-lg border p-4",
      // Ajustes de posicionamento para o ícone
      "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px]",
      // Estilos para o ícone
      "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"
    ].join(" ")

    /**
     * Mapeamento de estilos para cada variante de alerta
     * @private
     */
    const variantStyles = {
      // Estilo padrão (neutro)
      default: "bg-background text-foreground border-border",
      // Estilo para erros/alertas importantes
      destructive:
        "bg-destructive/10 text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive"
    }

    /**
     * Renderiza o ícone do alerta com estilos consistentes
     * @private
     */
    const renderIcon = () => {
      if (!icon) return null;
      
      // Se for um elemento React, renderiza dentro de um span com as classes apropriadas
      if (React.isValidElement(icon)) {
        return (
          <span className="absolute left-4 top-4 flex h-4 w-4 items-center justify-center">
            {icon}
          </span>
        );
      }
      
      // Se não for um elemento React, renderiza como está
      return (
        <span className="absolute left-4 top-4 flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      );
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === 'destructive' ? 'assertive' : 'polite'}
        className={cn(
          // Estilos base
          baseStyles,
          // Estilos da variante selecionada
          variantStyles[variant],
          // Classes personalizadas
          className
        )}
        {...props}
      >
        {renderIcon()}
        <div 
          className={cn(
            // Adiciona padding à esquerda apenas se houver ícone
            icon && "pl-7",
            // Garante que o conteúdo seja acessível
            'flex flex-col gap-2'
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

/**
 * Componente para o título do Alert.
 * Deve ser usado como filho direto do componente Alert.
 * 
 * @component
 * @example
 * <Alert>
 *   <AlertTitle>Este é um título</AlertTitle>
 *   <AlertDescription>E esta é a descrição.</AlertDescription>
 * </Alert>
 */
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      // Estilos tipográficos para o título
      "mb-1 font-medium leading-none tracking-tight",
      // Classes personalizadas
      className
    )}
    // Garante a semântica correta para leitores de tela
    role="heading"
    aria-level={5}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * Componente para a descrição do Alert.
 * Deve ser usado como filho direto do componente Alert, geralmente após o AlertTitle.
 * 
 * @component
 * @example
 * <Alert>
 *   <AlertTitle>Atualização disponível</AlertTitle>
 *   <AlertDescription>
 *     Uma nova versão do aplicativo está disponível. Por favor, atualize para a versão mais recente.
 *   </AlertDescription>
 * </Alert>
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Estilos tipográficos para a descrição
      "text-sm [&_p]:leading-relaxed text-muted-foreground",
      // Classes personalizadas
      className
    )}
    // Melhora a acessibilidade para leitores de tela
    role="region"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

export type { AlertProps }
