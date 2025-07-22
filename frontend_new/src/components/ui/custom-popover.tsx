// Importações de bibliotecas e utilitários
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Propriedades do componente Popover
 * 
 * @property {React.ReactNode} children - Elemento que servirá como gatilho para abrir o popover
 * @property {React.ReactNode} content - Conteúdo a ser exibido dentro do popover
 * @property {boolean} [open] - Controla se o popover está aberto (modo controlado)
 * @property {(open: boolean) => void} [onOpenChange] - Callback chamado quando o estado de abertura muda
 * @property {'start'|'center'|'end'} [align='center'] - Alinhamento do popover em relação ao trigger
 * @property {'top'|'right'|'bottom'|'left'} [side='bottom'] - Lado onde o popover será exibido
 * @property {number} [sideOffset=4] - Espaçamento em pixels entre o popover e o trigger
 * @property {string} [className] - Classes CSS adicionais para o conteúdo do popover
 * @property {boolean} [hoverable=false] - Se verdadeiro, ativa a abertura ao passar o mouse
 * 
 * @example
 * // Exemplo básico
 * <Popover content={
 *   <div className="p-4">
 *     <p>Conteúdo do popover</p>
 *   </div>
 * }>
 *   <Button>Clique para abrir</Button>
 * </Popover>
 * 
 * @example
 * // Exemplo com posicionamento personalizado
 * <Popover 
 *   content={
 *     <div className="p-4">
 *       <PopoverTitle>Título</PopoverTitle>
 *       <PopoverDescription>Descrição detalhada aqui</PopoverDescription>
 *     </div>
 *   }
 *   side="right"
 *   align="start"
 *   sideOffset={8}
 *   hoverable
 * >
 *   <Button variant="outline">Passe o mouse</Button>
 * </Popover>
 */
interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  hoverable?: boolean;
}

/**
 * Estilos base para o conteúdo do popover
 * @private
 */
const baseStyles = [
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
  "outline-none animate-in fade-in-0 zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2"
].join(" ");

/**
 * Mapeamento de classes para posicionamento vertical/horizontal
 * @private
 */
const sideMap = {
  top: "bottom-full mb-2",
  right: "left-full ml-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
};

/**
 * Mapeamento de classes para alinhamento
 * @private
 */
const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

/**
 * Componente Popover para exibir conteúdo flutuante que pode ser mostrado/ocultado.
 * Pode ser controlado ou não controlado, e suporta interação por clique ou hover.
 * 
 * @component
 * @example
 * // Exemplo básico controlado
 * const [isOpen, setIsOpen] = React.useState(false);
 * 
 * <Popover 
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   content={
 *     <div className="p-4">
 *       <p>Conteúdo controlado</p>
 *     </div>
 *   }
 * >
 *   <Button>Clique para abrir</Button>
 * </Popover>
 * 
 * @example
 * // Exemplo com hover e posicionamento personalizado
 * <Popover
 *   content={
 *     <div className="p-4 w-64">
 *       <PopoverTitle>Informações</PopoverTitle>
 *       <PopoverDescription>Este popover aparece ao passar o mouse</PopoverDescription>
 *     </div>
 *   }
 *   side="right"
 *   hoverable
 * >
 *   <Button variant="ghost">Passe o mouse</Button>
 * </Popover>
 */
export const Popover = ({
  children,
  content,
  open: controlledOpen,
  onOpenChange,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  className,
  hoverable = false,
  ...props
}: PopoverProps) => {
  // Estado para o modo não controlado
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  
  // Determina se o componente está em modo controlado
  const isControlled = controlledOpen !== undefined;
  
  // Estado combinado (controlado ou não controlado)
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  // Refs para os elementos do DOM
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  /**
   * Alterna o estado de abertura do popover
   * @param {boolean} newOpen - Novo estado desejado
   * @private
   */
  const toggleOpen = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange]);

  // Efeito para fechar ao clicar fora
  React.useEffect(() => {
    /**
     * Manipulador de clique fora do popover
     * @param {MouseEvent} event - Evento de clique
     * @private
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        !triggerRef.current?.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        toggleOpen(false);
      }
    };

    // Adiciona o listener apenas se o popover estiver aberto
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Limpeza do listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, toggleOpen]);

  // Efeito para fechar ao pressionar Escape
  React.useEffect(() => {
    /**
     * Manipulador da tecla Escape
     * @param {KeyboardEvent} event - Evento de teclado
     * @private
     */
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        toggleOpen(false);
      }
    };

    // Adiciona o listener apenas se o popover estiver aberto
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    
    // Limpeza do listener
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, toggleOpen]);

  // Prepara os eventos de hover se habilitado
  const hoverProps = hoverable
    ? {
        // Abre ao passar o mouse sobre o trigger
        onMouseEnter: () => toggleOpen(true),
        
        // Fecha ao remover o mouse do trigger/conteúdo
        onMouseLeave: (e: React.MouseEvent) => {
          // Verifica se o mouse está saindo para fora do trigger e do conteúdo
          if (
            !triggerRef.current?.contains(e.relatedTarget as Node) &&
            !contentRef.current?.contains(e.relatedTarget as Node)
          ) {
            toggleOpen(false);
          }
        },
      }
    : {};

  return (
    <div className="relative inline-block" {...props}>
      {/* Elemento que ativa o popover */}
      <div
        ref={triggerRef}
        onClick={() => !hoverable && toggleOpen(!open)}
        className="inline-block"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        onKeyDown={(e) => {
          // Suporte a teclado: Espaço ou Enter para alternar
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggleOpen(!open);
          }
        }}
        {...hoverProps}
      >
        {children}
      </div>

      {/* Conteúdo do popover */}
      {open && (
        <div
          ref={contentRef}
          className={cn(
            // Estilos base
            "absolute z-50 min-w-[200px] rounded-md border bg-white p-2 shadow-lg dark:bg-gray-800",
            
            // Classes de posicionamento
            sideMap[side],
            alignMap[align],
            
            // Classes personalizadas
            className
          )}
          style={{
            // Posicionamento baseado no lado especificado
            position: "absolute",
            top: side === "bottom" ? "100%" : side === "top" ? "auto" : "50%",
            bottom: side === "top" ? "100%" : "auto",
            left: side === "right" ? "100%" : side === "left" ? "auto" : "50%",
            right: side === "left" ? "100%" : "auto",
            
            // Transformação para centralizar/alinhar corretamente
            transform: `translateX(${
              side === "left" || side === "right"
                ? 0
                : align === "start"
                ? "0%"
                : align === "end"
                ? "-100%"
                : "-50%"
            }) translateY(${
              side === "top" || side === "bottom"
                ? 0
                : align === "start"
                ? "0%"
                : align === "end"
                ? "-100%"
                : "-50%"
            })`,
            
            // Aplica o espaçamento (offset) especificado
            marginTop: side === "bottom" ? sideOffset : undefined,
            marginBottom: side === "top" ? sideOffset : undefined,
            marginLeft: side === "right" ? sideOffset : undefined,
            marginRight: side === "left" ? sideOffset : undefined,
            
            // Animações
            animation: 'fadeIn 150ms ease-out',
          }}
          role="dialog"
          aria-modal="true"
          // Mantém o foco no conteúdo para melhor acessibilidade
          onMouseEnter={hoverable ? () => toggleOpen(true) : undefined}
          onMouseLeave={hoverable ? (e) => {
            // Verifica se o mouse está saindo para fora do conteúdo
            if (!triggerRef.current?.contains(e.relatedTarget as Node)) {
              toggleOpen(false);
            }
          } : undefined}
        >
          {content}
        </div>
      )}
    </div>
  );
};

/**
 * Componente de trigger para o Popover.
 * Pode ser usado para personalizar o elemento que ativa o popover.
 * 
 * @component
 * @example
 * <Popover content={<div>Conteúdo</div>}>
 *   <PopoverTrigger className="custom-trigger">
 *     <Button>Clique aqui</Button>
 *   </PopoverTrigger>
 * </Popover>
 */
export const PopoverTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("inline-block", className)} 
    role="button"
    tabIndex={0}
    {...props}
  >
    {children}
  </div>
);

/**
 * Componente de conteúdo para o Popover.
 * Envolve o conteúdo que será exibido dentro do popover.
 * 
 * @component
 * @example
 * <Popover>
 *   <PopoverTrigger>Clique aqui</PopoverTrigger>
 *   <PopoverContent className="p-4">
 *     <p>Conteúdo personalizado aqui</p>
 *   </PopoverContent>
 * </Popover>
 */
export const PopoverContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      // Estilos base do conteúdo
      baseStyles, 
      // Classes personalizadas
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

/**
 * Componente de título para o Popover.
 * Estiliza o título do conteúdo do popover.
 * 
 * @component
 * @example
 * <PopoverContent>
 *   <PopoverTitle>Título do Popover</PopoverTitle>
 *   <p>Conteúdo adicional aqui</p>
 * </PopoverContent>
 */
export const PopoverTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      // Estilos base do título
      "text-lg font-semibold leading-none tracking-tight mb-2",
      // Classes personalizadas
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

/**
 * Componente de descrição para o Popover.
 * Estiliza o texto descritivo dentro do popover.
 * 
 * @component
 * @example
 * <PopoverContent>
 *   <PopoverTitle>Informações</PopoverTitle>
 *   <PopoverDescription>
 *     Esta é uma descrição detalhada que aparece abaixo do título.
 *   </PopoverDescription>
 * </PopoverContent>
 */
export const PopoverDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={cn(
      // Estilos base da descrição
      "text-sm text-muted-foreground", 
      // Classes personalizadas
      className
    )} 
    {...props}
  >
    {children}
  </p>
);
