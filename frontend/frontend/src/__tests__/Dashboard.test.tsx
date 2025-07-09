import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

const estatisticasMock = {
  totalPontos: 3,
  totalCidades: 2,
  tiposMaisComuns: [['Alimento', 2], ['Roupas', 1]],
  itensMaisUrgentes: [['Arroz', 2], ['Feijão', 1]],
  cidades: ['São Paulo', 'Campinas']
};
const necessidadesMock = [
  { item: 'Arroz', total: 2 },
  { item: 'Feijão', total: 1 }
];

describe('Dashboard', () => {
  beforeEach(() => {
    (axios.get as any).mockImplementation((url: string) => {
      if (url.includes('estatisticas')) return Promise.resolve({ data: estatisticasMock });
      if (url.includes('necessidades')) return Promise.resolve({ data: necessidadesMock });
      return Promise.reject();
    });
  });

  it('renderiza estatísticas e ranking', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Total de Pontos:')).toBeInTheDocument();
      expect(screen.getByText('Cidades Atendidas:')).toBeInTheDocument();
      expect(screen.getByText('Arroz (2)')).toBeInTheDocument();
      expect(screen.getByText('Feijão (1)')).toBeInTheDocument();
    });
  });
});
