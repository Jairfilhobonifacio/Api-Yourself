// Importa a instância do apiClient, que é provavelmente uma configuração do Axios para fazer requisições HTTP.
import apiClient from './apiClient';
// Importa os tipos de dados da API para garantir a consistência e a tipagem correta nas chamadas.
import type { 
  PontoDoacao, 
  Estatisticas, 
  ItemNecessario,
  CriarPontoData,
  AtualizarPontoData 
} from '@/types/api';

// Define um tipo local que estende ItemNecessario para incluir a propriedade 'total'.
// Isso é útil para a UI, mesmo que a API não forneça esse dado diretamente.
type ItemNecessarioAtualizado = ItemNecessario & {
  total: number;
};

// Define uma interface para erros personalizados do serviço, estendendo a classe Error padrão.
// Isso permite adicionar informações extras, como status HTTP e dados do erro.
interface ServiceError extends Error {
  status?: number;
  data?: unknown;
}

// Objeto que agrupa todos os métodos de serviço relacionados aos pontos de doação.
const PontoDoacaoService = {
  /**
   * Lista todos os pontos de doação disponíveis.
   * @returns {Promise<PontoDoacao[]>} Uma promessa que resolve para um array de pontos de doação.
   * @throws {ServiceError} Lança um erro de serviço se a requisição falhar.
   */
  listarTodos: async (): Promise<PontoDoacao[]> => {
    try {
      console.log('Buscando pontos de doação...');
      const response = await apiClient.get<PontoDoacao[]>('/api/pontos');
      console.log('Pontos de doação recebidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar pontos de doação:', error);
      const serviceError = new Error('Falha ao carregar pontos de doação') as ServiceError;
      // Extrai detalhes do erro do Axios, se disponíveis, para enriquecer o erro de serviço.
      if (error && typeof error === 'object') {
        const axiosError = error as { 
          response?: { 
            status?: number; 
            data?: unknown;
            config?: unknown;
          };
          config?: unknown;
        };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
        console.error('Detalhes do erro:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          config: axiosError.config
        });
      }
      throw serviceError;
    }
  },

  /**
   * Busca um ponto de doação específico pelo seu ID.
   * @param {number} id - O ID do ponto de doação a ser buscado.
   * @returns {Promise<PontoDoacao>} Uma promessa que resolve para o objeto do ponto de doação.
   * @throws {ServiceError} Lança um erro se o ponto não for encontrado ou a requisição falhar.
   */
  buscarPorId: async (id: number): Promise<PontoDoacao> => {
    try {
      const response = await apiClient.get<PontoDoacao>(`/pontos/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar ponto de doação com ID ${id}:`, error);
      const serviceError = new Error(`Ponto de doação com ID ${id} não encontrado`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Busca pontos de doação por cidade.
   * @param {string} cidade - O nome da cidade para filtrar os pontos.
   * @returns {Promise<PontoDoacao[]>} Uma promessa que resolve para um array de pontos de doação na cidade especificada.
   * @throws {ServiceError} Lança um erro se a requisição falhar.
   */
  buscarPorCidade: async (cidade: string): Promise<PontoDoacao[]> => {
    try {
      const response = await apiClient.get<PontoDoacao[]>(`/pontos/cidade/${encodeURIComponent(cidade)}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar pontos na cidade ${cidade}:`, error);
      const serviceError = new Error(`Falha ao buscar pontos na cidade ${cidade}`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Cria um novo ponto de doação.
   * @param {CriarPontoData} ponto - Os dados do ponto de doação a ser criado.
   * @returns {Promise<PontoDoacao>} Uma promessa que resolve para o novo ponto de doação criado.
   * @throws {ServiceError} Lança um erro se a criação falhar.
   */
  criar: async (ponto: CriarPontoData): Promise<PontoDoacao> => {
    try {
      const response = await apiClient.post<PontoDoacao>('/api/pontos', ponto);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar ponto de doação:', error);
      const serviceError = new Error('Falha ao criar ponto de doação') as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Atualiza um ponto de doação existente.
   * @param {number} id - O ID do ponto de doação a ser atualizado.
   * @param {AtualizarPontoData} dadosAtualizacao - Os dados a serem atualizados.
   * @returns {Promise<PontoDoacao>} Uma promessa que resolve para o ponto de doação atualizado.
   * @throws {ServiceError} Lança um erro se a atualização falhar.
   */
  atualizar: async (id: number, dadosAtualizacao: AtualizarPontoData): Promise<PontoDoacao> => {
    try {
      // Primeiro, busca os dados atuais do ponto para garantir que não estamos sobrescrevendo com dados incompletos.
      const responseAtual = await apiClient.get<PontoDoacao>(`/pontos/id/${id}`);
      
      // Combina os dados existentes com os novos dados da atualização.
      const dadosAtualizados = { ...responseAtual.data, ...dadosAtualizacao };
      
      // Envia a requisição PUT com os dados combinados.
      const response = await apiClient.put<PontoDoacao>(`/pontos/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar ponto de doação com ID ${id}:`, error);
      const serviceError = new Error(`Falha ao atualizar ponto de doação com ID ${id}`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Remove um ponto de doação.
   * @param {number} id - O ID do ponto de doação a ser removido.
   * @returns {Promise<void>} Uma promessa que resolve quando a remoção é concluída.
   * @throws {ServiceError} Lança um erro se a remoção falhar.
   */
  remover: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/api/pontos/${id}`);
    } catch (error) {
      console.error(`Erro ao remover ponto de doação com ID ${id}:`, error);
      const serviceError = new Error(`Falha ao remover ponto de doação com ID ${id}`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Obtém as estatísticas de doação.
   * @returns {Promise<Estatisticas>} Uma promessa que resolve para o objeto de estatísticas.
   * @throws {ServiceError} Lança um erro se a requisição falhar.
   */
  obterEstatisticas: async (): Promise<Estatisticas> => {
    try {
      const response = await apiClient.get<Estatisticas>('/api/pontos/estatisticas');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      const serviceError = new Error('Falha ao carregar estatísticas') as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Lista os itens necessários para doação. (Simulado)
   * @returns {Promise<ItemNecessarioAtualizado[]>} Uma promessa que resolve para um array de itens necessários.
   * @throws {ServiceError} Lança um erro se a requisição falhar.
   */
  listarNecessidades: async (): Promise<ItemNecessarioAtualizado[]> => {
    try {
      // Esta é uma simulação, pois a API real pode não ter este endpoint ou retornar dados diferentes.
      const response = await apiClient.get<ItemNecessario[]>('/pontos/necessidades');
      
      // Adiciona uma quantidade aleatória para fins de demonstração na UI.
      return response.data.map(item => ({
        ...item,
        total: Math.floor(Math.random() * 100) // Valor aleatório para demonstração.
      }));
    } catch (error) {
      console.error('Erro ao listar itens necessários:', error);
      const serviceError = new Error('Falha ao carregar itens necessários') as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Adiciona um novo item necessário. (Simulado)
   * @param {string} item - O nome do item a ser adicionado.
   * @returns {Promise<ItemNecessarioAtualizado>} Uma promessa que resolve para o novo item criado.
   * @throws {ServiceError} Lança um erro se a operação falhar.
   */
  adicionarItemNecessario: async (item: string): Promise<ItemNecessarioAtualizado> => {
    try {
      // Em uma implementação real, esta seria uma chamada POST para a API.
      // Ex: const response = await apiClient.post<ItemNecessario>('/api/pontos/necessidades', { item });
      
      // Simula uma resposta da API para o novo item.
      const novoItem: ItemNecessarioAtualizado = {
        item,
        total: 0
      };
      
      return novoItem;
    } catch (error) {
      console.error('Erro ao adicionar item necessário:', error);
      const serviceError = new Error('Falha ao adicionar item necessário') as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Atualiza a quantidade de um item necessário. (Simulado)
   * @param {string} item - O nome do item a ser atualizado.
   * @param {number} quantidade - A nova quantidade do item.
   * @returns {Promise<ItemNecessarioAtualizado>} Uma promessa que resolve para o item atualizado.
   * @throws {ServiceError} Lança um erro se a operação falhar.
   */
  atualizarItemNecessario: async (item: string, quantidade: number): Promise<ItemNecessarioAtualizado> => {
    try {
      // Em uma implementação real, esta seria uma chamada PUT para a API.
      // Ex: const response = await apiClient.put<ItemNecessario>(`/api/pontos/necessidades/${encodeURIComponent(item)}`, { quantidade });
      
      // Simula uma resposta da API para o item atualizado.
      const itemAtualizado: ItemNecessarioAtualizado = {
        item,
        total: quantidade
      };
      
      return itemAtualizado;
    } catch (error) {
      console.error(`Erro ao atualizar item ${item}:`, error);
      const serviceError = new Error(`Falha ao atualizar item ${item}`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },

  /**
   * Remove um item necessário. (Simulado)
   * @param {string} item - O nome do item a ser removido.
   * @returns {Promise<void>} Uma promessa que resolve quando a remoção é concluída.
   * @throws {ServiceError} Lança um erro se a operação falhar.
   */
  removerItemNecessario: async (item: string): Promise<void> => {
    try {
      // Em uma implementação real, esta seria uma chamada DELETE para a API.
      // Ex: await apiClient.delete(`/api/pontos/necessidades/${encodeURIComponent(item)}`);
      
      // Simula uma resposta bem-sucedida.
      return;
    } catch (error) {
      console.error(`Erro ao remover item ${item}:`, error);
      const serviceError = new Error(`Falha ao remover item ${item}`) as ServiceError;
      if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        serviceError.status = axiosError.response?.status;
        serviceError.data = axiosError.response?.data;
      }
      throw serviceError;
    }
  },
};

export default PontoDoacaoService;
