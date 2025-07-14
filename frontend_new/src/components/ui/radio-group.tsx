import * as React from 'react';

// Tipos para as opções do RadioGroup
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

// Tipos para as propriedades do RadioGroup
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Nome do grupo de rádio */
  name: string;
  /** Opções do grupo de rádio */
  options: RadioOption[];
  /** Valor selecionado */
  value?: string;
  /** Valor padrão quando não controlado */
  defaultValue?: string;
  /** Função chamada quando o valor muda */
  onChange?: (value: string) => void;
  /** Se verdadeiro, desabilita todas as opções */
  disabled?: boolean;
  /** Orientação do grupo */
  orientation?: 'horizontal' | 'vertical';
  /** Tamanho dos botões de rádio */
  size?: 'sm' | 'md' | 'lg';
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    className = '',
    name,
    options = [],
    value: controlledValue,
    defaultValue = '',
    onChange,
    disabled = false,
    orientation = 'vertical',
    size = 'md',
    ...props
  }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const value = isControlled ? controlledValue : internalValue;

    // Tamanhos dos elementos
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Classes base para o container
    const containerClasses = [
      'flex',
      'gap-4',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      className,
    ].filter(Boolean).join(' ');

    const handleChange = (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      if (onChange) {
        onChange(optionValue);
      }
    };

    return (
      <div 
        ref={ref} 
        className={containerClasses}
        role="radiogroup"
        aria-orientation={orientation}
        {...props}
      >
        {options.map((option) => {
          const isChecked = value === option.value;
          const isOptionDisabled = disabled || option.disabled;
          
          return (
            <label 
              key={option.value}
              className={[
                'flex items-start gap-3',
                'cursor-pointer',
                isOptionDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80',
                'transition-opacity',
              ].filter(Boolean).join(' ')}
            >
              <div className="flex items-center h-5">
                <div 
                  className={[
                    'relative',
                    'rounded-full',
                    'border-2',
                    'flex items-center justify-center',
                    'transition-colors',
                    isChecked ? 'border-primary' : 'border-input',
                    isOptionDisabled ? 'opacity-60' : '',
                    sizeClasses[size],
                  ].filter(Boolean).join(' ')}
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    onChange={() => !isOptionDisabled && handleChange(option.value)}
                    disabled={isOptionDisabled}
                    className="sr-only"
                  />
                  {isChecked && (
                    <div 
                      className={[
                        'rounded-full',
                        'bg-primary',
                        'transition-transform',
                        size === 'sm' ? 'w-1.5 h-1.5' :
                        size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5',
                      ].filter(Boolean).join(' ')}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className={[
                  'font-medium',
                  'text-foreground',
                  isOptionDisabled ? 'opacity-70' : '',
                ].filter(Boolean).join(' ')}>
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {option.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
