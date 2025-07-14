import * as React from 'react';

// Tipos para as propriedades do Checkbox
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Se verdadeiro, o checkbox está marcado */
  checked?: boolean;
  /** Função chamada quando o estado do checkbox muda */
  onCheckedChange?: (checked: boolean) => void;
  /** Rótulo do checkbox */
  label?: string | React.ReactNode;
  /** Se verdadeiro, o checkbox está em estado indeterminado */
  indeterminate?: boolean;
  /** Tamanho do checkbox */
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className = '',
    checked = false,
    onCheckedChange,
    label,
    disabled = false,
    indeterminate = false,
    size = 'md',
    ...props
  }, ref) => {
    // Mapeamento de tamanhos
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    } as const;
    
    // Obtém a classe de tamanho baseada no valor de size
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    // Classes base para o input
    const inputClasses = [
      'appearance-none',
      'rounded-sm',
      'border',
      'border-primary',
      'bg-background',
      'ring-offset-background',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'checked:bg-primary',
      'checked:text-primary-foreground',
      sizeClass,
      'checked:border-transparent',
      'indeterminate:bg-primary',
      'indeterminate:border-transparent',
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <label className={`inline-flex items-center gap-2 ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
        <div className="relative flex items-center">
          <input
            data-custom-size={size}
            ref={ref}
            type="checkbox"
            className={inputClasses}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-checked={indeterminate ? 'mixed' : checked}
            {...props}
          />
          {(checked || indeterminate) && (
            <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
              {indeterminate ? (
                <div className="h-0.5 w-2/3 bg-current rounded-full" />
              ) : (
                <svg 
                  className={`${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          )}
        </div>
        {label && (
          <span className="text-sm font-medium">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
