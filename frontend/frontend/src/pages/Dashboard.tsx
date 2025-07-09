import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Estatisticas, Necessidade } from '../types';

export default function Dashboard() {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [necessidades, setNecessidades] = useState<Necessidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro('');
      try {
        const [estat, nec] = await Promise.all([
          axios.get('http://localhost:3001/api/pontos/estatisticas'),
          axios.get('http://localhost:3001/api/pontos/necessidades')
        ]);
        setStats(estat.data);
        setNecessidades(nec.data);
      } catch (err) {
        setErro('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;
  if (erro) return <p className="erro">{erro}</p>;
  if (!stats) return null;

  // Mensagem de boas-vindas se não houver pontos cadastrados
  if (stats.totalPontos === 0) {
    return (
      <section className="dashboard">
        <h2>Bem-vindo ao Sistema de Doações!</h2>
        <p>Para começar, cadastre um ponto de doação clicando em <b>Lista</b> no menu acima e depois em <b>Novo Ponto</b>.</p>
        <div style={{marginTop: '2rem'}}>
          <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="Doação" width={120} height={120} style={{opacity:0.7}} />
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-totais">
        <div className="card"><b>Total de Pontos:</b> {stats.totalPontos}</div>
        <div className="card"><b>Cidades Atendidas:</b> {stats.totalCidades}</div>
      </div>
      <div className="dashboard-listas">
        <div className="card">
          <b>Tipos de Doação Mais Comuns:</b>
          <ul>{stats.tiposMaisComuns.slice(0,5).map(([tipo, total]) => <li key={tipo}>{tipo} ({total})</li>)}</ul>
        </div>
        <div className="card">
          <b>Itens Mais Urgentes:</b>
          <ul>{stats.itensMaisUrgentes.slice(0,5).map(([item, total]) => <li key={item}>{item} ({total})</li>)}</ul>
        </div>
        <div className="card">
          <b>Ranking de Necessidades:</b>
          <ol>{necessidades.slice(0,10).map(({item, total}) => <li key={item}>{item} ({total})</li>)}</ol>
        </div>
      </div>
    </section>
  );
}
