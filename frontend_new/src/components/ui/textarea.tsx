import * as React from 'react';

// Tipos para as propriedades do Textarea
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Se verdadeiro, aplica estilos de erro ao textarea */
  error?: boolean;
  /** Tamanho do textarea */
  size?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className = '', 
    error = false, 
    size = 'md',
    ...props 
  }, ref) => {
    // Classes base para o textarea
    const baseClasses = [
      'flex',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'ring-offset-background',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      error ? 'border-destructive' : '',
    ];

    // Classes de tamanho
    const sizeClasses = {
      sm: 'min-h-[60px] px-2 py-1 text-xs',
      md: 'min-h-[80px] px-3 py-2 text-sm',
      lg: 'min-h-[100px] px-4 py-3 text-base',
    };

    return (
      <textarea
        className={[...baseClasses, sizeClasses[size], className].filter(Boolean).join(' ')}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
