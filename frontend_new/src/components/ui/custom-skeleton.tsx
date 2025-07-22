import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Propriedades do componente Skeleton
 * 
 * @interface SkeletonProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {string} [className] - Classes CSS adicionais para estilização personalizada
 * @property {React.ReactNode} [children] - Conteúdo opcional para ser exibido dentro do skeleton
 * @property {string | number} [width] - Largura do skeleton (ex: '100%', '200px', '50%')
 * @property {string | number} [height='1rem'] - Altura do skeleton (ex: '20px', '100%', '2rem')
 * @property {boolean} [rounded=true] - Se verdadeiro, o skeleton terá bordas arredondadas
 * @property {string} [borderRadius] - Raio da borda (ex: '4px', 'full', '50%')
 * @property {string} [baseColor='#f3f4f6'] - Cor de fundo do skeleton (padrão: bg-gray-100)
 * @property {string} [highlightColor='#e5e7eb'] - Cor do efeito de brilho (padrão: bg-gray-200)
 * @property {number} [speed=1.5] - Velocidade da animação em segundos
 * @property {boolean} [inline=false] - Se verdadeiro, exibe o skeleton em um container inline-flex
 * @property {boolean} [shimmer=true] - Se verdadeiro, aplica um efeito de brilho
 * 
 * @example
 * // Exemplo básico
 * <Skeleton width="100%" height="20px" />
 * 
 * @example
 * // Exemplo com conteúdo e estilização personalizada
 * <Skeleton 
 *   width="200px" 
 *   height="100px" 
 *   className="mb-4"
 *   baseColor="#f0f0f0"
 *   highlightColor="#e0e0e0"
 *   shimmer
 * >
 *   Conteúdo opcional que define o tamanho mínimo
 * </Skeleton>
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Classes CSS adicionais para estilização personalizada */
  className?: string;
  /** Conteúdo opcional para ser exibido dentro do skeleton */
  children?: React.ReactNode;
  /** Largura do skeleton (ex: '100%', '200px', '50%') */
  width?: string | number;
  /** Altura do skeleton (ex: '20px', '100%', '2rem') */
  height?: string | number;
  /** Se verdadeiro, o skeleton terá bordas arredondadas */
  rounded?: boolean;
  /** Raio da borda (ex: '4px', 'full', '50%') */
  borderRadius?: string;
  /** Cor de fundo do skeleton */
  baseColor?: string;
  /** Cor do efeito de brilho */
  highlightColor?: string;
  /** Velocidade da animação em segundos */
  speed?: number;
  /** Se verdadeiro, exibe o skeleton em um container inline-flex */
  inline?: boolean;
  /** Se verdadeiro, aplica um efeito de brilho */
  shimmer?: boolean;
}

/**
 * Componente Skeleton para criar efeitos de carregamento.
 * Pode ser usado para simular o carregamento de conteúdo de forma acessível e com boa experiência do usuário.
 * 
 * @component
 * @example
 * // Exemplo básico
 * <Skeleton width="100%" height="24px" className="mb-2" />
 * 
 * @example
 * // Exemplo de uso em um card de carregamento
 * <div className="p-4 border rounded-lg w-64">
 *   <Skeleton width="100%" height="160px" className="mb-3 rounded-lg" />
 *   <Skeleton width="80%" height="20px" className="mb-2" />
 *   <Skeleton width="60%" height="16px" className="mb-4" />
 *   <Skeleton width="40%" height="16px" className="mb-2" />
 *   <Skeleton width="100%" height="40px" className="rounded-full mt-4" />
 * </div>
 * 
 * @param {SkeletonProps} props - As propriedades do componente
 * @returns {JSX.Element} O componente Skeleton renderizado
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  children,
  width,
  height = '1rem', // Altura padrão
  rounded = true,
  borderRadius,
  baseColor = '#f3f4f6', // bg-gray-100
  highlightColor = '#e5e7eb', // bg-gray-200
  speed = 1.5,
  inline = false,
  shimmer = true,
  style,
  ...props
}) => {
  /**
   * Estilos inline para o componente Skeleton
   * Combina estilos base com estilos personalizados fornecidos via props
   * @type {React.CSSProperties}
   */
  const skeletonStyle: React.CSSProperties = {
    width: width || '100%',
    height: height,
    backgroundColor: baseColor,
    borderRadius: borderRadius 
      ? borderRadius === 'full' 
        ? '9999px' 
        : borderRadius
      : rounded 
        ? '0.375rem' // rounded-md
        : '0',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  /**
   * Estilos para o efeito de brilho (shimmer)
   * Cria um gradiente animado que dá a ilusão de carregamento
   * @type {React.CSSProperties}
   */
  const shimmerStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)`,
    animation: `shimmer ${speed}s infinite`,
    transform: 'translateX(-100%)',
  };

  /**
   * Definição da animação de shimmer usando CSS-in-JS
   * Cria uma animação suave de deslocamento horizontal
   * @type {string}
   */
  const keyframes = `
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  `;

  /**
   * Define o elemento de container baseado na propriedade 'inline'
   * Usa 'span' para exibição em linha e 'div' para bloco
   * @type {keyof JSX.IntrinsicElements}
   */
  const Container = inline ? 'span' : 'div';

  return (
    <>
      {/* Injeção de estilos de animação */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      
      {/* Container principal do Skeleton */}
      <Container
        className={cn(
          // Layout base baseado no tipo de exibição (inline ou bloco)
          inline ? 'inline-flex' : 'block',
          // Classes personalizadas fornecidas pelo usuário
          className
        )}
        // Estilos calculados dinamicamente
        style={skeletonStyle}
        // Atributos de acessibilidade
        aria-busy="true"
        aria-live="polite"
        // Suporta todas as propriedades padrão de um elemento div/span
        {...props}
      >
        {/* Efeito de shimmer (brilho) */}
        {shimmer && <div style={shimmerStyle} aria-hidden="true" />}
        
        {/* Conteúdo opcional usado apenas para dimensionamento */}
        {children && (
          <span style={{ visibility: 'hidden' }} aria-hidden="true">
            {children}
          </span>
        )}
      </Container>
    </>
  );
};

/**
 * Propriedades do componente SkeletonGroup
 * 
 * @interface SkeletonGroupProps
 * @property {number} [count=3] - Número de skeletons a serem renderizados
 * @property {string} [className] - Classe CSS para cada skeleton
 * @property {React.CSSProperties} [style] - Estilos inline para cada skeleton
 * @property {boolean} [inline=false] - Se verdadeiro, exibe os skeletons em uma linha
 * @property {string} [spacing='0.5rem'] - Espaçamento entre os skeletons (ex: '8px', '1rem')
 * @property {boolean} [variedHeights=false] - Se verdadeiro, os skeletons terão alturas diferentes
 * @property {boolean} [variedWidths=false] - Se verdadeiro, os skeletons terão larguras diferentes
 * @property {Omit<SkeletonProps, 'className' | 'style'>} [skeletonProps] - Props adicionais para cada skeleton
 * 
 * @example
 * // Exemplo básico de SkeletonGroup
 * <SkeletonGroup count={3} spacing="1rem" />
 * 
 * @example
 * // Exemplo com múltiplas linhas e estilos variados
 * <SkeletonGroup 
 *   count={6} 
 *   spacing="0.75rem" 
 *   variedHeights 
 *   variedWidths
 *   skeletonProps={{
 *     rounded: true,
 *     shimmer: true
 *   }}
 * />
 */
interface SkeletonGroupProps {
  /** Número de skeletons a serem renderizados */
  count?: number;
  /** Classe para cada skeleton */
  className?: string;
  /** Estilo para cada skeleton */
  style?: React.CSSProperties;
  /** Se verdadeiro, exibe os skeletons em uma linha */
  inline?: boolean;
  /** Espaçamento entre os skeletons (ex: '8px', '1rem') */
  spacing?: string;
  /** Se verdadeiro, os skeletons terão alturas diferentes */
  variedHeights?: boolean;
  /** Se verdadeiro, os skeletons terão larguras diferentes */
  variedWidths?: boolean;
  /** Props adicionais para cada skeleton */
  skeletonProps?: Omit<SkeletonProps, 'className' | 'style'>;
}

/**
 * Componente SkeletonGroup para renderizar múltiplos componentes Skeleton com configurações comuns.
 * Útil para criar layouts de carregamento complexos com várias linhas ou grades de conteúdo.
 * 
 * @component
 * @example
 * // Exemplo de lista de carregamento
 * <div className="space-y-4">
 *   <SkeletonGroup count={5} spacing="0.5rem" />
 * </div>
 * 
 * @example
 * // Exemplo de grade responsiva
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 *   <SkeletonGroup 
 *     count={3} 
 *     skeletonProps={{
 *       height: '200px',
 *       className: 'rounded-lg',
 *       shimmer: true
 *     }}
 *   />
 * </div>
 * 
 * @param {SkeletonGroupProps} props - As propriedades do componente
 * @returns {JSX.Element} O componente SkeletonGroup renderizado
 */
export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  /** Número de skeletons a serem renderizados */
  count = 3,
  /** Classe CSS para cada skeleton */
  className = '',
  /** Estilos inline para cada skeleton */
  style,
  /** Se verdadeiro, exibe os skeletons em linha */
  inline = false,
  /** Espaçamento entre os skeletons */
  spacing = '0.5rem',
  /** Se verdadeiro, gera alturas variadas */
  variedHeights = false,
  /** Se verdadeiro, gera larguras variadas */
  variedWidths = false,
  /** Propriedades adicionais para cada skeleton */
  skeletonProps = {},
}) => {
  /**
   * Gera um array de componentes Skeleton baseado nas propriedades fornecidas
   * @type {JSX.Element[]}
   */
  const skeletons = Array.from({ length: count }, (_, index) => {
    // Calcula altura aleatória se variedHeights for verdadeiro
    const height = variedHeights 
      ? `${Math.random() * (1.5 - 0.75) + 0.75}rem`
      : skeletonProps.height || '1rem';
      
    // Calcula largura aleatória se variedWidths for verdadeiro
    const width = variedWidths
      ? `${Math.random() * (80 - 40) + 40}%`
      : skeletonProps.width || '100%';

    return (
      <Skeleton
        key={index}
        className={className}
        style={{
          marginBottom: index < count - 1 ? spacing : 0,
          width,
          height,
          ...style,
        }}
        {...skeletonProps}
      />
    );
  });

  return (
    <div 
      className={cn(
        // Layout flexível para exibição em linha
        inline ? 'flex flex-wrap gap-2' : '',
        // Garante que o container ocupe todo o espaço necessário
        'w-full'
      )}
      // Atributo para indicar que este é um container de carregamento
      aria-busy="true"
    >
      {skeletons}
    </div>
  );
};

export default Skeleton;
