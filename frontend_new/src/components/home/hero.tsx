// Importa o componente Link do Next.js para navegação do lado do cliente.
import Link from "next/link"
// Importa o componente de botão personalizado.
import { Button } from "@/components/ui/button"
// Importa o ícone de seta para a direita da biblioteca lucide-react.
import { ArrowRight } from "lucide-react"

/**
 * Hero é o componente da seção principal da página inicial.
 * Ele apresenta o título, uma breve descrição e os principais botões de chamada para ação (CTA).
 * @returns {JSX.Element} O elemento JSX que representa a seção de herói.
 */
export function Hero() {
  return (
    // A seção tem um fundo com gradiente e um padrão de grade sutil.
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background">
      {/* O container centraliza o conteúdo e garante que ele fique acima do padrão de grade (z-10). */}
      <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
        {/* Título principal da página, com tamanho de fonte responsivo. */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Conectando doadores a quem mais precisa
        </h1>
        {/* Parágrafo descritivo que explica o propósito da plataforma. */}
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Ajude a transformar vidas através de doações. Encontre pontos de coleta próximos a você e faça a diferença na sua comunidade.
        </p>
        {/* Contêiner para os botões de chamada para ação, com layout responsivo (coluna em telas pequenas, linha em maiores). */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Botão principal que leva à página de pontos de doação. */}
          <Button size="lg" asChild>
            <Link href="/pontos">
              Encontrar pontos de doação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {/* Botão secundário que leva à página "Sobre". */}
          <Button size="lg" variant="outline" asChild>
            <Link href="/sobre">
              Saiba mais
            </Link>
          </Button>
        </div>
      </div>
      {/* Div para o efeito de grade no fundo. A máscara de gradiente cria um efeito de fade. */}
      <div className="absolute inset-0 z-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
    </section>
  )
}
