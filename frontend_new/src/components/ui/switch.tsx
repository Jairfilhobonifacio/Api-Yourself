import * as React from 'react';

// Tipos para as propriedades do Switch
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  /** Se verdadeiro, o switch está ativado */
  checked?: boolean;
  /** Valor padrão quando não controlado */
  defaultChecked?: boolean;
  /** Função chamada quando o estado muda */
  onCheckedChange?: (checked: boolean) => void;
  /** Tamanho do switch */
  size?: 'sm' | 'md' | 'lg';
  /** Rótulo do switch */
  label?: string | React.ReactNode;
  /** Posição do rótulo */
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className = '',
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    size = 'md',
    label,
    labelPosition = 'right',
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked);
    const isControlled = checked !== undefined;

    // Atualiza o estado interno apenas se o componente não for controlado
    React.useEffect(() => {
      if (isControlled) {
        setIsChecked(checked);
      }
    }, [checked, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setIsChecked(e.target.checked);
      }
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    // Tamanhos do switch
    const sizeClasses = {
      sm: 'h-4 w-7',
      md: 'h-5 w-9',
      lg: 'h-6 w-11',
    };

    // Tamanhos do thumb (bolinha)
    const thumbSizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Posição do thumb baseada no estado
    const thumbPositionClasses = isChecked 
      ? size === 'sm' ? 'translate-x-3' : size === 'md' ? 'translate-x-4' : 'translate-x-5'
      : 'translate-x-0.5';

    // Classes base para o switch
    const switchClasses = [
      'relative',
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'rounded-full',
      'border-2',
      'border-transparent',
      'transition-colors',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      isChecked ? 'bg-primary' : 'bg-input',
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    // Classes para o thumb
    const thumbClasses = [
      'pointer-events-none',
      'block',
      'rounded-full',
      'bg-background',
      'shadow-lg',
      'ring-0',
      'transition-transform',
      thumbSizeClasses[size],
      thumbPositionClasses
    ].filter(Boolean).join(' ');

    const inputId = React.useId();

    return (
      <div className={`inline-flex items-center gap-2 ${disabled ? 'opacity-70' : ''}`}>
        {label && labelPosition === 'left' && (
          <label htmlFor={inputId} className="text-sm font-medium cursor-pointer">
            {label}
          </label>
        )}
        <div className={switchClasses}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          <span className={thumbClasses} />
        </div>
        {label && labelPosition === 'right' && (
          <label htmlFor={inputId} className="text-sm font-medium cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
