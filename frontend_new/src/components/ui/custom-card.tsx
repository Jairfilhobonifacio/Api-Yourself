// Importações de bibliotecas e utilitários
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Propriedades do componente Card
 * @extends React.HTMLAttributes<HTMLDivElement>
 * 
 * @property {boolean} [hoverEffect=true] - Se verdadeiro, adiciona um efeito de hover sutil
 * @property {boolean} [noPadding=false] - Se verdadeiro, remove o padding interno do card
 * 
 * @example
 * // Card simples com hover
 * <Card>
 *   <p>Conteúdo do card</p>
 * </Card>
 * 
 * @example
 * // Card sem efeito de hover e sem padding
 * <Card hoverEffect={false} noPadding>
 *   <p>Conteúdo sem padding</p>
 * </Card>
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  noPadding?: boolean;
}

/**
 * Componente Card para agrupar e exibir conteúdo relacionado de forma organizada.
 * Fornece uma superfície visual distinta com sombra e borda, podendo conter
 * cabeçalho, conteúdo e rodapé.
 * 
 * @component
 * @example
 * // Uso básico
 * <Card>
 *   <p>Conteúdo do card</p>
 * </Card>
 * 
 * @example
 * // Card completo com todas as seções
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título do Card</CardTitle>
 *     <CardDescription>Descrição detalhada do conteúdo do card</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Conteúdo principal do card aqui. Pode conter qualquer elemento React.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="outline">Ação</Button>
 *   </CardFooter>
 * </Card>
 * 
 * @example
 * // Card sem efeito de hover e com padding personalizado
 * <Card hoverEffect={false} className="bg-blue-50">
 *   <CardContent className="p-4">
 *     <p>Card com fundo azul claro e padding personalizado</p>
 *   </CardContent>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,           // Classes CSS adicionais
    hoverEffect = true, // Se verdadeiro, adiciona efeito de hover
    noPadding = false,  // Se verdadeiro, remove o padding interno
    ...props            // Outras propriedades HTML
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Estilos base do card
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          
          // Efeito de hover condicional
          hoverEffect && "transition-colors hover:border-primary/50",
          
          // Padding condicional
          !noPadding && "p-6",
          
          // Classes personalizadas
          className
        )}
        {...props}
      />
    )
  }
)
// Define o nome de exibição para facilitar a depuração no React DevTools
Card.displayName = "Card"

/**
 * Componente para o cabeçalho do card. Deve ser usado como primeiro filho do Card.
 * Geralmente contém o CardTitle e CardDescription.
 * 
 * @component
 * @example
 * <CardHeader>
 *   <CardTitle>Título</CardTitle>
 *   <CardDescription>Descrição opcional</CardDescription>
 * </CardHeader>
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ 
  className,  // Classes CSS adicionais
  ...props   // Outras propriedades HTML
}, ref) => (
  <div
    ref={ref}
    className={cn(
      // Estilos base do cabeçalho
      "flex flex-col space-y-1.5 pb-4",
      className
    )}
    {...props}
  />
))
// Define o nome de exibição para facilitar a depuração
CardHeader.displayName = "CardHeader"

/**
 * Componente para o título do card. Deve ser usado dentro de CardHeader.
 * 
 * @component
 * @example
 * <CardTitle>Título do Card</CardTitle>
 * 
 * @example
 * // Com classe personalizada
 * <CardTitle className="text-xl text-blue-600">Título Azul</CardTitle>
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ 
  className,  // Classes CSS adicionais
  ...props   // Outras propriedades HTML
}, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Estilos base do título
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
// Define o nome de exibição para facilitar a depuração
CardTitle.displayName = "CardTitle"

/**
 * Componente para a descrição do card. Deve ser usado dentro de CardHeader,
 * geralmente abaixo do CardTitle.
 * 
 * @component
 * @example
 * <CardDescription>Esta é uma descrição detalhada do conteúdo do card.</CardDescription>
 * 
 * @example
 * // Com classe personalizada
 * <CardDescription className="text-gray-500">Descrição em cinza</CardDescription>
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ 
  className,  // Classes CSS adicionais
  ...props   // Outras propriedades HTML
}, ref) => (
  <p
    ref={ref}
    className={cn(
      // Estilos base da descrição
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
// Define o nome de exibição para facilitar a depuração
CardDescription.displayName = "CardDescription"

/**
 * Componente para o conteúdo principal do card. Deve conter o conteúdo principal
 * que você deseja exibir no card.
 * 
 * @component
 * @example
 * <CardContent>
 *   <p>Este é o conteúdo principal do card.</p>
 *   <p>Pode conter múltiplos elementos.</p>
 * </CardContent>
 * 
 * @example
 * // Com classe personalizada
 * <CardContent className="space-y-4">
 *   <p>Item 1</p>
 *   <p>Item 2</p>
 * </CardContent>
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ 
  className,  // Classes CSS adicionais
  ...props   // Outras propriedades HTML
}, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // Estilos base do conteúdo
      "pt-0", // Reset do padding-top para controle pelo CardHeader
      className
    )} 
    {...props} 
  />
))
// Define o nome de exibição para facilitar a depuração
CardContent.displayName = "CardContent"

/**
 * Componente para o rodapé do card. Geralmente contém ações ou informações adicionais.
 * 
 * @component
 * @example
 * <CardFooter>
 *   <Button variant="outline">Cancelar</Button>
 *   <Button className="ml-2">Salvar</Button>
 * </CardFooter>
 * 
 * @example
 * // Com alinhamento à direita
 * <CardFooter className="justify-end">
 *   <Button>Confirmar</Button>
 * </CardFooter>
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ 
  className,  // Classes CSS adicionais
  ...props   // Outras propriedades HTML
}, ref) => (
  <div
    ref={ref}
    className={cn(
      // Estilos base do rodapé
      "flex items-center pt-4 mt-auto",
      className
    )}
    {...props}
  />
))
// Define o nome de exibição para facilitar a depuração
CardFooter.displayName = "CardFooter"

// Exporta todos os componentes relacionados ao Card
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
}

export type {
  CardProps
}
