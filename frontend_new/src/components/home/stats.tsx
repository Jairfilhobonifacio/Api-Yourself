// Importa os componentes de Card para estruturar a exibição das estatísticas.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Importa ícones para representar visualmente cada estatística.
import { HandHeart, MapPin, Users } from "lucide-react"

// Define um array de objetos, onde cada objeto representa uma estatística a ser exibida.
// Esta abordagem torna o componente mais fácil de manter e escalar.
const stats = [
  {
    title: "Pontos de Doação",
    value: "50+",
    description: "Pontos de coleta cadastrados em todo o país",
    icon: MapPin, // Associa um ícone a esta estatística.
  },
  {
    title: "Doadores Ativos",
    value: "1000+",
    description: "Pessoas ajudando a fazer a diferença",
    icon: Users,
  },
  {
    title: "Doações Realizadas",
    value: "5000+",
    description: "Itens doados para quem mais precisa",
    icon: HandHeart,
  },
]

/**
 * Stats é o componente que exibe uma seção de estatísticas na página inicial.
 * Ele mapeia o array `stats` para renderizar um card para cada item.
 * @returns {JSX.Element} O elemento JSX que representa a seção de estatísticas.
 */
export function Stats() {
  return (
    <section className="py-12">
      <div className="container">
        {/* Utiliza um grid para organizar os cards de estatísticas. Em telas maiores, exibe 3 colunas. */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Mapeia o array de estatísticas para criar um componente Card para cada uma. */}
          {stats.map((stat, index) => {
            // Extrai o componente de ícone da propriedade `icon` do objeto.
            const Icon = stat.icon
            return (
              // O Card tem um fundo semi-transparente com efeito de desfoque.
              <Card key={index} className="border-border/40 bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {/* O ícone é exibido dentro de um círculo com a cor primária. */}
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Exibe o valor da estatística em negrito e com fonte maior. */}
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {/* Exibe a descrição da estatística com uma cor mais suave. */}
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
