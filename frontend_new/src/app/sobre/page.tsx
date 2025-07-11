'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SobrePage() {
  return (
    <main className="container max-w-3xl py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Sobre a ApiYourself</h1>
        <p className="text-muted-foreground text-lg">
          Nossa missão é conectar doadores a quem mais precisa, promovendo solidariedade
          e transformando vidas através de doações.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Nossa História</h2>
        <p>
          Fundada em 2025, a <strong>ApiYourself</strong> nasceu com o objetivo de
          facilitar o encontro entre pessoas que desejam doar e instituições ou
          pontos de coleta que necessitam de itens essenciais. Acreditamos que a
          tecnologia pode ser uma ponte poderosa para criar impacto social
          positivo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Missão, Visão e Valores</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Missão:</strong> Tornar a doação acessível e eficiente para
            todos.
          </li>
          <li>
            <strong>Visão:</strong> Ser a principal plataforma de conexão entre
            doadores e instituições na América Latina.
          </li>
          <li>
            <strong>Valores:</strong> Empatia, Transparência, Inovação e Impacto
            Social.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Como Funciona</h2>
        <p>
          Utilizamos dados em tempo real para mostrar pontos de coleta próximos a
          você. Ao se cadastrar, é possível adicionar novos pontos, atualizar
          necessidades e acompanhar métricas de impacto.
        </p>
      </section>

      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a Home
        </Link>
      </Button>
    </main>
  );
}
