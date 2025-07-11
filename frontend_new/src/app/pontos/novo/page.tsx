'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePontosDoacao } from '@/context/PontosDoacaoContext';
import PontoDoacaoForm from '@/components/pontos/PontoDoacaoForm';
import { CriarPontoData, AtualizarPontoData } from '@/types/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NovoPontoPage() {
  const { criarPonto } = usePontosDoacao();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: CriarPontoData | AtualizarPontoData) => {
    try {
      setSubmitting(true);
      await criarPonto(data as CriarPontoData);
      // Depois de criar, redirecionar para lista de pontos
      router.push('/pontos');
    } catch (error) {
      // TODO: exibir toast ou alerta de erro
      console.error('Erro ao criar ponto', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container max-w-4xl py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Ponto de Doação</h1>
        <p className="text-muted-foreground">Preencha as informações abaixo para cadastrar um novo ponto.</p>
      </header>

      <PontoDoacaoForm
        onSubmitAction={handleSubmit}
        onCancelAction={() => router.push('/pontos')}
      />

      <Button variant="outline" asChild disabled={submitting}>
        <Link href="/pontos">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a lista
        </Link>
      </Button>
    </main>
  );
}
