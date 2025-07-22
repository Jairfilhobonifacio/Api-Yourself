import * as React from 'react';

/**
 * Interface para os itens de aba
 * 
 * @interface TabItem
 * @property {string} value - Identificador único da aba
 * @property {string | React.ReactNode} label - Rótulo da aba (pode ser texto ou ReactNode)
 * @property {boolean} [disabled] - Se verdadeiro, desabilita esta aba específica
 * @property {React.ReactNode} [icon] - Ícone opcional para exibir ao lado do rótulo
 * @property {React.ReactNode} [content] - Conteúdo da aba (opcional, pode ser definido aqui ou como children)
 * 
 * @example
 * const tabItems = [
 *   {
 *     value: 'profile',
 *     label: 'Perfil',
 *     icon: <UserIcon className="h-4 w-4" />,
 *     content: <ProfileForm />
 *   },
 *   {
 *     value: 'settings',
 *     label: 'Configurações',
 *     icon: <SettingsIcon className="h-4 w-4" />,
 *     content: <SettingsForm />
 *   }
 * ];
 */
export interface TabItem {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

/**
 * Propriedades do componente Tabs
 * 
 * @interface TabsProps
 * @extends {Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>}
 * @property {TabItem[]} items - Array de itens de aba
 * @property {string} [value] - Valor da aba ativa (modo controlado)
 * @property {string} [defaultValue] - Valor padrão quando não controlado
 * @property {(value: string) => void} [onChange] - Callback chamado quando a aba ativa muda
 * @property {boolean} [disabled=false] - Se verdadeiro, desabilita todas as abas
 * @property {'default' | 'underline' | 'pills'} [variant='default'] - Estilo visual das abas
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Tamanho das abas
 * @property {'top' | 'left' | 'right' | 'bottom'} [position='top'] - Posição das abas em relação ao conteúdo
 * @property {boolean} [bordered=true] - Se verdadeiro, exibe uma borda ao redor das abas
 * @property {boolean} [fullWidth=false] - Se verdadeiro, as abas preenchem toda a largura disponível
 * @property {string} [tabsClassName] - Classe CSS adicional para o container das abas
 * @property {string} [contentClassName] - Classe CSS adicional para o conteúdo
 * 
 * @example
 * // Exemplo básico
 * <Tabs
 *   items={[
 *     { value: 'tab1', label: 'Aba 1', content: <div>Conteúdo 1</div> },
 *     { value: 'tab2', label: 'Aba 2', content: <div>Conteúdo 2</div> },
 *   ]}
 * />
 * 
 * @example
 * // Exemplo com posicionamento à esquerda e estilo pills
 * <Tabs
 *   variant="pills"
 *   position="left"
 *   items={[
 *     { value: 'profile', label: 'Perfil', icon: <UserIcon /> },
 *     { value: 'settings', label: 'Configurações', icon: <SettingsIcon /> },
 *   ]}
 * >
 *   {activeTab === 'profile' && <ProfileForm />}
 *   {activeTab === 'settings' && <SettingsForm />}
 * </Tabs>
 */
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

/**
 * Componente Tabs para organizar o conteúdo em abas navegáveis.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Tabs
 *   items={[
 *     { value: 'tab1', label: 'Aba 1', content: <div>Conteúdo 1</div> },
 *     { value: 'tab2', label: 'Aba 2', content: <div>Conteúdo 2</div> },
 *   ]}
 * />
 * 
 * @example
 * // Exemplo com posicionamento à esquerda e estilo pills
 * <Tabs
 *   variant="pills"
 *   position="left"
 *   items={[
 *     { value: 'profile', label: 'Perfil', icon: <UserIcon /> },
 *     { value: 'settings', label: 'Configurações', icon: <SettingsIcon /> },
 *   ]}
 * >
 *   {activeTab === 'profile' && <ProfileForm />}
 *   {activeTab === 'settings' && <SettingsForm />}
 * </Tabs>
 * 
 * @param {TabsProps} props - As propriedades do componente
 * @param {React.Ref<HTMLDivElement>} ref - Referência para o elemento container
 * @returns {JSX.Element} O componente Tabs renderizado
 */
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
    // Determina se o componente é controlado (gerenciado pelo pai)
    const isControlled = controlledValue !== undefined;
    
    // Estado interno para o modo não controlado
    const [activeTab, setActiveTab] = React.useState<string>(
      isControlled ? controlledValue : defaultValue || (items[0]?.value || '')
    );

    /**
     * Efeito que sincroniza a aba ativa quando o valor controlado muda
     */
    React.useEffect(() => {
      if (isControlled) {
        setActiveTab(controlledValue);
      }
    }, [controlledValue, isControlled]);

    /**
     * Mapeamento de classes CSS para diferentes tamanhos de abas
     * @type {Record<'sm' | 'md' | 'lg', string>}
     */
    const sizeClasses = {
      sm: 'text-xs py-1.5 px-3',    // Pequeno
      md: 'text-sm py-2 px-4',      // Médio (padrão)
      lg: 'text-base py-2.5 px-5',  // Grande
    };

    /**
     * Mapeamento de classes CSS para diferentes variantes de estilo
     * @type {Record<'default' | 'underline' | 'pills', (isActive: boolean) => string>}
     */
    const variantClasses = {
      // Estilo padrão com fundo sutil na aba ativa
      default: (isActive: boolean) =>
        `${
          isActive
            ? 'border-primary text-primary font-medium bg-primary/5'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`,
      
      // Estilo com sublinhado na aba ativa
      underline: (isActive: boolean) =>
        `border-b-2 ${
          isActive
            ? 'border-primary text-primary font-medium'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
        }`,
      
      // Estilo de pílulas arredondadas
      pills: (isActive: boolean) =>
        `${
          isActive
            ? 'bg-primary text-primary-foreground font-medium'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`,
    };

    /**
     * Mapeamento de classes para diferentes posições das abas
     * @type {Record<'top' | 'bottom' | 'left' | 'right', string>}
     */
    const positionClasses = {
      top: 'flex-col',         // Abas no topo (padrão)
      bottom: 'flex-col-reverse', // Abas na base
      left: 'flex-row',        // Abas à esquerda
      right: 'flex-row-reverse', // Abas à direita
    };

    /**
     * Manipulador de mudança de aba
     * @param {string} tabValue - Valor da aba selecionada
     */
    const handleTabChange = (tabValue: string) => {
      // Atualiza o estado interno apenas se não for controlado
      if (!isControlled) {
        setActiveTab(tabValue);
      }
      
      // Chama o callback de mudança, se fornecido
      if (onChange) {
        onChange(tabValue);
      }
    };

    // Encontra o conteúdo da aba ativa (pode vir de items ou children)
    const activeContent = items.find((tab) => tab.value === activeTab)?.content || children;

    return (
      <div
        ref={ref}
        className={`flex ${positionClasses[position]} gap-2 ${className}`}
        role="tablist"
        aria-orientation={position === 'left' || position === 'right' ? 'vertical' : 'horizontal'}
        {...props}
      >
        {/* Container das abas */}
        <div
          className={`flex ${
            position === 'left' || position === 'right' ? 'flex-col' : 'flex-row'
          } ${bordered ? 'border-b' : ''} ${fullWidth ? 'w-full' : 'w-auto'} ${
            position === 'left' || position === 'right' ? 'w-48' : ''
          } ${tabsClassName}`}
          role="tablist"
          aria-orientation={position === 'left' || position === 'right' ? 'vertical' : 'horizontal'}
        >
          {items.map((tab) => {
            const isActive = activeTab === tab.value;
            const isDisabled = disabled || tab.disabled;
            const tabId = `tab-${tab.value}`;
            const panelId = `panel-${tab.value}`;

            return (
              <button
                key={tab.value}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                className={[
                  'flex items-center justify-center gap-2',
                  'whitespace-nowrap',
                  'transition-colors duration-200',
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
                tabIndex={isActive ? 0 : -1}
              >
                {tab.icon && (
                  <span 
                    className="flex-shrink-0"
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Conteúdo da aba ativa */}
        {activeContent && (
          <div
            id={`panel-${activeTab}`}
            className={`flex-1 ${
              position === 'left' || position === 'right' ? 'p-4' : 'pt-4'
            } ${contentClassName}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
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
