// Diretiva que marca este componente como um Componente de Cliente no Next.js.
'use client';

// Importa o `dynamic` do Next.js para carregamento dinâmico de componentes.
import dynamic from 'next/dynamic';
// Importa o hook useEffect do React.
import { useEffect } from 'react';

// Importa o tipo PontoDoacao.
import type { PontoDoacao } from '@/types';

// Carrega dinamicamente o componente MapaPontos, que contém a lógica do mapa Leaflet.
// `ssr: false` é crucial para bibliotecas que dependem de objetos do navegador como `window`.
// `loading` define um componente a ser exibido enquanto o MapaPontos está sendo carregado.
const MapaPontos = dynamic(
  () => import('./mapa-pontos'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full flex items-center justify-center">
        <div className="animate-pulse">
          {/* Animação de carregamento (spinner). */}
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }
);

// Define a interface para as propriedades do componente MapaWrapper.
interface MapaWrapperProps {
  pontos: PontoDoacao[];
  className?: string;
}

/**
 * MapaWrapper é um componente que envolve o MapaPontos.
 * Sua principal responsabilidade é garantir que o CSS do Leaflet seja carregado
 * e que o mapa seja renderizado apenas no lado do cliente.
 * @param {MapaWrapperProps} props - As propriedades do componente.
 * @returns {JSX.Element} O componente MapaPontos carregado dinamicamente.
 */
export default function MapaWrapper({ pontos, className }: MapaWrapperProps) {
  // O useEffect é usado para carregar o CSS do Leaflet dinamicamente no lado do cliente.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet/dist/leaflet.css');
    }
  }, []); // O array de dependências vazio garante que isso seja executado apenas uma vez.

  // Renderiza o componente MapaPontos, passando as propriedades recebidas.
  return <MapaPontos pontos={pontos} className={className} />;
}
