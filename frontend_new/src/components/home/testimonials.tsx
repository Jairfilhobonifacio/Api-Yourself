// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Necessário para o uso do hook useState no componente TestimonialImage.
'use client'

// Importa o React e seus hooks.
import * as React from 'react'
// Importa o componente Card para a estrutura dos depoimentos.
import { Card, CardContent } from "@/components/ui/card"
// Importa o ícone de estrela para a avaliação.
import { Star } from "lucide-react"
// Importa o componente Image do Next.js para otimização de imagens.
import Image from "next/image"

// Define a interface para um objeto de depoimento, garantindo a consistência dos dados.
interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

// Array de objetos contendo os dados dos depoimentos a serem exibidos.
const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    role: "Doadora",
    content:
      "Sempre quis ajudar, mas não sabia como. Agora consigo encontrar facilmente locais próximos para fazer minhas doações.",
    avatar: "/avatars/01.png",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Voluntário",
    content:
      "Trabalho em um abrigo e a plataforma nos ajudou a receber mais doações e voluntários. Muito prático e eficiente.",
    avatar: "/avatars/02.png",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    role: "Doadora",
    content:
      "Amei a experiência de poder ajudar sem sair de casa. O cadastro foi rápido e a comunicação com o ponto de coleta foi excelente.",
    avatar: "/avatars/03.png",
    rating: 4,
  },
]

/**
 * TestimonialImage é um componente que renderiza a imagem de avatar do depoimento.
 * Ele possui um mecanismo de fallback: se a imagem não carregar, exibe a inicial do nome.
 * @param {object} props - As propriedades do componente.
 * @param {string} props.src - O caminho da imagem do avatar.
 * @param {string} props.name - O nome da pessoa, usado para o alt da imagem e para o fallback.
 * @returns {JSX.Element} O elemento JSX da imagem ou do fallback.
 */
function TestimonialImage({ src, name }: { src: string; name: string }) {
  // Estado para controlar se ocorreu um erro ao carregar a imagem.
  const [imageError, setImageError] = React.useState(false);

  // Se o estado de erro for verdadeiro, renderiza o fallback.
  if (imageError) {
    return (
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <span className="font-medium text-sm">{name[0]}</span>
      </div>
    );
  }

  // Caso contrário, renderiza o componente Image do Next.js.
  return (
    <div className="relative h-10 w-10 rounded-full overflow-hidden">
      <Image
        src={src}
        alt={name}
        width={40}
        height={40}
        className="object-cover h-full w-full"
        // O evento onError do componente Image atualiza o estado para acionar o fallback.
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/**
 * Testimonials é o componente que exibe a seção de depoimentos na página inicial.
 * @returns {JSX.Element} O elemento JSX que representa a seção de depoimentos.
 */
export function Testimonials() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">O que as pessoas estão dizendo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Veja depoimentos de quem já utilizou nossa plataforma para fazer a diferença
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              {/* Elemento decorativo no canto do card. */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <CardContent className="pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <TestimonialImage src={testimonial.avatar} name={testimonial.name} />
                  <div className="text-left">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  {/* Renderiza as estrelas de avaliação. */}
                  <div className="flex items-center ml-auto text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        // Preenche a estrela se o índice for menor que a avaliação.
                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'text-muted-foreground/20'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
