import * as React from 'react';

/**
 * Interface para as opções do RadioGroup
 * 
 * @interface RadioOption
 * @property {string} value - Valor único que identifica a opção
 * @property {string} label - Texto exibido ao lado do botão de rádio
 * @property {boolean} [disabled] - Se verdadeiro, desabilita esta opção específica
 * @property {string} [description] - Texto descritivo adicional abaixo do label
 * 
 * @example
 * const options = [
 *   { value: 'option1', label: 'Opção 1' },
 *   { 
 *     value: 'option2', 
 *     label: 'Opção 2',
 *     description: 'Descrição detalhada da opção 2'
 *   }
 * ];
 */
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

/**
 * Propriedades do componente RadioGroup
 * 
 * @interface RadioGroupProps
 * @extends {Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>}
 * @property {string} name - Nome do grupo de rádio (obrigatório para acessibilidade e agrupamento)
 * @property {RadioOption[]} options - Array de opções para exibir no grupo
 * @property {string} [value] - Valor da opção selecionada (componente controlado)
 * @property {string} [defaultValue] - Valor padrão quando não controlado
 * @property {(value: string) => void} [onChange] - Callback chamado quando a seleção muda
 * @property {boolean} [disabled=false] - Se verdadeiro, desabilita todas as opções
 * @property {'horizontal' | 'vertical'} [orientation='vertical'] - Direção de exibição das opções
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Tamanho dos botões de rádio
 * 
 * @example
 * // Exemplo básico
 * <RadioGroup
 *   name="tipo-conta"
 *   options={[
 *     { value: 'pessoa-fisica', label: 'Pessoa Física' },
 *     { value: 'pessoa-juridica', label: 'Pessoa Jurídica' }
 *   ]}
 *   onChange={(value) => console.log('Selecionado:', value)}
 * />
 * 
 * @example
 * // Exemplo avançado com opções desabilitadas e descrições
 * <RadioGroup
 *   name="tipo-plano"
 *   options={[
 *     { 
 *       value: 'basico', 
 *       label: 'Básico',
 *       description: 'Recursos essenciais para começar'
 *     },
 *     { 
 *       value: 'premium', 
 *       label: 'Premium',
 *       description: 'Recursos avançados para crescimento',
 *       disabled: !userCanUpgrade
 *     }
 *   ]}
 *   orientation="horizontal"
 *   size="lg"
 * />
 */
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

/**
 * Componente RadioGroup para seleção de uma única opção em um conjunto de opções mutuamente exclusivas.
 * 
 * @component
 * @example
 * // Exemplo básico de uso controlado
 * const [selected, setSelected] = React.useState('opcao1');
 * 
 * <RadioGroup
 *   name="opcoes"
 *   options={[
 *     { value: 'opcao1', label: 'Opção 1' },
 *     { value: 'opcao2', label: 'Opção 2' }
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * 
 * @example
 * // Exemplo com layout horizontal e tamanho personalizado
 * <RadioGroup
 *   name="tamanho"
 *   options={[
 *     { value: 'pequeno', label: 'Pequeno' },
 *     { value: 'medio', label: 'Médio' },
 *     { value: 'grande', label: 'Grande' }
 *   ]}
 *   orientation="horizontal"
 *   size="lg"
 *   className="gap-6"
 * />
 * 
 * @param {RadioGroupProps} props - As propriedades do componente
 * @param {React.Ref<HTMLDivElement>} ref - Referência para o elemento container
 * @returns {JSX.Element} O componente RadioGroup renderizado
 */
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
    // Determina se o componente é controlado (gerenciado pelo pai)
    const isControlled = controlledValue !== undefined;
    
    // Estado interno para o modo não controlado
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    
    // Valor atual (controlado ou não controlado)
    const value = isControlled ? controlledValue : internalValue;

    /**
     * Mapeamento de classes CSS para diferentes tamanhos de botões de rádio
     * @type {Record<'sm' | 'md' | 'lg', string>}
     */
    const sizeClasses = {
      sm: 'h-3 w-3',   // Pequeno
      md: 'h-4 w-4',   // Médio (padrão)
      lg: 'h-5 w-5',   // Grande
    };

    /**
     * Classes CSS para o container principal
     * @type {string}
     */
    const containerClasses = [
      'flex',
      'gap-4',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      className,
    ].filter(Boolean).join(' ');

    /**
     * Manipulador de mudança de seleção
     * @param {string} optionValue - Valor da opção selecionada
     */
    const handleChange = (optionValue: string) => {
      // Atualiza o estado interno apenas se não for controlado
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      
      // Chama o callback de mudança, se fornecido
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
        aria-label={props['aria-label'] || name}
        {...props}
      >
        {options.map((option) => {
          const isChecked = value === option.value;
          const isOptionDisabled = disabled || option.disabled;
          const optionId = `${name}-${option.value}`;
          
          return (
            <label 
              key={option.value}
              htmlFor={optionId}
              className={[
                'flex items-start gap-3 p-2 rounded-md',
                'transition-colors',
                isOptionDisabled 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'cursor-pointer hover:bg-accent/50',
              ].filter(Boolean).join(' ')}
            >
              {/* Container do botão de rádio personalizado */}
              <div className="flex items-center h-5 mt-0.5">
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
                  aria-hidden="true"
                >
                  {/* Indicador de seleção */}
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
                
                {/* Input de rádio real (escondido visualmente) */}
                <input
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => !isOptionDisabled && handleChange(option.value)}
                  disabled={isOptionDisabled}
                  className="sr-only"
                  aria-describedby={option.description ? `${optionId}-description` : undefined}
                />
              </div>
              
              {/* Conteúdo do rótulo */}
              <div className="flex-1">
                <div 
                  className={[
                    'font-medium',
                    'text-foreground',
                    isOptionDisabled ? 'opacity-70' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {option.label}
                </div>
                
                {/* Descrição opcional */}
                {option.description && (
                  <div 
                    id={`${optionId}-description`}
                    className="text-sm text-muted-foreground mt-0.5"
                  >
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
