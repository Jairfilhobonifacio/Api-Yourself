import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { PontoDoacao } from '../types';

interface Props {
  pontos: PontoDoacao[];
}

export default function MapaPontos({ pontos }: Props) {
  const pontosComCoord = pontos.filter(p => typeof p.latitude === 'number' && typeof p.longitude === 'number');
  if (pontosComCoord.length === 0) {
    return <div style={{color:'#888',textAlign:'center',margin:'2em 0'}}>Nenhum ponto com localização para exibir no mapa.</div>;
  }
  const centro = [pontosComCoord[0].latitude!, pontosComCoord[0].longitude!];
  // Cria uma chave única baseada nos ids e coords para forçar remount limpo
  const mapKey = pontosComCoord.map(p=>`${p.id}-${p.latitude}-${p.longitude}`).join('|');

  return (
    <div className="mapa-pontos">
      <MapContainer key={mapKey} center={centro} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pontosComCoord.map(p => (
          <Marker key={p.id} position={[p.latitude!, p.longitude!] as [number, number]}>
            <Popup>
              <b>{p.nome}</b><br/>
              {p.endereco}<br/>
              {p.cidade}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
