// Importações de bibliotecas e utilitários
import { X } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

// Tipo para o retorno do setTimeout/setInterval
/** @internal */
type Timeout = ReturnType<typeof setTimeout>

/**
 * Variantes de estilização disponíveis para o Toast
 */
type ToastVariant = "default" | "destructive"

/**
 * Propriedades do componente Toast
 * @extends React.HTMLAttributes<HTMLDivElement>
 * 
 * @property {ToastVariant} [variant='default'] - Estilo visual do toast
 * @property {() => void} [onDismiss] - Função chamada quando o toast é fechado
 * @property {number} [duration=5000] - Duração em milissegundos até o toast fechar automaticamente (0 para não fechar)
 * @property {boolean} [showCloseButton=true] - Se verdadeiro, exibe o botão de fechar
 * @property {'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right'} [position='bottom-right'] - Posição do toast na tela
 * 
 * @example
 * // Toast simples
 * <Toast>Mensagem de sucesso</Toast>
 * 
 * @example
 * // Toast de erro com posição personalizada
 * <Toast 
 *   variant="destructive"
 *   position="top-center"
 *   duration={10000}
 * >
 *   <ToastTitle>Erro</ToastTitle>
 *   <ToastDescription>Ocorreu um erro ao processar sua solicitação.</ToastDescription>
 * </Toast>
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  onDismiss?: () => void;
  duration?: number;
  showCloseButton?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

/**
 * Componente Toast para exibir mensagens temporárias ao usuário.
 * Pode ser usado para feedback de ações, notificações e alertas.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Toast>Operação realizada com sucesso!</Toast>
 * 
 * @example
 * // Exemplo completo
 * <Toast
 *   variant="destructive"
 *   duration={10000}
 *   position="top-center"
 *   onDismiss={() => console.log('Toast fechado')}
 *   className="custom-toast"
 * >
 *   <ToastTitle>Erro</ToastTitle>
 *   <ToastDescription>Não foi possível salvar as alterações.</ToastDescription>
 * </Toast>
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({
    className,            // Classes CSS adicionais
    variant = 'default',  // Variante de estilo
    onDismiss,           // Callback quando o toast é fechado
    duration = 5000,     // Duração em ms (0 para não fechar automaticamente)
    showCloseButton = true, // Mostrar botão de fechar
    position = 'bottom-right', // Posição na tela
    children,            // Conteúdo do toast
    ...props            // Outras propriedades HTML
  }, ref) => {
    // Estado de visibilidade do toast
    const [isVisible, setIsVisible] = React.useState(true);
    // Ref para o timer de auto-destruição
    const timerRef = React.useRef<Timeout | null>(null);

    // Mapeamento de classes para posicionamento
    const positionClasses = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
    };

    // Mapeamento de classes para variantes de estilo
    const variantClasses = {
      default: 'bg-white text-gray-800 border border-gray-200',
      destructive: 'bg-red-50 text-red-800 border border-red-200',
    };

    /**
     * Função para fechar o toast
     * @private
     */
    const handleDismiss = React.useCallback(() => {
      // Inicia a animação de saída
      setIsVisible(false);
      
      // Chama o callback após um pequeno atraso para permitir a animação
      if (onDismiss) {
        setTimeout(() => onDismiss(), 200);
      }
    }, [onDismiss]);

    // Configura o timer para fechar automaticamente
    React.useEffect(() => {
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, duration);
      }

      // Limpa o timer quando o componente é desmontado
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, handleDismiss]);



    // Se não estiver visível, não renderiza nada
    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          // Estilos base do toast
          'fixed z-[100] flex max-w-sm w-full shadow-lg rounded-lg overflow-hidden transition-all duration-200',
          'animate-in slide-in-from-bottom-8', // Animações de entrada
          
          // Aplica as classes de posição e variante
          positionClasses[position],
          variantClasses[variant],
          
          // Classes personalizadas
          className
        )}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        <div className="flex-1 p-4">
          <div className="flex items-center">
            {/* Conteúdo principal do toast */}
            <div className="flex-1">
              {children}
            </div>
            
            {/* Botão de fechar */}
            {showCloseButton && (
              <button
                type="button"
                onClick={handleDismiss}
                className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
Toast.displayName = 'Toast'

/**
 * Provedor de contexto para gerenciar múltiplos toasts.
 * Este componente deve envolver sua aplicação para garantir que os toasts
 * sejam exibidos corretamente.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 * 
 * @example
 * // No seu App.tsx ou _app.tsx
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <RestoDaSuaAplicacao />
 *     </ToastProvider>
 *   );
 * }
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Container para agrupar múltiplos toasts em uma posição específica.
 * Deve ser colocado em algum lugar do seu layout principal.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right'} [props.position='bottom-right'] - Posição dos toasts na tela
 * 
 * @example
 * // No seu layout principal
 * <div>
 *   <Header />
 *   <main>{children}</main>
 *   <ToastViewport position="bottom-right" />
 * </div>
 */
export function ToastViewport({ 
  className,
  position = 'bottom-right',
  ...props 
}: { 
  className?: string;
  position?: ToastProps['position'];
}) {
  // Mapeamento de classes para posicionamento
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div 
      className={cn(
        // Estilos base do viewport
        'fixed z-[100] flex flex-col gap-2 p-4',
        
        // Aplica as classes de posição
        positionClasses[position],
        
        // Classes personalizadas
        className
      )}
      {...props}
    />
  );
}

/**
 * Componente para o título de um toast.
 * Deve ser usado dentro de um componente Toast.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.className] - Classes CSS adicionais
 * 
 * @example
 * <Toast>
 *   <ToastTitle>Título da Notificação</ToastTitle>
 *   <ToastDescription>Mensagem detalhada aqui</ToastDescription>
 * </Toast>
 */
export function ToastTitle({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Estilos base do título
        'text-sm font-semibold',
        className
      )}
      {...props}
    />
  );
}

/**
 * Componente para a descrição de um toast.
 * Deve ser usado dentro de um componente Toast, geralmente após o ToastTitle.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.className] - Classes CSS adicionais
 * 
 * @example
 * <Toast>
 *   <ToastTitle>Sucesso</ToastTitle>
 *   <ToastDescription>As alterações foram salvas com sucesso!</ToastDescription>
 * </Toast>
 */
export function ToastDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Estilos base da descrição
        'text-sm opacity-90',
        className
      )}
      {...props}
    />
  );
}

// Types are exported at their definition
// Components are exported at their definition
