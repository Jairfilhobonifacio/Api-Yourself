'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { useToast } from '@/components/ui/use-custom-toast'
import { Skeleton } from '@/components/ui/custom-skeleton'
import { Button } from '@/components/ui/custom-button'
import { LocateFixed, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

// Tipos para o Leaflet
import type { Icon, Map as LeafletMap, LocationEvent, LeafletEvent } from 'leaflet';

// Tipos e interfaces
type MapState = 'idle' | 'loading' | 'success' | 'error'

type PontoDoacao = {
  id: number
  nome: string
  endereco: string
  telefone: string
  email: string
  horarioFuncionamento: string
  necessidades: string[]
  site?: string
  coordenadas: [number, number]
}

interface MapaPontosProps {
  pontos: PontoDoacao[]
  className?: string
}

// Configuração do ícone do marcador (será definida apenas no navegador)
let DefaultIcon: Icon | null = null;

// Carrega os componentes do Leaflet dinamicamente apenas no cliente
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    )
  }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Inicializa o Leaflet apenas no navegador
if (typeof window !== 'undefined') {
  import('leaflet').then((L) => {
    // Corrige o problema de ícones ausentes no Leaflet
    delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
    
    DefaultIcon = L.icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon-2x.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  });
}

// Componente para o conteúdo do mapa que será carregado apenas no cliente
const MapaPontosContent = ({ pontos, className }: MapaPontosProps) => {
  const mapRef = useRef<LeafletMap>(null);
  const [mapState, setMapState] = useState<MapState>('idle')
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const { toast } = useToast()

  // Filtra e valida as coordenadas dos pontos
  const pontosValidos = useMemo(() => {
    return pontos.filter(ponto => {
      const [lat, lng] = ponto.coordenadas || [];
      return (
        Array.isArray(ponto.coordenadas) && 
        ponto.coordenadas.length === 2 &&
        typeof lat === 'number' && 
        typeof lng === 'number' &&
        !isNaN(lat) && 
        !isNaN(lng) &&
        lat >= -90 && 
        lat <= 90 && 
        lng >= -180 && 
        lng <= 180
      );
    });
  }, [pontos]);

  // Calcula o centro do mapa com base na média das coordenadas dos pontos válidos
  const centroMapa = useMemo<[number, number]>(() => {
    return pontosValidos.length > 0
      ? [ 
          pontosValidos.reduce((s, p) => s + p.coordenadas[0], 0) / pontosValidos.length, 
          pontosValidos.reduce((s, p) => s + p.coordenadas[1], 0) / pontosValidos.length 
        ]
      : [-23.5505, -46.6333] // Fallback para o centro de São Paulo.
  }, [pontosValidos])

  // Função para centralizar o mapa na localização do usuário
  const handleCenterOnUser = () => {
    if (!userLocation) {
      toast({ title: 'Localização não disponível', variant: 'destructive' })
      return
    }
    
    if (mapState === 'loading' || !mapRef.current) return
    
    setMapState('loading')
    try {
      mapRef.current.flyTo(userLocation, 15)
      setMapState('success')
    } catch (err) {
      console.error('Erro ao centralizar no usuário:', err)
      setMapState('error')
      toast({ 
        title: 'Erro ao centralizar', 
        description: 'Não foi possível centralizar no seu local',
        variant: 'destructive' 
      })
    } finally {
      setTimeout(() => setMapState('idle'), 1000)
    }
  }

  // Efeito para localizar o usuário quando o componente for montado
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    
    const handleLocationFound = (e: LocationEvent) => {
      const { lat, lng } = e.latlng;
      setUserLocation([lat, lng]);
    };

    const handleLocationError = (event: LeafletEvent) => {
      const error = event as unknown as { message: string };
      console.error('Erro ao obter localização:', error.message);
      toast({
        title: 'Não foi possível obter sua localização',
        description: 'Verifique as permissões de localização do seu navegador.',
        variant: 'destructive'
      });
    };
    
    map.locate({
      setView: true,
      maxZoom: 16,
      timeout: 10000,
      enableHighAccuracy: true
    });
    
    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);
    
    return () => {
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
      map.stopLocate();
    };
  }, [toast]);
  
  // Se não estiver no navegador, renderiza um skeleton
  if (typeof window === 'undefined') {
    return (
      <div className={cn('h-[600px] w-full', className)}>
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  return (
    <div className={cn('h-[600px] w-full relative', className)} role="region" aria-label="Mapa de pontos de doação">
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button 
          onClick={handleCenterOnUser} 
          size="icon" 
          variant="outline" 
          disabled={mapState === 'loading'} 
          aria-label="Centralizar no meu local"
        >
          {mapState === 'loading' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LocateFixed className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <MapContainer 
        center={centroMapa} 
        zoom={12} 
        style={{ height: '100%', width: '100%', zIndex: 0 }} 
        scrollWheelZoom={true} 
        className="rounded-lg border"
        ref={mapRef}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        />
        
        {pontosValidos.map((ponto) => (
          <Marker 
            key={ponto.id} 
            position={ponto.coordenadas} 
            icon={DefaultIcon || undefined}
          >
            <Popup className="leaflet-popup-custom">
              <div className="space-y-2 min-w-[250px]">
                <h3 className="font-bold text-base">{ponto.nome}</h3>
                <p className="text-sm text-muted-foreground">{ponto.endereco}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm"><span className="font-medium">Horário:</span> {ponto.horarioFuncionamento}</p>
                  <p className="text-sm"><span className="font-medium">Telefone:</span> <a href={`tel:${ponto.telefone}`} className="text-primary hover:underline">{ponto.telefone}</a></p>
                  <p className="text-sm"><span className="font-medium">Email:</span> <a href={`mailto:${ponto.email}`} className="text-primary hover:underline">{ponto.email}</a></p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {ponto.necessidades.map((necessidade: string) => (
                    <span key={necessidade} className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {necessidade}
                    </span>
                  ))}
                </div>
                {ponto.site && (
                  <a 
                    href={ponto.site.startsWith('http') ? ponto.site : `https://${ponto.site}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-2 text-sm text-primary hover:underline"
                  >
                    Visitar site
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

/**
 * Componente wrapper que garante que o mapa só seja renderizado no lado do cliente.
 * Exibe um skeleton durante o carregamento no servidor.
 */
function MapaPontosWrapper({ pontos, className }: MapaPontosProps) {
  // Se não estiver no navegador, retorna um skeleton
  if (typeof window === 'undefined') {
    return (
      <div className={cn('h-[600px] w-full', className)}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Carregando mapa...
          </div>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className={cn('h-[600px] w-full', className)}>
        <Skeleton className="h-full w-full" />
      </div>
    }>
      <MapaPontosContent pontos={pontos} className={className} />
    </Suspense>
  )
}

// Exporta o componente principal
export default function MapaPontos({ pontos, className }: MapaPontosProps) {
  return (
    <MapaPontosWrapper pontos={pontos} className={className} />
  )
}
