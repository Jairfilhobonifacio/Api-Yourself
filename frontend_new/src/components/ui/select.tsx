import * as React from 'react';

// Tipos para as opções do Select
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Tipos para as propriedades do Select
type SelectHTMLAttributesWithoutSize = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

export interface SelectProps extends SelectHTMLAttributesWithoutSize {
  /** Se verdadeiro, exibe um estado de erro */
  error?: boolean;
  /** Tamanho do select */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Opções do select */
  options: SelectOption[];
  /** Texto do placeholder */
  placeholder?: string;
  /** Se verdadeiro, desabilita o select */
  disabled?: boolean;
  /** Valor selecionado */
  value?: string | number;
  /** Função chamada quando o valor muda */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className = '',
    error = false,
    inputSize = 'md',
    options = [],
    placeholder = 'Selecione uma opção',
    disabled = false,
    value = '',
    onChange,
    ...props
  }, ref) => {
    // Mapeamento de tamanhos
    const sizeClasses = {
      sm: 'h-8 text-xs px-2',
      md: 'h-10 text-sm px-3',
      lg: 'h-12 text-base px-4',
    };

    // Classes base
    const baseClasses = [
      'flex',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'ring-offset-background',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      error ? 'border-destructive' : '',
      sizeClasses[inputSize],
      className
    ].filter(Boolean).join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <select
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
