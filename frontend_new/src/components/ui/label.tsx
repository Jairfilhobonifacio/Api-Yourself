import * as React from "react"

// Tipos para as propriedades do Label
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Se verdadeiro, o texto ficará em negrito */
  bold?: boolean;
  /** Se verdadeiro, o texto ficará em itálico */
  italic?: boolean;
  /** Cor do texto */
  color?: 'default' | 'primary' | 'destructive' | 'muted';
  /** Tamanho do texto */
  size?: 'sm' | 'md' | 'lg';
  /** Se verdadeiro, o label será exibido como obrigatório */
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({
    className = '',
    bold = false,
    italic = false,
    color = 'default',
    size = 'md',
    required = false,
    children,
    ...props
  }, ref) => {
    // Mapeamento de cores
    const colorClasses = {
      default: 'text-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
    };

    // Mapeamento de tamanhos
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    // Classes base
    const baseClasses = [
      'leading-none',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70',
      bold ? 'font-bold' : 'font-medium',
      italic ? 'italic' : '',
      colorClasses[color],
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <label
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label }
