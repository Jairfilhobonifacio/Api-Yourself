"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PontoDoacaoService from "@/lib/api/pontoDoacaoService";
import { Estatisticas } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#ef4444"];

export default function EstatisticasPage() {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const dados = await PontoDoacaoService.obterEstatisticas();
        setStats(dados);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar estatísticas.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="container py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
        </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
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
        
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </main>
    );
  }

  if (error || !stats) {
    return (
      <main className="container py-12 text-center">
        <p className="text-destructive font-medium">{error ?? "Sem dados."}</p>
      </main>
    );
  }

  return (
    <main className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Pontos</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-center">
            {stats.totalPontos}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Cidades</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-center">
            {stats.totalCidades}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Tipos de Doações Mais Comuns</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.tiposMaisComuns.map(([tipo, total]) => ({ tipo, total }))}>
              <XAxis dataKey="tipo" tick={{ fill: "#cbd5e1" }} />
              <YAxis tick={{ fill: "#cbd5e1" }} />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

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

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Distribuição por Cidade</CardTitle>
        </CardHeader>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={stats.cidades.map((cidade) => ({ name: cidade, value: 1 }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {stats.cidades.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
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
