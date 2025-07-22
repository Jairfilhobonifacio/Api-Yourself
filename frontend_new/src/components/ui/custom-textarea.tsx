import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Propriedades do componente Textarea
 * 
 * @interface TextareaProps
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 * @property {boolean} [error=false] - Se verdadeiro, aplica estilos de erro ao textarea
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Tamanho do textarea
 * @property {React.ReactNode} [icon] - Ícone opcional para ser exibido no canto superior direito
 * @property {number} [maxLength] - Número máximo de caracteres permitidos
 * @property {number} [charCount=0] - Contador de caracteres atuais (deve ser controlado externamente)
 * @property {boolean} [showCharCount=false] - Se verdadeiro, exibe o contador de caracteres
 * @property {string} [className] - Classes CSS adicionais para personalização
 * 
 * @example
 * // Exemplo básico
 * <Textarea placeholder="Digite sua mensagem" />
 * 
 * @example
 * // Textarea com validação de erro
 * <Textarea 
 *   error={!!formState.errors.description}
 *   placeholder="Descreva sua necessidade"
 * />
 * 
 * @example
 * // Textarea com contador de caracteres
 * const [value, setValue] = React.useState('');
 * 
 * <Textarea
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   maxLength={500}
 *   charCount={value.length}
 *   showCharCount
 *   placeholder="Digite até 500 caracteres"
 * />
 */
export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Se verdadeiro, aplica estilos de erro ao textarea */
  error?: boolean;
  /** Tamanho do textarea */
  size?: 'sm' | 'md' | 'lg';
  /** Ícone opcional para ser exibido no canto superior direito */
  icon?: React.ReactNode;
  /** Contador de caracteres (máximo) */
  maxLength?: number;
  /** Contador de caracteres (atual) */
  charCount?: number;
  /** Se verdadeiro, exibe o contador de caracteres */
  showCharCount?: boolean;
}

/**
 * Componente de textarea personalizado com suporte a temas, tamanhos, estados de erro e contagem de caracteres.
 * 
 * @component
 * @example
 * // Textarea controlado básico
 * const [value, setValue] = React.useState('');
 * 
 * <Textarea
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Digite sua mensagem"
 * />
 * 
 * @example
 * // Textarea com validação e feedback visual
 * const [formData, setFormData] = React.useState({ description: '' });
 * const [errors, setErrors] = React.useState({ description: false });
 * 
 * const handleSubmit = () => {
 *   if (formData.description.length < 10) {
 *     setErrors({ ...errors, description: true });
 *     return;
 *   }
 *   // Enviar dados...
 * };
 * 
 * <Textarea
 *   value={formData.description}
 *   onChange={(e) => {
 *     setFormData({ ...formData, description: e.target.value });
 *     if (errors.description) {
 *       setErrors({ ...errors, description: false });
 *     }
 *   }}
 *   error={errors.description}
 *   placeholder="Descreva com pelo menos 10 caracteres"
 * />
 * 
 * @example
 * // Textarea com contador de caracteres e ícone
 * const [bio, setBio] = React.useState('');
 * 
 * <Textarea
 *   value={bio}
 *   onChange={(e) => setBio(e.target.value)}
 *   maxLength={300}
 *   charCount={bio.length}
 *   showCharCount
 *   icon={<Info className="h-4 w-4" />}
 *   placeholder="Conte-nos sobre você..."
 *   className="resize-none" // Desabilita redimensionamento
 * />
 * 
 * @param {TextareaProps} props - As propriedades do componente
 * @param {React.Ref<HTMLTextAreaElement>} ref - Referência para o elemento textarea subjacente
 * @returns {JSX.Element} O componente Textarea renderizado
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className = '',
    error = false,
    size = 'md',
    icon,
    maxLength,
    charCount = 0,
    showCharCount = false,
    disabled = false,
    ...props
  }, ref) => {
    /**
     * Mapeamento de classes CSS para diferentes tamanhos de textarea
     * @type {Record<'sm' | 'md' | 'lg', string>}
     */
    const sizeClasses = {
      sm: 'min-h-[60px] px-3 py-2 text-sm',   // Pequeno - 60px de altura mínima
      md: 'min-h-[80px] px-4 py-3 text-base', // Médio (padrão) - 80px de altura mínima
      lg: 'min-h-[100px] px-5 py-4 text-lg',  // Grande - 100px de altura mínima
    };

    /**
     * Determina a cor do contador de caracteres com base na porcentagem de uso
     * @returns {string} Classe CSS para a cor do texto
     */
    const getCharCountColor = () => {
      if (!maxLength) return 'text-muted-foreground';
      const percentage = (charCount / maxLength) * 100;
      if (percentage > 90) return 'text-destructive';  // Vermelho para >90% de uso
      if (percentage > 75) return 'text-warning';      // Amarelo para >75% de uso
      return 'text-muted-foreground';                  // Cinza para uso normal
    };

    return (
      <div className="relative w-full">
        {/* Container principal do textarea */}
        <div className="relative">
          {/* Elemento textarea nativo */}
          <textarea
            className={cn(
              // Estilos base
              'flex w-full rounded-md border bg-background font-medium ring-offset-background',
              'placeholder:text-muted-foreground/60',
              // Estados de foco e interação
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200',
              // Tratamento de erros
              error 
                ? 'border-destructive focus-visible:ring-destructive/30' 
                : 'border-input focus-visible:ring-ring/30',
              // Tamanho e redimensionamento
              'resize-y', // Permite redimensionar apenas verticalmente
              sizeClasses[size],
              // Ajustes de layout
              icon && 'pr-10', // Adiciona espaço para o ícone
              // Classes personalizadas
              className
            )}
            ref={ref}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          
          {/* Ícone opcional no canto direito */}
          {icon && (
            <div 
              className="absolute right-3 top-3 text-muted-foreground"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>
        
        {/* Contador de caracteres */}
        {(showCharCount && maxLength) && (
          <div 
            className={`mt-1 text-xs text-right ${getCharCountColor()}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">
              {charCount} de {maxLength} caracteres utilizados
            </span>
            <span aria-hidden="true">
              {charCount}/{maxLength} caracteres
            </span>
          </div>
        )}
        
        {/* Mensagem de erro para acessibilidade */}
        {error && props['aria-errormessage'] && (
          <p 
            id={`${props.id}-error`} 
            className="mt-1 text-xs text-destructive"
            role="alert"
          >
            {props['aria-errormessage']}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
