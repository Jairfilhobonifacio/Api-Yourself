// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Essencial para o uso de hooks como useState, useEffect e useCallback.
'use client';

// Importa os hooks do React para gerenciamento de estado, efeitos colaterais e memoização de funções.
import { useState, useEffect, useCallback } from 'react';
// Importa o serviço que encapsula as chamadas à API de pontos de doação.
import PontoDoacaoService from '@/lib/api/pontoDoacaoService';
// Importa os tipos de dados da API para garantir a tipagem e consistência.
import { 
  PontoDoacao, 
  Estatisticas, 
  ItemNecessario, 
  CriarPontoData, 
  AtualizarPontoData,
  UsePontosReturn 
} from '@/types/api';

/**
 * usePontos é um hook customizado que gerencia o estado e a lógica para
 * interagir com os dados de pontos de doação.
 * @returns {UsePontosReturn} Um objeto contendo o estado (pontos, loading, error)
 * e as funções para manipular os dados.
 */
export function usePontos(): UsePontosReturn {
  // Estado para armazenar a lista de pontos de doação.
  const [pontos, setPontos] = useState<PontoDoacao[]>([]);
  // Estado para controlar o status de carregamento das operações da API.
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para armazenar qualquer erro que ocorra durante as chamadas à API.
  const [error, setError] = useState<Error | null>(null);

  /**
   * Gera um ID único e seguro no lado do cliente.
   * Utiliza crypto.randomUUID() quando disponível para maior segurança.
   * Caso contrário, usa uma combinação de timestamp e número aleatório como fallback.
   * @returns {string} Um ID único.
   */
  const generateSafeId = (): string => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `temp-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  };

  // Define um tipo local para o ponto de doação sanitizado, garantindo que campos opcionais tenham um valor padrão.
  type PontoSanitizado = PontoDoacao & {
    telefone?: string;
    horarioFuncionamento?: string;
    necessidades?: string[];
  };

  /**
   * Sanitiza os dados de um ponto de doação para garantir que a UI não quebre
   * devido a campos ausentes ou em formatos inesperados.
   * @param {PontoDoacao} p - O objeto do ponto de doação a ser sanitizado.
   * @returns {PontoSanitizado} O objeto do ponto de doação com dados normalizados.
   */
  const sanitizePonto = useCallback(
    (p: PontoDoacao): PontoSanitizado => {
      // Normaliza o campo de necessidades, buscando em diferentes propriedades (necessidades, tipoDoacoes, itensUrgentes).
      const necessidadesRaw = Array.isArray(p.necessidades)
        ? p.necessidades
        : Array.isArray(p.tipoDoacoes)
        ? p.tipoDoacoes
        : Array.isArray(p.itensUrgentes)
        ? p.itensUrgentes
        : [];

      // Retorna um novo objeto com os campos garantidos.
      return {
        ...p,
        id: p.id ?? generateSafeId(), // Garante que sempre haja um ID.
        telefone: p.telefone ?? p.contato ?? 'Não informado', // Unifica campos de contato.
        horarioFuncionamento:
          p.horarioFuncionamento ?? (p as Partial<PontoDoacao>).horario ?? 'Horário não informado', // Unifica campos de horário.
        necessidades: (necessidadesRaw as unknown[]).map(n => String(n)), // Garante que as necessidades sejam um array de strings.
      };
    },
    [] // useCallback com array de dependências vazio para memoizar a função.
  );

  /**
   * Carrega a lista de pontos de doação da API de forma assíncrona.
   * Lida com estados de carregamento e erro.
   */
  const carregarPontos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando carregamento dos pontos de doação...');
      
      // Evita a execução no lado do servidor (SSR/SSG) para chamadas de API no cliente.
      if (typeof window === 'undefined') {
        console.log('Executando no servidor, aguardando requisição do cliente...');
        return [];
      }
      
      console.log('Fazendo requisição para a API...');
      const data = await PontoDoacaoService.listarTodos();
      
      // Valida se a resposta da API é um array.
      if (!Array.isArray(data)) {
        throw new Error('Resposta inválida da API: os dados não são um array');
      }
      
      console.log('Pontos carregados com sucesso. Total:', data.length);
      // Sanitiza cada ponto recebido da API.
      const sanitized = data.map(sanitizePonto);
      setPontos(sanitized);
      return sanitized;
    } catch (err) {
      console.error('Erro detalhado ao carregar pontos:', err);
      
      let errorMessage = 'Ocorreu um erro desconhecido ao carregar os pontos de doação';
      
      if (err instanceof Error) {
        errorMessage = `Erro ao carregar pontos de doação: ${err.message}`;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Função auxiliar para detectar erros de rede.
      const isNetworkError = (error: unknown): boolean => {
        if (error && typeof error === 'object') {
          if ('message' in error && 
              typeof error.message === 'string' && 
              (error.message.includes('Network Error') || 
               error.message.includes('Failed to fetch'))) {
            return true;
          }
          
          if ('code' in error && error.code === 'ECONNREFUSED') {
            return true;
          }
        }
        return false;
      };
      
      // Personaliza a mensagem de erro se for um problema de conexão.
      if (isNetworkError(err)) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.';
      }
      
      console.error('Mensagem de erro para o usuário:', errorMessage);
      const error = new Error(errorMessage);
      setError(error);
      
      // Retorna um array vazio para evitar que a UI quebre em caso de erro.
      return [];
    } finally {
      setLoading(false);
    }
  }, [sanitizePonto]);

  // useEffect para carregar os pontos de doação assim que o componente que usa o hook for montado.
  useEffect(() => {
    carregarPontos();
  }, [carregarPontos]);

  /**
   * Cria um novo ponto de doação.
   * @param {CriarPontoData} ponto - Os dados do novo ponto a ser criado.
   * @returns {Promise<PontoDoacao>} O novo ponto de doação criado e sanitizado.
   */
  const criarPonto = async (ponto: CriarPontoData) => {
    try {
      setLoading(true);
      console.log('Criando novo ponto de doação:', ponto);
      const novoPonto = await PontoDoacaoService.criar(ponto);
      console.log('Ponto criado com sucesso:', novoPonto);
      const sanitized = sanitizePonto(novoPonto);
      // Atualiza o estado local com o novo ponto.
      setPontos(prev => [...prev, sanitized]);
      return sanitized;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao criar ponto de doação: ${err.message}`
        : 'Ocorreu um erro desconhecido ao criar o ponto de doação';
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error; // Lança o erro para que o chamador possa tratá-lo.
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza um ponto de doação existente.
   * @param {number} id - O ID do ponto a ser atualizado.
   * @param {AtualizarPontoData} dadosAtualizados - Os novos dados para o ponto.
   * @returns {Promise<PontoDoacao>} O ponto de doação atualizado e sanitizado.
   */
  const atualizarPonto = async (id: number, dadosAtualizados: AtualizarPontoData) => {
    try {
      setLoading(true);
      console.log(`Atualizando ponto de doação ID ${id}:`, dadosAtualizados);
      const pontoAtualizado = await PontoDoacaoService.atualizar(id, dadosAtualizados);
      const sanitized = sanitizePonto(pontoAtualizado);
      console.log('Ponto atualizado com sucesso:', pontoAtualizado);
      // Atualiza o ponto correspondente no estado local.
      setPontos(prev => 
        prev.map(p => (p.id === id ? { ...p, ...sanitized } : p))
      );
      return sanitized;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao atualizar ponto de doação ID ${id}: ${err.message}`
        : `Ocorreu um erro desconhecido ao atualizar o ponto de doação ID ${id}`;
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove um ponto de doação.
   * @param {number} id - O ID do ponto a ser removido.
   */
  const removerPonto = async (id: number) => {
    try {
      setLoading(true);
      console.log(`Removendo ponto de doação ID ${id}...`);
      await PontoDoacaoService.remover(id);
      console.log(`Ponto ID ${id} removido com sucesso`);
      // Remove o ponto do estado local.
      setPontos(prev => prev.filter(ponto => ponto.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao remover ponto de doação ID ${id}: ${err.message}`
        : `Ocorreu um erro desconhecido ao remover o ponto de doação ID ${id}`;
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca pontos de doação por cidade.
   * @param {string} cidade - A cidade para a busca.
   * @returns {Promise<PontoDoacao[]>} Uma lista de pontos de doação na cidade especificada.
   */
  const buscarPorCidade = async (cidade: string) => {
    try {
      setLoading(true);
      console.log(`Buscando pontos de doação em ${cidade}...`);
      const pontosCidade = await PontoDoacaoService.buscarPorCidade(cidade);
      console.log(`Pontos encontrados em ${cidade}:`, pontosCidade);
      return pontosCidade;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao buscar pontos em ${cidade}: ${err.message}`
        : `Ocorreu um erro desconhecido ao buscar pontos em ${cidade}`;
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtém as estatísticas de doação da API.
   * @returns {Promise<Estatisticas>} Um objeto com as estatísticas.
   */
  const obterEstatisticas = async (): Promise<Estatisticas> => {
    try {
      setLoading(true);
      console.log('Obtendo estatísticas...');
      const estatisticas = await PontoDoacaoService.obterEstatisticas();
      console.log('Estatísticas obtidas com sucesso:', estatisticas);
      return estatisticas;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao obter estatísticas: ${err.message}`
        : 'Ocorreu um erro desconhecido ao obter as estatísticas';
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Lista todos os itens necessários (necessidades) da API.
   * @returns {Promise<ItemNecessario[]>} Uma lista de itens necessários.
   */
  const listarNecessidades = async (): Promise<ItemNecessario[]> => {
    try {
      setLoading(true);
      console.log('Listando itens necessários...');
      const necessidades = await PontoDoacaoService.listarNecessidades();
      console.log('Itens necessários obtidos com sucesso:', necessidades);
      return necessidades;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Erro ao listar necessidades: ${err.message}`
        : 'Ocorreu um erro desconhecido ao listar as necessidades';
      
      console.error(errorMessage, err);
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Retorna o estado e as funções para serem usados pelos componentes.
  return {
    pontos,
    loading,
    error,
    carregarPontos,
    criarPonto,
    atualizarPonto,
    removerPonto,
    buscarPorCidade,
    obterEstatisticas,
    listarNecessidades,
  };
}
