import * as React from 'react';

/**
 * Propriedades do componente Switch
 * 
 * @interface SwitchProps
 * @extends {Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'>}
 * @property {boolean} [checked] - Se verdadeiro, o switch está ativado (modo controlado)
 * @property {boolean} [defaultChecked=false] - Estado inicial quando não controlado
 * @property {(checked: boolean) => void} [onCheckedChange] - Callback chamado quando o estado muda
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Tamanho do switch
 * @property {string | React.ReactNode} [label] - Rótulo opcional para o switch
 * @property {'left' | 'right'} [labelPosition='right'] - Posição do rótulo em relação ao switch
 * @property {string} [className] - Classes CSS adicionais para personalização
 * 
 * @example
 * // Exemplo básico de uso não controlado
 * <Switch />
 * 
 * @example
 * // Exemplo controlado com estado
 * const [isEnabled, setIsEnabled] = React.useState(false);
 * 
 * <Switch 
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   label="Ativar notificações"
 *   labelPosition="left"
 * />
 * 
 * @example
 * // Exemplo com tamanho personalizado e desabilitado
 * <Switch
 *   size="lg"
 *   disabled
 *   defaultChecked
 *   label="Modo noturno"
 * />
 */
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

/**
 * Componente Switch que alterna entre dois estados (ligado/desligado).
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Switch />
 * 
 * @example
 * // Exemplo controlado com estado
 * const [isEnabled, setIsEnabled] = React.useState(false);
 * 
 * <Switch 
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   label="Ativar notificações"
 *   labelPosition="left"
 * />
 * 
 * @example
 * // Exemplo com tamanho personalizado e desabilitado
 * <Switch
 *   size="lg"
 *   disabled
 *   defaultChecked
 *   label="Modo noturno"
 * />
 * 
 * @param {SwitchProps} props - As propriedades do componente
 * @param {React.Ref<HTMLInputElement>} ref - Referência para o elemento input subjacente
 * @returns {JSX.Element} O componente Switch renderizado
 */
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
    // Estado interno para o modo não controlado
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked);
    
    // Determina se o componente é controlado (gerenciado pelo pai)
    const isControlled = checked !== undefined;

    /**
     * Efeito que sincroniza o estado interno quando o valor controlado muda
     */
    React.useEffect(() => {
      if (isControlled) {
        setIsChecked(checked);
      }
    }, [checked, isControlled]);

    /**
     * Manipulador de mudança do switch
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      
      // Atualiza o estado interno apenas se não for controlado
      if (!isControlled) {
        setIsChecked(newChecked);
      }
      
      // Chama o callback de mudança, se fornecido
      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
    };

    /**
     * Mapeamento de classes CSS para diferentes tamanhos do switch
     * @type {Record<'sm' | 'md' | 'lg', string>}
     */
    const sizeClasses = {
      sm: 'h-4 w-7',   // Pequeno
      md: 'h-5 w-9',   // Médio (padrão)
      lg: 'h-6 w-11',  // Grande
    };

    /**
     * Mapeamento de classes CSS para o thumb (bolinha) em diferentes tamanhos
     * @type {Record<'sm' | 'md' | 'lg', string>}
     */
    const thumbSizeClasses = {
      sm: 'h-3 w-3',   // Pequeno
      md: 'h-4 w-4',   // Médio (padrão)
      lg: 'h-5 w-5',   // Grande
    };

    /**
     * Calcula a posição do thumb com base no estado e tamanho
     * @type {string}
     */
    const thumbPositionClasses = isChecked 
      ? size === 'sm' ? 'translate-x-3' : 
        size === 'md' ? 'translate-x-4' : 'translate-x-5'
      : 'translate-x-0.5';

    /**
     * Classes CSS para o container do switch
     * @type {string}
     */
    const switchClasses = [
      // Layout e posicionamento
      'relative',
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'rounded-full',
      
      // Estilo base
      'border-2',
      'border-transparent',
      'transition-colors',
      
      // Estados de foco
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background',
      
      // Estados de desabilitado
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      
      // Estado ativo/inativo
      isChecked ? 'bg-primary' : 'bg-input',
      
      // Tamanho e classes personalizadas
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    /**
     * Classes CSS para o thumb (bolinha deslizante)
     * @type {string}
     */
    const thumbClasses = [
      // Layout e aparência
      'pointer-events-none',
      'block',
      'rounded-full',
      'bg-background',
      'shadow-lg',
      'ring-0',
      
      // Animações
      'transition-transform duration-200',
      
      // Tamanho e posição
      thumbSizeClasses[size],
      thumbPositionClasses
    ].filter(Boolean).join(' ');

    // Gera um ID único para acessibilidade
    const inputId = React.useId();

    return (
      <div 
        className={`inline-flex items-center gap-2 ${disabled ? 'opacity-70' : ''}`}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
      >
        {/* Rótulo à esquerda */}
        {label && labelPosition === 'left' && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium cursor-pointer select-none"
            aria-hidden={disabled}
          >
            {label}
          </label>
        )}
        
        {/* Switch principal */}
        <div className={switchClasses}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            role="switch"
            aria-checked={isChecked}
            {...props}
          />
          {/* Thumb (bolinha deslizante) */}
          <span 
            className={thumbClasses} 
            aria-hidden="true"
          />
        </div>
        
        {/* Rótulo à direita */}
        {label && labelPosition === 'right' && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium cursor-pointer select-none"
            aria-hidden={disabled}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
