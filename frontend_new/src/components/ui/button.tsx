import * as React from "react"

// Tipos para as variantes e tamanhos do botão
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = "default", 
    size = "default", 
    asChild = false, 
    children,
    ...props 
  }, ref) => {
    // Mapeamento de variantes para classes do Tailwind
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
    }

    // Mapeamento de tamanhos para classes do Tailwind
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10 p-0",
    }

    // Classes base que todos os botões terão
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    // Combina todas as classes
    const buttonClasses = [
      baseClasses,
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className
    ].filter(Boolean).join(' ')

    // Se asChild for true, retornamos os children sem wrapper
    if (asChild) {
      if (React.isValidElement(children)) {
        return children;
      }
      console.warn('asChild requires a single React element as a child');
      return null;
    }

    // Botão padrão
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
