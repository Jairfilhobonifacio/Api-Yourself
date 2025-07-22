// Indica que este é um componente do lado do cliente
"use client";

// Importações de hooks do React
import { useEffect, useState } from "react";
// Importação de componentes do recharts para criação de gráficos
import {
  BarChart,  // Componente de gráfico de barras
  Bar,       // Componente de barra individual
  XAxis,     // Eixo X do gráfico
  YAxis,     // Eixo Y do gráfico
  Tooltip,   // Dica que aparece ao passar o mouse sobre os dados
  ResponsiveContainer, // Faz o gráfico ser responsivo
  PieChart,  // Componente de gráfico de pizza
  Pie,       // Componente de fatia da pizza
  Cell,      // Célula que representa cada fatia no gráfico de pizza
  Legend,    // Legenda do gráfico
} from "recharts";
// Importação do serviço para buscar dados dos pontos de doação
import PontoDoacaoService from "@/lib/api/pontoDoacaoService";
// Importação do tipo de dados para as estatísticas
import { Estatisticas } from "@/types/api";
// Importação de componentes de UI personalizados
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/custom-card";
import { Skeleton } from "@/components/ui/custom-skeleton";
import { Badge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/custom-button";
// Importação de ícone da biblioteca Lucide
import { ArrowLeft } from "lucide-react";

// Cores usadas nos gráficos
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#ef4444"];

/**
 * Componente da página de Estatísticas
 * Exibe gráficos e métricas sobre os pontos de doação
 */
export default function EstatisticasPage() {
  // Estado para armazenar os dados das estatísticas
  const [stats, setStats] = useState<Estatisticas | null>(null);
  // Estado para controlar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar os dados quando o componente for montado
  useEffect(() => {
    // Função assíncrona auto-executável para buscar os dados
    (async () => {
      try {
        // Busca os dados de estatísticas do serviço
        const dados = await PontoDoacaoService.obterEstatisticas();
        // Atualiza o estado com os dados recebidos
        setStats(dados);
      } catch (err) {
        // Em caso de erro, registra no console e define mensagem de erro
        console.error(err);
        setError("Falha ao carregar estatísticas.");
      } finally {
        // Independente do resultado, marca o carregamento como concluído
        setLoading(false);
      }
    })();
  }, []); // Array de dependências vazio = executa apenas uma vez ao montar

  // Estado de carregamento: exibe um esqueleto da página
  if (loading) {
    return (
      <main className="container py-12">
        {/* Botão de voltar */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        
        {/* Layout de carregamento com duas colunas */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna esquerda: Título e badges */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Estatísticas</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Veja como estamos impactando a comunidade através das doações
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="secondary">Impacto Social</Badge>
              <Badge variant="secondary">Dados em Tempo Real</Badge>
              <Badge variant="secondary">Transparência</Badge>
            </div>
          </div>
          
          {/* Coluna direita: Cards de métricas */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-lg">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Pontos</CardTitle>
                  <CardDescription>Quantidade de pontos de doação cadastrados</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doações Realizadas</CardTitle>
                  <CardDescription>Quantidade de doações efetuadas através da plataforma</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Placeholders para os gráficos que estão carregando */}
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </main>
    );
  }

  // Estado de erro: exibe mensagem de erro
  if (error || !stats) {
    return (
      <main className="container py-12 text-center">
        <p className="text-destructive font-medium">{error ?? "Sem dados."}</p>
      </main>
    );
  }

  // Renderização principal quando os dados estão carregados
  return (
    <main className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>

      {/* Seção de cards com métricas principais */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card: Total de Pontos */}
        <Card>
          <CardHeader>
            <CardTitle>Total Pontos</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-center">
            {stats.totalPontos}
          </CardContent>
        </Card>
        
        {/* Card: Total de Cidades */}
        <Card>
          <CardHeader>
            <CardTitle>Total Cidades</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-center">
            {stats.totalCidades}
          </CardContent>
        </Card>
      </div>

      {/* Seção de gráficos em duas colunas */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gráfico de barras: Tipos de Doações Mais Comuns */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Tipos de Doações Mais Comuns</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.tiposMaisComuns.map(([tipo, total]) => ({ tipo, total }))}>
              {/* Configuração do eixo X */}
              <XAxis 
                dataKey="tipo" 
                tick={{ fill: "#cbd5e1" }} // Cor do texto do eixo X
              />
              {/* Configuração do eixo Y */}
              <YAxis 
                tick={{ fill: "#cbd5e1" }} // Cor do texto do eixo Y
              />
              {/* Tooltip que aparece ao passar o mouse */}
              <Tooltip />
              {/* Barras do gráfico */}
              <Bar 
                dataKey="total" 
                fill="#6366f1" // Cor das barras
                radius={[4, 4, 0, 0]} // Bordas arredondadas no topo das barras
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de barras: Itens Mais Urgentes */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Itens Mais Urgentes</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.itensMaisUrgentes.map(([item, total]) => ({ item, total }))}>
              <XAxis dataKey="item" tick={{ fill: "#cbd5e1" }} />
              <YAxis tick={{ fill: "#cbd5e1" }} />
              <Tooltip />
              <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Gráfico de pizza: Distribuição por Cidade */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Distribuição por Cidade</CardTitle>
        </CardHeader>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              // Dados para o gráfico de pizza
              data={stats.cidades.map((cidade) => ({ name: cidade, value: 1 }))}
              dataKey="value"        // Chave para os valores
              nameKey="name"         // Chave para os nomes
              cx="50%"               // Posição horizontal do centro
              cy="50%"               // Posição vertical do centro
              outerRadius={120}       // Tamanho do gráfico
              label                  // Exibe rótulos nas fatias
            >
              {/* Mapeia cada cidade para uma cor */}
              {stats.cidades.map((_, idx) => (
                <Cell 
                  key={`cell-${idx}`} 
                  fill={COLORS[idx % COLORS.length]} // Usa cores em sequência
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </main>
  );
}
