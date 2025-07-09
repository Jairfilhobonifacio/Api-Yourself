export interface PontoDoacao {
  id?: number;
  nome: string;
  endereco: string;
  cidade: string;
  tipoDoacoes: string[];
  itensUrgentes: string[];
  horario?: string;
  contato?: string;
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

export interface Necessidade {
  item: string;
  total: number;
}
