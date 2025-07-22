'use client'

import { useState, useEffect } from 'react'
import MapaPontos from '@/components/mapa/mapa-pontos'
import { FiltroPontos } from '@/components/pontos/filtro-pontos'
import { Button } from '@/components/ui/custom-button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

// Dados mockados - substituir por chamada à API
type PontoDoacao = {
  id: number
  nome: string
  endereco: string
  telefone: string
  email: string
  horarioFuncionamento: string
  necessidades: string[]
  site?: string
  coordenadas: [number, number] // [latitude, longitude]
}

// Dados de exemplo
const pontosMock: PontoDoacao[] = [
  {
    id: 1,
    nome: 'Casa de Apoio Esperança',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    telefone: '(11) 99999-9999',
    email: 'contato@casaesperanca.org',
    horarioFuncionamento: 'Segunda a Sexta, das 9h às 17h',
    necessidades: ['alimentos', 'higiene'],
    site: 'https://casaesperanca.org',
    coordenadas: [-23.5505, -46.6333] // São Paulo
  },
  {
    id: 2,
    nome: 'Lar dos Idosos Vovó Joana',
    endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    telefone: '(11) 88888-8888',
    email: 'contato@vovojoana.org.br',
    horarioFuncionamento: 'Todos os dias, das 8h às 18h',
    necessidades: ['roupas', 'higiene', 'eletronicos'],
    coordenadas: [-23.5614, -46.6558] // Próximo ao MASP
  },
  {
    id: 3,
    nome: 'Projeto Criança Feliz',
    endereco: 'Rua das Palmeiras, 456 - Jardim América, Rio de Janeiro - RJ',
    telefone: '(21) 77777-7777',
    email: 'contato@criancafeliz.org.br',
    horarioFuncionamento: 'Segunda a Sábado, das 10h às 16h',
    necessidades: ['brinquedos', 'alimentos', 'roupas'],
    site: 'https://criancafeliz.org.br',
    coordenadas: [-22.9068, -43.1729] // Rio de Janeiro
  },
  {
    id: 4,
    nome: 'Abrigo Nova Vida',
    endereco: 'Av. Afonso Pena, 1000 - Centro, Belo Horizonte - MG',
    telefone: '(31) 66666-6666',
    email: 'contato@novavida.org.br',
    horarioFuncionamento: '24 horas',
    necessidades: ['higiene', 'roupas', 'moveis'],
    coordenadas: [-19.9167, -43.9345] // Belo Horizonte
  },
  {
    id: 5,
    nome: 'Centro de Acolhida Luz do Amanhã',
    endereco: 'Rua da Paz, 200 - Centro, Porto Alegre - RS',
    telefone: '(51) 55555-5555',
    email: 'contato@luzdoamanha.org.br',
    horarioFuncionamento: 'Segunda a Domingo, das 7h às 22h',
    necessidades: ['alimentos', 'higiene', 'roupas', 'moveis'],
    coordenadas: [-30.0331, -51.23] // Porto Alegre
  }
]

export default function MapaPage() {
  const [busca, setBusca] = useState('')
  const [filtros, setFiltros] = useState<string[]>([])
  const [pontos, setPontos] = useState<PontoDoacao[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulando carregamento de dados da API
  useEffect(() => {
    const timer = setTimeout(() => {
      setPontos(pontosMock)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar pontos com base na busca e nos filtros
  const pontosFiltrados = pontos.filter(ponto => {
    const buscaMatch = 
      ponto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      ponto.endereco.toLowerCase().includes(busca.toLowerCase())
    
    const filtrosMatch = 
      filtros.length === 0 || 
      filtros.some(filtro => ponto.necessidades.includes(filtro))
    
    return buscaMatch && filtrosMatch
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mapa de Pontos de Doação</h1>
          <p className="text-muted-foreground">
            Encontre os pontos de doação mais próximos de você
          </p>
        </div>
        <Button 
          onClick={() => window.location.href = '/pontos/novo'}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Ponto
        </Button>
      </div>

      <div className="space-y-6">
        <FiltroPontos 
          busca={busca}
          setBuscaAction={setBusca}
          filtros={filtros}
          setFiltrosAction={setFiltros}
        />

        <div className="rounded-lg border overflow-hidden">
          {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">
                Carregando mapa...
              </div>
            </div>
          ) : (
            <MapaPontos 
              pontos={pontosFiltrados}
              className="w-full"
            />
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Navegue pelo mapa para ver os pontos de doação. Clique em um marcador para mais informações.</p>
          <p className="mt-1">
            Não encontrou um ponto de doação?{' '}
            <Link href="/pontos/novo" className="text-primary hover:underline">
              Cadastre um novo ponto
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
