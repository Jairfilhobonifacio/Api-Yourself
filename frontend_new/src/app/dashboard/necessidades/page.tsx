'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
// Removendo importação não utilizada
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PontoDoacaoService from '@/lib/api/pontoDoacaoService';

type ItemNecessario = {
  item: string;
  total: number;
};

export default function GerenciarNecessidadesPage() {
  const [itens, setItens] = useState<ItemNecessario[]>([]);
  const [novoItem, setNovoItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const carregarItens = useCallback(async () => {
    try {
      setIsLoading(true);
      const dados = await PontoDoacaoService.listarNecessidades();
      setItens(dados);
    } catch (error) {
      console.error('Erro ao carregar itens necessários:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens necessários.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    carregarItens();
  }, [carregarItens]);

  const adicionarItem = async () => {
    if (!novoItem.trim()) return;
    
    try {
      setIsSaving(true);
      // Aqui você precisaria implementar a lógica para adicionar um novo item
      // Como a API não tem um endpoint para adicionar itens individuais,
      // você pode precisar atualizar a lista de itens de um ponto de doação específico
      // ou implementar um novo endpoint no backend
      
      // Simulando uma adição local para demonstração
      setItens(prev => [...prev, { item: novoItem.trim(), total: 0 }]);
      setNovoItem('');
      
      toast({
        title: 'Sucesso',
        description: 'Item adicionado com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o item.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const removerItem = async (item: string) => {
    if (!confirm(`Tem certeza que deseja remover o item "${item}"?`)) return;
    
    try {
      // Aqui você precisaria implementar a lógica para remover o item
      // Como a API não tem um endpoint para remover itens individuais,
      // você pode precisar atualizar a lista de itens de um ponto de doação específico
      // ou implementar um novo endpoint no backend
      
      // Simulando uma remoção local para demonstração
      setItens(prev => prev.filter(i => i.item !== item));
      
      toast({
        title: 'Sucesso',
        description: 'Item removido com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o item.',
        variant: 'destructive',
      });
    }
  };

  const atualizarQuantidade = (item: string, novaQuantidade: number) => {
    setItens(prev => 
      prev.map(i => 
        i.item === item ? { ...i, total: Math.max(0, novaQuantidade) } : i
      )
    );
  };

  const salvarAlteracoes = async () => {
    try {
      setIsSaving(true);
      // Aqui você implementaria a lógica para salvar as alterações
      // Como a API não tem um endpoint para atualizar itens em lote,
      // você pode precisar implementar isso no backend
      
      toast({
        title: 'Sucesso',
        description: 'Alterações salvas com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciar Necessidades</h1>
        <p className="text-muted-foreground">
          Adicione ou remova itens da lista de necessidades dos pontos de doação
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Esta funcionalidade está em desenvolvimento. Atualmente, você pode visualizar os itens, mas as alterações não são salvas no servidor.
        </AlertDescription>
      </Alert>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Adicionar Novo Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="novoItem" className="sr-only">
                Novo Item
              </Label>
              <Input
                id="novoItem"
                placeholder="Ex: Leite em pó, Fraldas G"
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarItem())}
              />
            </div>
            <Button 
              type="button" 
              onClick={adicionarItem}
              disabled={!novoItem.trim() || isSaving}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Itens Necessários</CardTitle>
            <Button 
              onClick={salvarAlteracoes} 
              disabled={isSaving || isLoading}
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : itens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum item cadastrado. Adicione itens usando o formulário acima.
            </div>
          ) : (
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="font-medium">{item.item}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`quantidade-${index}`} className="text-sm text-muted-foreground">
                        Quantidade:
                      </Label>
                      <Input
                        id={`quantidade-${index}`}
                        type="number"
                        min="0"
                        value={item.total}
                        onChange={(e) => atualizarQuantidade(item.item, parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removerItem(item.item)}
                      disabled={isSaving}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
