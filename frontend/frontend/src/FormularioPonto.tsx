import { useState, useEffect } from 'react';
import axios from 'axios';
import type { PontoDoacao } from './types';

interface Props {
  ponto?: PontoDoacao;
  onSalvo: () => void;
  onCancel: () => void;
}

export default function FormularioPonto({ ponto, onSalvo, onCancel }: Props) {
  const [form, setForm] = useState<PontoDoacao>(
    ponto || {
      nome: '',
      endereco: '',
      cidade: '',
      tipoDoacoes: [],
      itensUrgentes: [],
      horario: '',
      contato: '',
      latitude: undefined,
      longitude: undefined,
    }
  );
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleArrayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value.split(',').map(s => s.trim()) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    try {
      if (ponto && ponto.id) {
        await axios.put(`http://localhost:3001/api/pontos/${ponto.id}`, form);
      } else {
        await axios.post('http://localhost:3001/api/pontos', form);
      }
      onSalvo();
    } catch {
      setErro('Erro ao salvar ponto.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="form-ponto" onSubmit={handleSubmit}>
      <h3>{ponto ? 'Editar' : 'Novo'} Ponto de Doação</h3>
      <label>
        Nome:
        <input name="nome" value={form.nome} onChange={handleChange} required />
      </label>
      <label>
        Endereço:
        <input name="endereco" value={form.endereco} onChange={handleChange} required />
      </label>
      <label>
        Cidade:
        <input name="cidade" value={form.cidade} onChange={handleChange} required />
      </label>
      <label>
        Tipos de Doação (separados por vírgula):
        <input name="tipoDoacoes" value={form.tipoDoacoes.join(', ')} onChange={handleArrayChange} />
      </label>
      <label>
        Itens Urgentes (separados por vírgula):
        <input name="itensUrgentes" value={form.itensUrgentes.join(', ')} onChange={handleArrayChange} />
      </label>
      <label>
        Horário:
        <input name="horario" value={form.horario || ''} onChange={handleChange} />
      </label>
      <label>
        Contato:
        <input name="contato" value={form.contato || ''} onChange={handleChange} />
      </label>
      <label>
        Latitude:
        <input name="latitude" type="number" value={form.latitude ?? ''} onChange={handleChange} step="any" />
      </label>
      <label>
        Longitude:
        <input name="longitude" type="number" value={form.longitude ?? ''} onChange={handleChange} step="any" />
      </label>
      {erro && <p className="erro">{erro}</p>}
      <div className="botoes-form">
        <button type="submit" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar'}</button>
        <button type="button" onClick={onCancel} disabled={salvando}>Cancelar</button>
      </div>
    </form>
  );
}
