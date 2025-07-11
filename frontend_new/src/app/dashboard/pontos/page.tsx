'use client';

import { useState } from 'react';
import { PlusCircle, Pencil, Trash2, MapPin, Clock, Mail, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PontoDoacaoForm from '@/components/pontos/PontoDoacaoForm';
import { usePontosDoacao } from '@/context/PontosDoacaoContext';
import type { PontoDoacao, CriarPontoData, AtualizarPontoData } from '@/types/api';

export default function GerenciarPontosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pontoEditando, setPontoEditando] = useState<PontoDoacao | null>(null);
  const { toast } = useToast();
  
  // Usando o hook do contexto
  const {
    pontos,
    loading: isLoading,
    criarPonto,
    atualizarPonto,
    removerPonto
  } = usePontosDoacao();

  const handleSubmit = async (data: CriarPontoData | AtualizarPontoData) => {
    try {
      if (pontoEditando && 'id' in data) {
        await atualizarPonto(pontoEditando.id!, data as AtualizarPontoData);
        toast({
          title: 'Sucesso',
          description: 'Ponto de doação atualizado com sucesso!',
        });
      } else {
        await criarPonto(data as CriarPontoData);
        toast({
          title: 'Sucesso',
          description: 'Ponto de doação criado com sucesso!',
        });
      }
      setIsFormOpen(false);
      setPontoEditando(null);
    } catch (error) {
      console.error('Erro ao salvar ponto:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
      toast({
        title: 'Erro',
        description: `Não foi possível salvar o ponto de doação: ${errorMessage}`,
        variant: 'destructive',
      });
    }
  };

  const handleEditar = (ponto: PontoDoacao) => {
    setPontoEditando(ponto);
    setIsFormOpen(true);
  };

  const handleRemover = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este ponto de doação?')) return;
    
    try {
      await removerPonto(id);
      toast({
        title: 'Sucesso',
        description: 'Ponto de doação removido com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao remover ponto:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
      toast({
        title: 'Erro',
        description: `Não foi possível remover o ponto de doação: ${errorMessage}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Pontos de Doação</h1>
          <p className="text-muted-foreground">Adicione, edite ou remova pontos de doação</p>
        </div>
        <Button onClick={() => {
          setPontoEditando(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Ponto
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {pontoEditando ? 'Editar Ponto de Doação' : 'Adicionar Novo Ponto de Doação'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PontoDoacaoForm 
              pontoInicial={pontoEditando || undefined}
              onSubmitAction={handleSubmit}
              onCancelAction={() => {
                setIsFormOpen(false);
                setPontoEditando(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pontos.map((ponto) => (
            <Card key={ponto.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{ponto.nome}</CardTitle>
                    <CardDescription className="mt-1">{ponto.cidade}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditar(ponto)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => ponto.id && handleRemover(ponto.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{ponto.endereco}</span>
                  </div>
                  {ponto.horario && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{ponto.horario}</span>
                    </div>
                  )}
                  {ponto.contato && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{ponto.contato}</span>
                    </div>
                  )}
                  {ponto.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      <a href={`mailto:${ponto.email}`} className="hover:underline">
                        {ponto.email}
                      </a>
                    </div>
                  )}
                  {ponto.site && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="mr-2 h-4 w-4" />
                      <a 
                        href={ponto.site.startsWith('http') ? ponto.site : `https://${ponto.site}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {ponto.site}
                      </a>
                    </div>
                  )}
                  
                  {ponto.tipoDoacoes && ponto.tipoDoacoes.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Tipos de doação aceitos:</h4>
                      <div className="flex flex-wrap gap-1">
                        {ponto.tipoDoacoes.map((tipo, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tipo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {ponto.itensUrgentes && ponto.itensUrgentes.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Itens urgentes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {ponto.itensUrgentes.map((item, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`/mapa?ponto=${ponto.id}`, '_blank')}
                  >
                    Ver no mapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
