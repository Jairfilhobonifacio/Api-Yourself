import type { PontoDoacao } from './types';

interface Props {
  ponto: PontoDoacao;
  onFechar: () => void;
}

export default function DetalhePonto({ ponto, onFechar }: Props) {
  return (
    <div className="modal-detalhe">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onFechar}>×</button>
        <h3>{ponto.nome}</h3>
        <p><b>Endereço:</b> {ponto.endereco}</p>
        <p><b>Cidade:</b> {ponto.cidade}</p>
        <p><b>Tipos de Doação:</b> {(ponto.tipoDoacoes||[]).join(', ')}</p>
        <p><b>Itens Urgentes:</b> {(ponto.itensUrgentes||[]).join(', ')}</p>
        {ponto.horario && <p><b>Horário:</b> {ponto.horario}</p>}
        {ponto.contato && <p><b>Contato:</b> {ponto.contato}</p>}
        {ponto.latitude && ponto.longitude && (
          <p><b>Localização:</b> {ponto.latitude}, {ponto.longitude}</p>
        )}
      </div>
    </div>
  );
}
