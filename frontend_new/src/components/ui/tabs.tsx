import * as React from 'react';

// Tipos para as abas
export interface TabItem {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

// Tipos para as propriedades do Tabs
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Itens das abas */
  items: TabItem[];
  /** Valor da aba ativa */
  value?: string;
  /** Valor padrão quando não controlado */
  defaultValue?: string;
  /** Função chamada quando a aba ativa muda */
  onChange?: (value: string) => void;
  /** Se verdadeiro, desabilita todas as abas */
  disabled?: boolean;
  /** Estilo das abas */
  variant?: 'default' | 'underline' | 'pills';
  /** Tamanho das abas */
  size?: 'sm' | 'md' | 'lg';
  /** Posição das abas */
  position?: 'top' | 'left' | 'right' | 'bottom';
  /** Se verdadeiro, mostra a borda */
  bordered?: boolean;
  /** Se verdadeiro, preenche a largura disponível */
  fullWidth?: boolean;
  /** Classe personalizada para o container das abas */
  tabsClassName?: string;
  /** Classe personalizada para o conteúdo */
  contentClassName?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    className = '',
    items = [],
    value: controlledValue,
    defaultValue = '',
    onChange,
    disabled = false,
    variant = 'default',
    size = 'md',
    position = 'top',
    bordered = true,
    fullWidth = false,
    tabsClassName = '',
    contentClassName = '',
    children,
    ...props
  }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [activeTab, setActiveTab] = React.useState<string>(
      isControlled ? controlledValue : defaultValue || (items[0]?.value || '')
    );

    // Atualiza a aba ativa quando o valor controlado muda
    React.useEffect(() => {
      if (isControlled) {
        setActiveTab(controlledValue);
      }
    }, [controlledValue, isControlled]);

    // Tamanhos
    const sizeClasses = {
      sm: 'text-xs py-1.5 px-3',
      md: 'text-sm py-2 px-4',
      lg: 'text-base py-2.5 px-5',
    };

    // Estilos de variante
    const variantClasses = {
      default: (isActive: boolean) =>
        `${
          isActive
            ? 'border-primary text-primary font-medium bg-primary/5'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`,
      underline: (isActive: boolean) =>
        `border-b-2 ${
          isActive
            ? 'border-primary text-primary font-medium'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
        }`,
      pills: (isActive: boolean) =>
        `${
          isActive
            ? 'bg-primary text-primary-foreground font-medium'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`,
    };

    // Posicionamento
    const positionClasses = {
      top: 'flex-col',
      bottom: 'flex-col-reverse',
      left: 'flex-row',
      right: 'flex-row-reverse',
    };

    const handleTabChange = (tabValue: string) => {
      if (!isControlled) {
        setActiveTab(tabValue);
      }
      if (onChange) {
        onChange(tabValue);
      }
    };

    // Encontra o conteúdo da aba ativa
    const activeContent = items.find((tab) => tab.value === activeTab)?.content || children;

    return (
      <div
        ref={ref}
        className={`flex ${positionClasses[position]} gap-2 ${className}`}
        {...props}
      >
        <div
          className={`flex ${
            position === 'left' || position === 'right' ? 'flex-col' : 'flex-row'
          } ${bordered ? 'border-b' : ''} ${fullWidth ? 'w-full' : 'w-auto'} ${
            position === 'left' || position === 'right' ? 'w-48' : ''
          } ${tabsClassName}`}
        >
          {items.map((tab) => {
            const isActive = activeTab === tab.value;
            const isDisabled = disabled || tab.disabled;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                className={[
                  'flex items-center justify-center gap-2',
                  'whitespace-nowrap',
                  'transition-colors',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-ring',
                  'focus-visible:ring-offset-2',
                  'disabled:opacity-50',
                  'disabled:pointer-events-none',
                  variant === 'pills' ? 'rounded-full' : 'rounded-t-md',
                  variantClasses[variant](isActive),
                  sizeClasses[size],
                  fullWidth ? 'flex-1' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => !isDisabled && handleTabChange(tab.value)}
              >
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        {activeContent && (
          <div
            className={`flex-1 ${position === 'left' || position === 'right' ? 'p-4' : 'pt-4'} ${contentClassName}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeContent}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs };
