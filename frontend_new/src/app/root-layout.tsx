// Importa o tipo Metadata do Next.js para definir os metadados da página.
import { Metadata } from "next";
// Importa a fonte Inter do Google Fonts através do Next.js para otimização.
import { Inter } from "next/font/google";
// Importa estilos globais que serão aplicados em toda a aplicação.
import "./globals.css";
// Importa o componente Providers, que encapsula os provedores de contexto da aplicação.
import { Providers } from "./providers";

// Carrega a fonte Inter com o subconjunto 'latin' e a define como uma variável CSS.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Exporta os metadados da página, que são usados pelo Next.js para o SEO e informações do navegador.
export const metadata: Metadata = {
  title: "ApiYourself - Plataforma de Doações Comunitárias",
  description: "Conectando doadores a quem mais precisa na sua comunidade.",
  keywords: ["doação", "comunidade", "ajuda humanitária", "solidariedade"],
  authors: [
    {
      name: "Sua Equipe",
      url: "https://github.com/seu-usuario",
    },
  ],
  creator: "Sua Equipe",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

/**
 * RootLayout é o componente de layout principal da aplicação.
 * Ele envolve todo o conteúdo da página e define a estrutura HTML base.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que serão renderizados dentro do layout.
 * @returns {JSX.Element} O elemento JSX que representa o layout da aplicação.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Define o idioma da página como português do Brasil e suprime avisos de hidratação.
    <html lang="pt-BR" suppressHydrationWarning>
      {/* O corpo da página com classes para aplicar a fonte, altura mínima, cor de fundo e antialiasing. */}
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        {/* O componente Providers envolve os filhos para fornecer contexto em toda a aplicação. */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
