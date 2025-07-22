'use client'

import * as React from "react"
import { PontoCard } from "@/components/pontos/ponto-card"
import { FiltroPontos } from "@/components/pontos/filtro-pontos"
import { usePontosDoacao } from "@/context/PontosDoacaoContext"
import { useToast } from "@/components/ui/use-custom-toast"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/custom-alert"
import { Skeleton } from "@/components/ui/custom-skeleton"
import { AlertCircle, Plus, Loader2, Info } from "lucide-react"
import Link from "next/link"

export default function PontosPage() {
  const [busca, setBusca] = React.useState('')
  const [filtros, setFiltros] = React.useState<string[]>([])
  const [localError, setLocalError] = React.useState<Error | null>(null);
  const { toast } = useToast();
  const { 
    pontos, 
    loading, 
    error: contextError, 
    carregarPontos, 
    removerPonto 
  } = usePontosDoacao();
  
  // Definir tipo para o ponto de doação
  interface PontoDoacao {
    id?: string | number;
    nome?: string;
    endereco?: string;
    telefone?: string;
    email?: string;
    horarioFuncionamento?: string;
    necessidades?: (string | number | boolean)[];
    site?: string;
  }

  const [pontosLocais, setPontosLocais] = React.useState<PontoDoacao[]>([]);
  
  // Sincroniza os pontos locais com os pontos do contexto
  React.useEffect(() => {
    if (pontos) {
      setPontosLocais(pontos);
    }
  }, [pontos]);

  // Usar o erro do contexto ou o erro local
  const error = contextError || localError;

  // Funções de ação para o FiltroPontos
  const handleBuscaChange = React.useCallback((novaBusca: string) => {
    setBusca(novaBusca);
  }, []);
  
  const handleFiltrosChange = React.useCallback((novosFiltros: string[]) => {
    setFiltros(novosFiltros);
  }, []);

  // Carregar pontos ao montar o componente
  React.useEffect(() => {
    console.log('useEffect - Iniciando carregamento de pontos...');
    
    const buscarPontos = async () => {


      try {
        console.log('Buscando pontos...');
        // Limpar erros anteriores
        setLocalError(null);
        
        // Usar o carregarPontos do contexto
        const pontosCarregados = await carregarPontos();
        
        if (!Array.isArray(pontosCarregados)) {
          throw new Error('Resposta inválida ao carregar pontos: os dados não são um array');
        }
        
        console.log('Pontos carregados com sucesso. Total:', pontosCarregados.length);
        return pontosCarregados;
      } catch (error) {
        console.error('Erro ao carregar pontos:', error);
        
        // Criar um objeto de erro mais descritivo
        const errorMessage = error instanceof Error 
          ? `Erro ao carregar pontos: ${error.message}`
          : 'Ocorreu um erro desconhecido ao carregar os pontos de doação.';
        
        console.error(errorMessage);
        const newError = new Error(errorMessage);
        setLocalError(newError);
        
        // Propagar o erro para o contexto de erro do Next.js
        if (typeof window !== 'undefined') {
          window.console.error('Erro ao carregar pontos:', newError);
        }
        
        // Retornar array vazio em caso de erro para evitar quebras na interface
        return [];
      }
    };
    
    // Executar a busca de forma assíncrona
    buscarPontos().catch(console.error);
    
    // Função de limpeza
    return () => {
      console.log('useEffect - Limpando...');
      // Limpar qualquer timer ou assinatura se necessário
    };
  }, [carregarPontos])

  // Definir tipo para o ponto de doação recebido da API
  interface PontoDoacaoAPI {
    id?: string | number;
    nome?: string;
    endereco?: string;
    contato?: string;
    horario?: string;
    cidade?: string;
    tipodoacoes?: unknown[];
    email?: string;
    site?: string;
  }

  // Função para processar cada ponto individualmente
  const processarPonto = (ponto: PontoDoacaoAPI, index: number) => {
    // Gerar um ID único para o ponto
    const generateUniqueId = () => {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 8);
      return `ponto-${timestamp}-${random}-${index}`;
    };
    
    // Garantir que as propriedades necessárias existam
    const pontoId = ponto.id !== undefined && ponto.id !== null ? String(ponto.id) : generateUniqueId();
    
    try {
      // Extrair e validar os dados básicos
      const nome = typeof ponto.nome === 'string' ? ponto.nome : 'Sem nome';
      const endereco = typeof ponto.endereco === 'string' ? ponto.endereco : 'Endereço não informado';
      const contato = typeof ponto.contato === 'string' ? ponto.contato : 'Não informado';
      const horario = typeof ponto.horario === 'string' ? ponto.horario : 'Horário não informado';
      const cidade = typeof ponto.cidade === 'string' ? ponto.cidade : '';
      
      // Extrair e validar os tipos de doações
      const tipoDoacoes = (() => {
        if (!('tipodoacoes' in ponto) || !Array.isArray(ponto.tipodoacoes)) {
          return [];
        }
        return ponto.tipodoacoes.filter((item: unknown): item is string => 
          typeof item === 'string' && item.trim().length > 0
        );
      })();
      
      // Construir o endereço completo
      const enderecoCompleto = [endereco, cidade].filter(Boolean).join(', ');
      
      // Criar o objeto mapeado
      return {
        id: pontoId,
        nome,
        endereco: enderecoCompleto,
        telefone: contato,
        horarioFuncionamento: horario,
        necessidades: tipoDoacoes.length > 0 ? tipoDoacoes : ['Não especificado'],
        ...('email' in ponto && typeof ponto.email === 'string' && { email: ponto.email }),
        ...('site' in ponto && typeof ponto.site === 'string' && { site: ponto.site })
      };
      
    } catch (error) {
      console.error(`Erro ao mapear ponto na posição ${index}:`, error, 'Dados do ponto:', ponto);
      // Retornar um ponto de erro para evitar quebrar a UI
      return {
        id: `erro-${pontoId || index}`,
        nome: 'Erro ao carregar ponto',
        endereco: 'Não foi possível carregar as informações deste ponto',
        telefone: 'Não informado',
        horarioFuncionamento: 'Não informado',
        necessidades: ['Erro']
      };
    }
  };
  
  // Função para lidar com a exclusão de um ponto
  const handleDeletePonto = async (id: string | number) => {
    try {
      // Atualizar o estado local removendo o ponto excluído
      setPontosLocais(prev => prev.filter(p => p.id !== id));
      
      // Chamar a API para remover o ponto
      await removerPonto(Number(id));
      
      // Recarregar os pontos para garantir que a lista esteja atualizada
      await carregarPontos();
      
      // Mostrar mensagem de sucesso (usando variant default para sucesso)
      toast({
        title: "Sucesso",
        description: "Ponto de doação removido com sucesso.",
        variant: "default",
      });
    } catch (error) {
      console.error('Erro ao remover ponto:', error);
      
      // Mostrar mensagem de erro (usando variant destructive para erros)
      toast({
        title: "Erro",
        description: "Não foi possível remover o ponto de doação. Tente novamente.",
        variant: "destructive",
      });
      
      // Recarregar os pontos em caso de erro para garantir consistência
      await carregarPontos();
    }
  };
  
  // Mapear os pontos para o formato esperado pelo PontoCard
  console.log('Iniciando mapeamento de pontos. Total de pontos:', pontosLocais?.length || 0);
  
  const pontosMapeados = (pontosLocais || [])
    .filter((ponto: PontoDoacaoAPI, index: number) => {
      if (!ponto || typeof ponto !== 'object') {
        console.warn(`Ponto inválido (não é um objeto) na posição ${index}:`, ponto);
        return false;
      }
      
      const hasRequiredFields = 'nome' in ponto && 'endereco' in ponto;
      if (!hasRequiredFields) {
        console.warn(`Ponto na posição ${index} está faltando campos obrigatórios:`, ponto);
      }
      
      return hasRequiredFields;
    })
    .map((ponto: PontoDoacaoAPI, index: number) => processarPonto(ponto, index));
  
  console.log('Mapeamento de pontos concluído. Total de pontos mapeados:', pontosMapeados.length);

  // Filtrar pontos com base na busca e nos filtros
  console.log('Iniciando filtragem de pontos. Termo de busca:', busca, 'Filtros ativos:', filtros);
  
  // Removido tipo não utilizado
  const pontosFiltrados = pontosMapeados.filter((ponto) => {
    try {
      // Verificar busca
      const buscaMinuscula = busca.toLowerCase();
      const buscaCorresponde = 
        (ponto.nome || '').toLowerCase().includes(buscaMinuscula) ||
        (ponto.endereco || '').toLowerCase().includes(buscaMinuscula) ||
        (ponto.necessidades || []).some((n: string) => 
          n.toLowerCase().includes(buscaMinuscula)
        );

      // Verificar filtros
      const filtrosCorrespondem = 
        filtros.length === 0 || 
        filtros.every((filtro: string) => 
          (ponto.necessidades || []).some(
            (n: string) => n.toLowerCase() === filtro.toLowerCase()
          )
        );

      return buscaCorresponde && filtrosCorrespondem;
    } catch (error) {
      console.error('Erro ao filtrar ponto:', error, 'Dados do ponto:', ponto);
      return false;
    }
  });

  console.log('Filtragem concluída. Total de pontos filtrados:', pontosFiltrados.length);

  // Exibir skeleton loading durante o carregamento inicial
  if (loading || !pontos) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Carregando pontos de doação...</p>
          <Skeleton className="h-12 w-full" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Exibir mensagem de erro se houver um erro
  if (error) {
    return (
      <div className="container py-8">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar pontos de doação</AlertTitle>
          <AlertDescription>
            {error.message || 'Ocorreu um erro ao carregar os pontos de doação. Por favor, tente novamente mais tarde.'}
          </AlertDescription>
          <div className="mt-4">
            <button 
              className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={() => carregarPontos()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                'Tentar novamente'
              )}
            </button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pontos de Doação</h1>
          <p className="text-muted-foreground">
            Encontre locais que estão precisando de doações
          </p>
        </div>
        <Link 
          href="/pontos/novo" 
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Ponto
        </Link>
      </div>

      <div className="mb-8">
        <FiltroPontos 
          busca={busca}
          setBuscaAction={handleBuscaChange}
          filtros={filtros}
          setFiltrosAction={handleFiltrosChange}
        />
        
        {/* Mostrar contagem de resultados */}
        <div className="mt-4 text-sm text-muted-foreground">
          {pontosFiltrados.length === 0 ? (
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Nenhum ponto de doação encontrado com os filtros atuais.</span>
            </div>
          ) : (
            <span>
              Mostrando {pontosFiltrados.length} de {pontos.length} pontos de doação
            </span>
          )}
        </div>
      </div>

      {pontosFiltrados.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pontosFiltrados.map((ponto, index) => {
            // Gerar uma chave estável para cada ponto
            const pontoKey = `ponto-${ponto.id || 'sem-id'}-${index}`;
            
            try {
              // Validar dados mínimos necessários para renderização
              const pontoValido = {
                id: ponto.id || `temp-${index}`,
                nome: typeof ponto.nome === 'string' ? ponto.nome : 'Ponto sem nome',
                endereco: typeof ponto.endereco === 'string' ? ponto.endereco : 'Endereço não informado',
                telefone: typeof ponto.telefone === 'string' ? ponto.telefone : 'Não informado',
                horarioFuncionamento: typeof ponto.horarioFuncionamento === 'string' 
                  ? ponto.horarioFuncionamento 
                  : 'Horário não informado',
                necessidades: Array.isArray(ponto.necessidades) 
                  ? ponto.necessidades.filter((n: unknown) => n !== null && n !== undefined && String(n).trim() !== '')
                      .map(n => String(n))
                  : ['Não especificado'],
                ...(ponto.email && { email: ponto.email }),
                ...(ponto.site && { site: ponto.site })
              };
              
              return (
                <PontoCard 
                  key={pontoKey} 
                  {...pontoValido} 
                  onDelete={handleDeletePonto}
                />
              );
              
            } catch (error) {
              console.error('Erro ao renderizar ponto:', error, 'Dados do ponto:', ponto);
              // Usar uma chave de erro estável baseada no índice
              const errorKey = `erro-${index}`;
              return (
                <div key={errorKey} className="border rounded-lg p-4 bg-red-50">
                  <h4 className="font-medium text-red-700">Erro ao carregar ponto</h4>
                  <p className="text-sm text-red-600">
                    Não foi possível exibir as informações deste ponto de doação.
                  </p>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Info className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">
            {loading ? 'Carregando...' : 'Nenhum ponto encontrado'}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {loading 
              ? 'Buscando pontos de doação...' 
              : 'Não encontramos pontos que correspondam à sua busca. Tente ajustar os filtros ou o termo de busca.'}
          </p>
          
          {!loading && (busca || filtros.length > 0) && (
            <button 
              className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                setBusca('');
                setFiltros([]);
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}
