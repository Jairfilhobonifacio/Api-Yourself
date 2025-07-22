// Importa o componente Link do Next.js para navegação.
import Link from "next/link"
// Importa o componente de botão personalizado.
import { Button } from "@/components/ui/custom-button"
// Importa um ícone para dar apelo visual à seção.
import { HeartHandshake } from "lucide-react"

/**
 * CTA (Call to Action) é um componente que exibe a seção final de chamada para ação na página inicial.
 * Seu objetivo é incentivar o usuário a se engajar com a plataforma.
 * @returns {JSX.Element} O elemento JSX que representa a seção de CTA.
 */
export function CTA() {
  return (
    // A seção tem um fundo com gradiente suave para se destacar.
    <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Ícone para reforçar a mensagem de solidariedade. */}
          <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-6" />
          {/* Título principal da chamada para ação. */}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Pronto para fazer a diferença?
          </h2>
          {/* Texto de apoio que explica as ações que o usuário pode tomar. */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando vidas através de doações. 
            Encontre um ponto de coleta próximo a você ou cadastre o seu próprio ponto de doação.
          </p>
          {/* Contêiner para os botões de ação, com layout responsivo. */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Botão para encontrar pontos de doação existentes. */}
            <Link href="/pontos">
              <Button size="lg">
                Encontrar pontos de doação
              </Button>
            </Link>
            {/* Botão para cadastrar um novo ponto de doação. */}
            <Link href="/pontos">
              <Button size="lg" variant="outline">
                Cadastrar ponto de doação
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
