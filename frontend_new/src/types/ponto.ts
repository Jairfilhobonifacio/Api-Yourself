export interface PontoDoacao {
  id?: string | number;
  nome?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  horarioFuncionamento?: string;
  necessidades?: (string | number | boolean)[];
  site?: string;
}
