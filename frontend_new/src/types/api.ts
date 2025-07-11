// Tipos para a API de Pontos de Doação

export interface PontoDoacao {
  id?: number | string;
  nome: string;
  endereco: string;
  cidade: string;
  // Arrays podem vir vazios ou ausentes
  tipoDoacoes?: string[];
  itensUrgentes?: string[];
  necessidades?: string[];
  // Dados de contato/hora podem vir em formatos alternativos
  telefone?: string;
  horario?: string;
  horarioFuncionamento?: string;
  contato?: string;
  email?: string;
  site?: string;
  latitude?: number;
  longitude?: number;
}

export interface Estatisticas {
  totalPontos: number;
  totalCidades: number;
  tiposMaisComuns: [string, number][];
  itensMaisUrgentes: [string, number][];
  cidades: string[];
}

export interface ItemNecessario {
  item: string;
  total: number;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

// Tipos para os parâmetros das requisições
export type CriarPontoData = Omit<PontoDoacao, 'id'>;
export type AtualizarPontoData = Partial<PontoDoacao>;

// Tipo para o retorno do hook usePontos
export interface UsePontosReturn {
  pontos: PontoDoacao[];
  loading: boolean;
  error: Error | null;
  carregarPontos: () => Promise<PontoDoacao[]>;
  criarPonto: (ponto: CriarPontoData) => Promise<PontoDoacao>;
  atualizarPonto: (id: number, dados: AtualizarPontoData) => Promise<PontoDoacao>;
  removerPonto: (id: number) => Promise<void>;
  buscarPorCidade: (cidade: string) => Promise<PontoDoacao[]>;
  obterEstatisticas: () => Promise<Estatisticas>;
  listarNecessidades: () => Promise<ItemNecessario[]>;
}
