// Indica que este é um componente do lado do cliente
'use client';

// Importações de hooks do React
import { useState, useEffect, useCallback } from 'react';
// Importação de ícones da biblioteca Lucide
import { PlusCircle, Trash2, AlertCircle } from 'lucide-react';
// Importação de componentes de UI personalizados
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/custom-card';
import { Input } from '@/components/ui/custom-input';
import { Label } from '@/components/ui/custom-label';
import { useToast } from '@/components/ui/use-custom-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/custom-alert';
// Importação do serviço para interagir com a API de pontos de doação
import PontoDoacaoService from '@/lib/api/pontoDoacaoService';

/**
 * Tipo que define a estrutura de um item necessário
 * @property {string} item - Nome/descrição do item
 * @property {number} total - Quantidade necessária do item
 */
type ItemNecessario = {
  item: string;
  total: number;
};

/**
 * Componente para gerenciar os itens necessários para doação
 * Permite visualizar, adicionar, remover e atualizar itens
 */
export default function GerenciarNecessidadesPage() {
  // Estado para armazenar a lista de itens necessários
  const [itens, setItens] = useState<ItemNecessario[]>([]);
  // Estado para controlar o input de novo item
  const [novoItem, setNovoItem] = useState('');
  // Estado para controlar o carregamento dos dados
  const [isLoading, setIsLoading] = useState(true);
  // Estado para controlar o salvamento de alterações
  const [isSaving, setIsSaving] = useState(false);
  // Hook para exibir notificações toast
  const { toast } = useToast();

  /**
   * Função assíncrona para carregar os itens necessários da API
   * Atualiza o estado com os dados buscados ou exibe erro em caso de falha
   */
  const carregarItens = useCallback(async () => {
    try {
      setIsLoading(true);
      // Busca os itens necessários da API
      const dados = await PontoDoacaoService.listarNecessidades();
      // Atualiza o estado com os dados recebidos
      setItens(dados);
    } catch (error) {
      console.error('Erro ao carregar itens necessários:', error);
      // Exibe notificação de erro
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens necessários.',
        variant: 'destructive',
      });
    } finally {
      // Independente do resultado, finaliza o estado de carregamento
      setIsLoading(false);
    }
  }, [toast]);

  // Efeito para carregar os itens quando o componente for montado
  // e sempre que a função carregarItens for alterada
  useEffect(() => {
    carregarItens();
  }, [carregarItens]);

  /**
   * Adiciona um novo item à lista de necessidades
   * Atualmente em modo de demonstração (não persiste no servidor)
   * @returns {Promise<void>}
   */
  const adicionarItem = async () => {
    // Não faz nada se o campo estiver vazio ou contiver apenas espaços
    if (!novoItem.trim()) return;
    
    try {
      // Ativa o estado de salvamento
      setIsSaving(true);
      
      // TODO: Implementar a lógica real de adição de item
      // A API atual não tem um endpoint para adicionar itens individuais,
      // seria necessário:
      // 1. Criar um novo endpoint no backend para adicionar itens
      // 2. Ou atualizar a lista completa de itens de um ponto de doação
      
      // Implementação temporária: adiciona o item apenas localmente
      setItens(prev => [...prev, { item: novoItem.trim(), total: 0 }]);
      // Limpa o campo de input
      setNovoItem('');
      
      // Exibe notificação de sucesso
      toast({
        title: 'Sucesso',
        description: 'Item adicionado com sucesso!',
      });
    } catch (error) {
      // Em caso de erro, registra no console e exibe notificação
      console.error('Erro ao adicionar item:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o item.',
        variant: 'destructive',
      });
    } finally {
      // Finaliza o estado de salvamento independentemente do resultado
      setIsSaving(false);
    }
  };

  /**
   * Remove um item da lista de necessidades
   * Atualmente em modo de demonstração (não persiste no servidor)
   * @param {string} item - Nome do item a ser removido
   * @returns {Promise<void>}
   */
  const removerItem = async (item: string) => {
    // Solicita confirmação antes de remover
    if (!confirm(`Tem certeza que deseja remover o item "${item}"?`)) return;
    
    try {
      // TODO: Implementar a lógica real de remoção de item
      // A API atual não tem um endpoint para remover itens individuais,
      // seria necessário:
      // 1. Criar um novo endpoint no backend para remover itens
      // 2. Ou atualizar a lista completa de itens de um ponto de doação
      
      // Implementação temporária: remove o item apenas localmente
      setItens(prev => prev.filter(i => i.item !== item));
      
      // Exibe notificação de sucesso
      toast({
        title: 'Sucesso',
        description: 'Item removido com sucesso!',
      });
    } catch (error) {
      // Em caso de erro, registra no console e exibe notificação
      console.error('Erro ao remover item:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o item.',
        variant: 'destructive',
      });
    }
  };

  /**
   * Atualiza a quantidade de um item na lista local
   * @param {string} item - Nome do item a ser atualizado
   * @param {number} novaQuantidade - Nova quantidade do item (será arredondada para não ser negativa)
   */
  const atualizarQuantidade = (item: string, novaQuantidade: number) => {
    // Atualiza o estado dos itens, modificando apenas o item especificado
    setItens(prev => 
      prev.map(i => 
        // Se for o item alvo, atualiza a quantidade (garantindo que não seja negativo)
        i.item === item ? { ...i, total: Math.max(0, novaQuantidade) } : i
      )
    );
  };

  /**
   * Salva as alterações feitas nos itens
   * Atualmente em modo de demonstração (não persiste no servidor)
   * @returns {Promise<void>}
   */
  const salvarAlteracoes = async () => {
    try {
      // Ativa o estado de salvamento
      setIsSaving(true);
      
      // TODO: Implementar a lógica de salvamento real
      // A API atual não tem um endpoint para atualizar itens em lote,
      // seria necessário:
      // 1. Criar um novo endpoint no backend para salvar todas as alterações
      // 2. Ou enviar cada alteração individualmente para a API existente
      
      // Exibe notificação de sucesso (apenas para demonstração)
      toast({
        title: 'Sucesso',
        description: 'Alterações salvas com sucesso!',
      });
    } catch (error) {
      // Em caso de erro, registra no console e exibe notificação
      console.error('Erro ao salvar alterações:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      // Finaliza o estado de salvamento independentemente do resultado
      setIsSaving(false);
    }
  };

  return (
    // Container principal da página com padding vertical e centralização
    <div className="container mx-auto py-8">
      {/* Cabeçalho da página com título e descrição */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciar Necessidades</h1>
        <p className="text-muted-foreground">
          Adicione ou remova itens da lista de necessidades dos pontos de doação
        </p>
      </div>

      {/* Alerta informativo sobre o estado de desenvolvimento */}
      <Alert className="mb-6" variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Esta funcionalidade está em desenvolvimento. Atualmente, você pode visualizar os itens, mas as alterações não são salvas no servidor.
        </AlertDescription>
      </Alert>

      {/* Card para adicionar um novo item */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Adicionar Novo Item</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulário para adicionar itens */}
          <div className="flex gap-4">
            {/* Campo de entrada para o novo item */}
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
                aria-label="Digite o nome do novo item"
              />
            </div>
            {/* Botão para adicionar o item */}
            <Button 
              type="button" 
              onClick={adicionarItem}
              disabled={!novoItem.trim() || isSaving}
              aria-label="Adicionar item"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card que lista os itens necessários */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Itens Necessários</CardTitle>
            {/* Botão para salvar todas as alterações */}
            <Button 
              onClick={salvarAlteracoes} 
              disabled={isSaving || isLoading}
              variant="default"
              aria-label="Salvar alterações"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Estado de carregamento */}
          {isLoading ? (
            <div className="flex justify-center items-center h-32" aria-live="polite" aria-busy="true">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
            </div>
          ) : 
          /* Estado quando não há itens */
          itens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground" aria-live="polite">
              Nenhum item cadastrado. Adicione itens usando o formulário acima.
            </div>
          ) : (
            /* Lista de itens */
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  role="listitem"
                >
                  {/* Nome do item */}
                  <div className="flex-1 font-medium">{item.item}</div>
                  
                  {/* Controles de quantidade e ações */}
                  <div className="flex items-center gap-4">
                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-2">
                      {/* Botão para diminuir quantidade */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.item, item.total - 1)}
                        disabled={item.total <= 0}
                        className="w-8 h-8 p-0"
                        aria-label={`Diminuir quantidade de ${item.item}`}
                      >
                        -
                      </Button>
                      
                      {/* Exibição da quantidade atual */}
                      <span className="w-8 text-center" aria-live="polite">
                        {item.total}
                      </span>
                      
                      {/* Botão para aumentar quantidade */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => atualizarQuantidade(item.item, item.total + 1)}
                        className="w-8 h-8 p-0"
                        aria-label={`Aumentar quantidade de ${item.item}`}
                      >
                        +
                      </Button>
                    </div>
                    
                    {/* Botão para remover o item */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removerItem(item.item)}
                      className="text-destructive hover:text-destructive/90"
                      aria-label={`Remover ${item.item}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
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
