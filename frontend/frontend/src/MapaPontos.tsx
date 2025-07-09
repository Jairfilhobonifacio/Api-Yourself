import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { PontoDoacao } from './types';

interface Props {
  pontos: PontoDoacao[];
}

export default function MapaPontos({ pontos }: Props) {
  const pontosComCoord = pontos.filter(p => p.latitude && p.longitude);
  const centro = pontosComCoord.length > 0
    ? [pontosComCoord[0].latitude!, pontosComCoord[0].longitude!]
    : [-23.5505, -46.6333]; // Default: São Paulo

  return (
    <div className="mapa-pontos">
      <MapContainer center={centro} zoom={12} style={{ height: '400px', width: '100%' }}>
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
