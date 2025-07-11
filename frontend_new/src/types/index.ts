export interface PontoDoacao {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  horarioFuncionamento: string;
  necessidades: string[];
  site?: string;
  coordenadas: [number, number];
}
