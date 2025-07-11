// Importa ícones que representam os tipos de doação.
import { Gift, HeartHandshake, Utensils, Shirt } from "lucide-react"
// Importa os componentes de Card para a exibição.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define um tipo para os objetos de tipo de doação, garantindo a consistência dos dados.
type DonationType = {
  title: string
  description: string
  icon: React.ElementType // O ícone é um componente React.
}

// Array de objetos que define os tipos de doação a serem exibidos.
// Esta estrutura facilita a adição, remoção ou modificação dos tipos de doação.
const donationTypes: DonationType[] = [
  {
    title: "Alimentos",
    description: "Arroz, feijão, óleo, leite e outros alimentos não perecíveis",
    icon: Utensils,
  },
  {
    title: "Roupas",
    description: "Roupas em bom estado para crianças, adultos e idosos",
    icon: Shirt,
  },
  {
    title: "Brinquedos",
    description: "Brinquedos novos ou em bom estado para alegrar o dia de uma criança",
    icon: Gift,
  },
  {
    title: "Itens de Higiene",
    description: "Sabonete, pasta de dente, absorventes e outros itens de higiene pessoal",
    icon: HeartHandshake,
  },
]

/**
 * DonationTypes é um componente que exibe os tipos de doações aceitas.
 * Ele renderiza uma grade de cards, cada um representando um tipo de doação.
 * @returns {JSX.Element} O elemento JSX que representa a seção de tipos de doação.
 */
export function DonationTypes() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        {/* Cabeçalho da seção, com título e subtitulo. */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">O que você pode doar?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Veja os tipos de doações mais necessários pelos pontos de coleta
          </p>
        </div>
        {/* Grid para organizar os cards de tipos de doação. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Mapeia o array `donationTypes` para criar um Card para cada tipo. */}
          {donationTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="flex flex-col h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
