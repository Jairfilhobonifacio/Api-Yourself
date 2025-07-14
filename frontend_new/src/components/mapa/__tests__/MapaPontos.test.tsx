import { render, screen } from '@testing-library/react'
import MapaPontos from '../mapa-pontos'

describe('MapaPontos', () => {
  const mockPontos = [
    {
      id: 1,
      nome: 'Ponto de Doação 1',
      endereco: 'Rua Teste, 123',
      telefone: '(11) 99999-9999',
      email: 'contato@ponto1.com',
      horarioFuncionamento: 'Seg a Sex, 9h às 18h',
      necessidades: ['Alimentos', 'Roupas'],
      site: 'https://ponto1.com',
      coordenadas: [-23.5505, -46.6333] as [number, number]
    },
    {
      id: 2,
      nome: 'Ponto de Doação 2',
      endereco: 'Av. Teste, 456',
      telefone: '(11) 98888-8888',
      email: 'contato@ponto2.com',
      horarioFuncionamento: 'Ter a Sáb, 10h às 19h',
      necessidades: ['Brinquedos', 'Livros'],
      coordenadas: [-23.5605, -46.6433] as [number, number]
    }
  ]

  it('deve renderizar o componente sem erros', () => {
    render(<MapaPontos pontos={mockPontos} className="test-class" />)
    
    // Verifica se o container do mapa foi renderizado
    const mapContainer = screen.getByRole('region', { name: /mapa/i })
    expect(mapContainer).toBeInTheDocument()
    
    // Verifica se a classe foi aplicada corretamente
    expect(mapContainer).toHaveClass('test-class')
  })

  it('deve renderizar o skeleton quando estiver carregando', () => {
    // Mock do window para simular renderização no servidor
    const originalWindow = global.window
    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true
    })

    render(<MapaPontos pontos={mockPontos} />)
    
    // Verifica se o skeleton foi renderizado
    const skeleton = document.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
    
    // Restaura o window original
    Object.defineProperty(global, 'window', {
      value: originalWindow,
      writable: true
    })
  })
})
