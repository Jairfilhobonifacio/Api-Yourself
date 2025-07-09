import PontoDoacao from '../models/PontoDoacao.js';

class PontoDoacaoController {
  // Lista agregada de itens necessários (itensUrgentes)
  static async listarNecessidades(req, res) {
    try {
      const pontos = await PontoDoacao.listarTodos();
      const contagem = {};
      pontos.forEach(p => {
        (p.itensurgentes || []).forEach(item => {
          contagem[item] = (contagem[item] || 0) + 1;
        });
      });
      // Ordena do mais necessário para o menos
      const ranking = Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .map(([item, total]) => ({ item, total }));
      res.json(ranking);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar necessidades', detalhe: error.message });
    }
  }

  // Estatísticas agregadas
  static async estatisticas(req, res) {
    try {
      const pontos = await PontoDoacao.listarTodos();
      const totalPontos = pontos.length;
      const cidades = new Set();
      const tipos = {};
      const itens = {};
      pontos.forEach(p => {
        cidades.add(p.cidade);
        (p.tipodoacoes || []).forEach(tipo => {
          tipos[tipo] = (tipos[tipo] || 0) + 1;
        });
        (p.itensurgentes || []).forEach(item => {
          itens[item] = (itens[item] || 0) + 1;
        });
      });
      res.json({
        totalPontos,
        totalCidades: cidades.size,
        tiposMaisComuns: Object.entries(tipos).sort((a, b) => b[1] - a[1]),
        itensMaisUrgentes: Object.entries(itens).sort((a, b) => b[1] - a[1]),
        cidades: Array.from(cidades)
      });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao calcular estatísticas', detalhe: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const pontos = await PontoDoacao.listarTodos();
      res.json(pontos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar pontos de doação', detalhe: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const ponto = await PontoDoacao.buscarPorId(id);
      if (!ponto) return res.status(404).json({ erro: 'Ponto de doação não encontrado' });
      res.json(ponto);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar ponto', detalhe: error.message });
    }
  }

  static async buscarPorCidade(req, res) {
    try {
      const { nome } = req.params;
      const pontos = await PontoDoacao.buscarPorCidade(nome);
      res.json(pontos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar pontos por cidade', detalhe: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const ponto = await PontoDoacao.criar(req.body);
      res.status(201).json(ponto);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar ponto', detalhe: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const ponto = await PontoDoacao.atualizar(id, req.body);
      if (!ponto) return res.status(404).json({ erro: 'Ponto não encontrado' });
      res.json(ponto);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar ponto', detalhe: error.message });
    }
  }

  static async remover(req, res) {
    try {
      const { id } = req.params;
      await PontoDoacao.remover(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao remover ponto', detalhe: error.message });
    }
  }
}

export default PontoDoacaoController;
