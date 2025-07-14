'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePontosDoacao } from '@/context/PontosDoacaoContext';
import { useToast } from '@/hooks/useToast';
// Estilos movidos para Tailwind CSS inline

export default function GerenciarPontosPage() {
  const router = useRouter();
  const { pontos, carregarPontos, removerPonto } = usePontosDoacao();
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const toast = useToast();

  const handleNovoPonto = () => {
    router.push('/dashboard/pontos/novo');
  };

  const handleEditarPonto = (id: number | string | undefined) => {
    if (id === undefined) return;
    const idNumber = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(idNumber)) return;
    router.push(`/dashboard/pontos/editar/${idNumber}`);
  };

  const handleRemover = async (id: number | string | undefined) => {
    if (id === undefined) return;
    const idNumber = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(idNumber)) return;
    
    if (!confirm('Tem certeza que deseja remover este ponto de doação?')) return;
    
    try {
      setIsRemoving(idNumber);
      await removerPonto(idNumber);
      toast.success('Ponto de doação removido com sucesso!');
      // Recarregar a lista após remoção
      await carregarPontos();
    } catch (error) {
      console.error('Erro ao remover ponto:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
      toast.error(`Não foi possível remover o ponto de doação: ${errorMessage}`);
    } finally {
      setIsRemoving(null);
    }
  };

  // Efeito para carregar os pontos quando o componente for montado
  useEffect(() => {
    const carregarDados = async () => {
      try {
        await carregarPontos();
      } catch (error) {
        console.error('Erro ao carregar pontos:', error);
        toast.error('Não foi possível carregar os pontos de doação');
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, [carregarPontos, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" aria-busy={isLoading} aria-live="polite">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Pontos de Doação</h1>
        <p className="text-gray-600">Adicione, edite ou remova pontos de doação</p>
      </div>
      <div className="mb-8">
        <button
          onClick={handleNovoPonto}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
          aria-label="Adicionar novo ponto de doação"
        >
          <PlusCircle className="w-5 h-5" />
          Novo Ponto
        </button>
      </div>

      {/* Lista de Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de pontos de doação">
        {pontos.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Nenhum ponto de doação cadastrado ainda.</p>
            <button
              onClick={handleNovoPonto}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Adicionar primeiro ponto
            </button>
          </div>
        ) : (
          pontos.map((pontoAtual) => (
          <div key={pontoAtual.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{pontoAtual.nome}</h2>
              <p className="text-gray-600 mt-1">{pontoAtual.cidade}</p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0" />
                <span className="text-gray-800">{pontoAtual.endereco}</span>
              </div>
              {pontoAtual.horario && (
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-800">{pontoAtual.horario}</span>
                </div>
              )}
              {pontoAtual.tipoDoacoes && pontoAtual.tipoDoacoes.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tipos de doação aceitos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pontoAtual.tipoDoacoes.map((tipo, index) => (
                      <span key={index} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tipo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {pontoAtual.itensUrgentes && pontoAtual.itensUrgentes.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Itens urgentes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pontoAtual.itensUrgentes.map((item, index) => (
                      <span key={index} className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  const id = pontoAtual.id;
                  if (id !== undefined) {
                    handleEditarPonto(id);
                  }
                }}
                disabled={isRemoving === pontoAtual.id}
                aria-label={`Editar ${pontoAtual.nome}`}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Editar
              </button>
              <button
                onClick={() => {
                  const id = pontoAtual.id;
                  if (id !== undefined) {
                    handleRemover(id);
                  }
                }}
                disabled={isRemoving === pontoAtual.id}
                aria-label={`Excluir ${pontoAtual.nome}`}
                className="ml-2 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {isRemoving === pontoAtual.id ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
