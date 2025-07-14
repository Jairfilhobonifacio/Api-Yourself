// Importa o componente ClientProviders que contém todos os provedores necessários
import { ClientProviders } from "@/components/providers/client-providers";

/**
 * Componente que encapsula os provedores de contexto da aplicação.
 * Ele atua como um wrapper para garantir que os contextos estejam disponíveis para todos os componentes filhos.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que serão envolvidos pelos provedores.
 * @returns {JSX.Element} O elemento JSX que representa os provedores envolvendo os filhos.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  );
}
