import * as React from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

/**
 * Propriedades do componente Avatar
 * 
 * @interface AvatarProps
 * @extends {React.HTMLAttributes<HTMLSpanElement>}
 * @property {boolean} [asChild] - Se verdadeiro, renderiza o componente como seu filho direto
 * 
 * @example
 * // Exemplo básico
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * @example
 * // Exemplo com tamanho personalizado
 * <Avatar className="h-16 w-16">
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Se verdadeiro, renderiza o componente como seu filho direto */
  asChild?: boolean
}

/**
 * Componente de Avatar para exibir imagens de perfil do usuário.
 * Suporta fallback para quando a imagem não estiver disponível.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>CN</AvatarFallback>
 * </Avatar>
 * 
 * @example
 * // Exemplo com tamanho personalizado e borda
 * <Avatar className="h-16 w-16 border-2 border-primary">
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback className="text-lg font-bold">JD</AvatarFallback>
 * </Avatar>
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        // Estilos base
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        // Classes personalizadas
        className
      )}
      // Suporta todas as propriedades padrão de um elemento span
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

/**
 * Propriedades do componente AvatarImage
 * 
 * @interface AvatarImageProps
 * @extends {Omit<ImageProps, 'alt'>}
 * @property {string} [alt] - Texto alternativo para acessibilidade
 * 
 * @example
 * <AvatarImage 
 *   src="/user.jpg" 
 *   alt="User profile"
 *   className="border-2 border-white"
 * />
 */
interface AvatarImageProps extends Omit<ImageProps, 'alt'> {
  /** Texto alternativo para acessibilidade */
  alt?: string
}

/**
 * Componente para a imagem do avatar.
 * Deve ser usado como filho do componente Avatar.
 * 
 * @component
 * @example
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>CN</AvatarFallback>
 * </Avatar>
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "Avatar", ...props }, ref) => (
    <Image
      ref={ref}
      className={cn(
        // Garante que a imagem cubra todo o espaço disponível
        "aspect-square h-full w-full object-cover",
        // Classes personalizadas
        className
      )}
      // Texto alternativo para acessibilidade
      alt={alt}
      // Suporta todas as propriedades padrão do componente Image do Next.js
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

/**
 * Componente de fallback para quando a imagem do avatar não estiver disponível.
 * Exibe as iniciais ou um ícone como alternativa.
 * 
 * @component
 * @example
 * // Exibindo iniciais
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * @example
 * // Exibindo um ícone
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User" />
 *   <AvatarFallback>
 *     <User className="h-4 w-4" />
 *   </AvatarFallback>
 * </Avatar>
 */
const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // Estilos base
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
      // Classes personalizadas
      className
    )}
    // Suporta todas as propriedades padrão de um elemento span
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

// Exporta os componentes
const AvatarComponent = {
  Root: Avatar,
  Image: AvatarImage,
  Fallback: AvatarFallback
}

export { 
  Avatar as Root, 
  AvatarImage as Image, 
  AvatarFallback as Fallback,
  AvatarComponent as Avatar
}

export type { 
  AvatarProps, 
  AvatarImageProps 
}
