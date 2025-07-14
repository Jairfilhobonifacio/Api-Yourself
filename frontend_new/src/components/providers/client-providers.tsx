// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Isso significa que ele será renderizado no navegador, permitindo o uso de hooks como useEffect e useState.
'use client';

// Importa o ThemeProvider para gerenciar o tema da aplicação (claro/escuro).
import { ThemeProvider } from "@/components/providers/theme-provider";
// Importa o NotificationProvider para gerenciar notificações.
import { NotificationProvider } from "@/context/NotificationContext";
// Importa o ToastContainer personalizado para exibir notificações.
import { ToastContainer } from "@/components/ui/CustomToast";
// Importa o cabeçalho do site.
import { SiteHeader } from "@/components/layout/site-header";
// Importa o rodapé do site.
import { SiteFooter } from "@/components/layout/site-footer";
// Importa o hook useEffect do React para lidar com efeitos colaterais.
import { useEffect } from 'react';
// Importa o provedor de contexto para os pontos de doação.
import { PontosDoacaoProvider } from '@/context/PontosDoacaoContext';

/**
 * ClientProviders é um componente que envolve a aplicação com todos os provedores
 * necessários no lado do cliente, como tema, contexto de dados e layout principal.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que serão renderizados dentro dos provedores.
 * @returns {JSX.Element} O elemento JSX que representa a estrutura de provedores e layout.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  // O hook useEffect é usado para executar código após a montagem do componente no cliente.
  useEffect(() => {
    // Cria um elemento <link> para carregar a folha de estilos do Leaflet dinamicamente.
    // Isso é útil para carregar CSS de bibliotecas de terceiros apenas quando necessário.
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    // Adiciona o elemento <link> ao <head> do documento.
    document.head.appendChild(link);

    // A função de limpeza do useEffect é retornada para ser executada quando o componente for desmontado.
    // Isso remove a folha de estilos do Leaflet para evitar vazamentos de memória ou conflitos.
    return () => {
      document.head.removeChild(link);
    };
  }, []); // O array de dependências vazio [] garante que o efeito seja executado apenas uma vez.

  return (
    // O ThemeProvider gerencia o tema da aplicação, permitindo alternar entre claro e escuro.
    <ThemeProvider
      attribute="class" // O tema será aplicado como uma classe no elemento <html>.
      defaultTheme="system" // O tema padrão é o do sistema operacional.
      enableSystem // Permite que o tema do sistema seja detectado.
      disableTransitionOnChange // Desativa transições de CSS ao mudar de tema para evitar piscadas.
    >
      <NotificationProvider>
        <PontosDoacaoProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <ToastContainer />
          </div>
        </PontosDoacaoProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
