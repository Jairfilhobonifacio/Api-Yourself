// Importa o componente Hero, que é a seção principal de boas-vindas da página inicial.
import { Hero } from "@/components/home/hero";
// Importa o componente Stats, que exibe estatísticas sobre as doações.
import { Stats } from "@/components/home/stats";
// Importa o componente DonationTypes, que mostra os tipos de doações aceitas.
import { DonationTypes } from "@/components/home/donation-types";
// Importa o componente Testimonials, que exibe depoimentos de usuários.
import { Testimonials } from "@/components/home/testimonials";
// Importa o componente CTA (Call to Action), que incentiva os usuários a agir.
import { CTA } from "@/components/home/cta";

/**
 * Componente da página inicial que agrega todas as seções da landing page.
 * @returns {JSX.Element} O elemento JSX que representa a página inicial.
 */
export default function Home() {
  return (
    // O elemento <main> ocupa o espaço flexível disponível, garantindo que o layout se ajuste corretamente.
    <main className="flex-1">
      {/* Renderiza a seção de herói no topo da página. */}
      <Hero />
      {/* Renderiza a seção de estatísticas para mostrar o impacto das doações. */}
      <Stats />
      {/* Renderiza a seção que descreve os tipos de doações que podem ser feitas. */}
      <DonationTypes />
      {/* Renderiza a seção de depoimentos para construir confiança e prova social. */}
      <Testimonials />
      {/* Renderiza a chamada para ação, incentivando o engajamento do usuário. */}
      <CTA />
    </main>
  );
}
