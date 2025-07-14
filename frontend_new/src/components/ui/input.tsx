import * as React from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Se verdadeiro, aplica estilos de erro ao input */
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', error = false, ...props }, ref) => {
    // Classes base para o input
    const baseClasses = [
      'flex',
      'h-10',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm',
      'ring-offset-background',
      'file:border-0',
      'file:bg-transparent',
      'file:text-sm',
      'file:font-medium',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      error ? 'border-destructive' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <input
        type={type}
        className={baseClasses}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
