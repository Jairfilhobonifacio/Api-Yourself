import { useEffect, useState } from 'react';
import axios from 'axios';
import type { PontoDoacao } from './types';
import FormularioPonto from './FormularioPonto';
import DetalhePonto from './DetalhePonto';
import MapaPontos from './MapaPontos';

export default function ListaPontos() {
  const [novo, setNovo] = useState(false);
  const [editando, setEditando] = useState<PontoDoacao | undefined>();
  const [detalhe, setDetalhe] = useState<PontoDoacao | undefined>();

  const [pontos, setPontos] = useState<PontoDoacao[]>([]);
  const [busca, setBusca] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [tiposDisponiveis, setTiposDisponiveis] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarPontos();
    carregarTipos();
  }, []);

  async function carregarPontos() {
    setCarregando(true);
    setErro('');
    try {
      const { data } = await axios.get('http://localhost:3001/api/pontos');
      setPontos(data);
    } catch {
      setErro('Erro ao carregar pontos.');
    } finally {
      setCarregando(false);
    }
  }

  async function carregarTipos() {
    try {
      const { data } = await axios.get('http://localhost:3001/api/pontos/estatisticas');
      setTiposDisponiveis(data.tiposMaisComuns.map(([tipo]: [string, number]) => tipo));
    } catch {}
  }

  async function excluirPonto(id: number) {
    if (!window.confirm('Tem certeza que deseja excluir este ponto?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/pontos/${id}`);
      carregarPontos();
    } catch {
      alert('Erro ao excluir ponto.');
    }
  }

  const pontosFiltrados = pontos.filter(p => {
    const buscaOk =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase());
    const tipoOk = !tipoFiltro || (p.tipoDoacoes || []).includes(tipoFiltro);
    return buscaOk && tipoOk;
  });

  return (
    <section className="lista-pontos">
      <h2>Pontos de Doação</h2>
      <div className="filtros-lista">
        <input
          type="text"
          placeholder="Buscar por nome ou cidade..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
          <option value="">Todos os tipos</option>
          {tiposDisponiveis.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        <button onClick={() => setNovo(true)}>Novo Ponto</button>
      </div>
      {carregando && <p>Carregando pontos...</p>}
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Tipos de Doação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pontosFiltrados.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.cidade}</td>
              <td>{(p.tipoDoacoes||[]).join(', ')}</td>
              <td>
                <button onClick={() => { setEditando(p); setNovo(false); }}>Editar</button>
                <button onClick={() => excluirPonto(p.id!)}>Excluir</button>
                <button onClick={() => setDetalhe(p)}>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ margin: '2rem 0' }}>
        <h3>Visualizar no Mapa</h3>
        <MapaPontos pontos={pontosFiltrados} />
      </div>
      {novo && (
        <FormularioPonto
          onSalvo={() => { setNovo(false); setEditando(undefined); carregarPontos(); }}
          onCancel={() => setNovo(false)}
        />
      )}
      {editando && (
        <FormularioPonto
          ponto={editando}
          onSalvo={() => { setEditando(undefined); setNovo(false); carregarPontos(); }}
          onCancel={() => setEditando(undefined)}
        />
      )}
      {detalhe && (
        <DetalhePonto
          ponto={detalhe}
          onFechar={() => setDetalhe(undefined)}
        />
      )}
    </section>
  );
}
