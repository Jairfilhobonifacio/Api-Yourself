// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Essencial para o uso de hooks e para a interação com a biblioteca Leaflet no navegador.
'use client'

// Importa o `dynamic` do Next.js para carregar componentes dinamicamente, evitando a renderização no servidor (SSR).
import dynamic from 'next/dynamic'
// Importa hooks do React para gerenciar estado, efeitos colaterais e referências.
import { useEffect, Suspense, useMemo, useRef, useState } from 'react'
// Importa a biblioteca Leaflet e seus estilos.
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Importa componentes de UI personalizados.
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
// Importa ícones.
import { LocateFixed, Loader2 } from 'lucide-react'
// Importa utilitários.
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

// Importa o tipo PontoDoacao.
import type { PontoDoacao } from '@/types'

// Define os possíveis estados do mapa para controle da UI.
type MapState = 'idle' | 'loading' | 'success' | 'error'

// Carrega o MapContainer do react-leaflet dinamicamente.
// `ssr: false` impede que o componente seja renderizado no servidor.
// `loading` exibe um skeleton enquanto o componente do mapa está sendo carregado.
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

// Carrega outros componentes do react-leaflet dinamicamente.
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

// Importa o hook useMap do react-leaflet para obter a instância do mapa.
import { useMap as useLeafletMap } from 'react-leaflet/hooks'
import type { LatLngTuple } from 'leaflet'

// Configura o ícone padrão do Leaflet para corrigir problemas de caminho com o Webpack/Next.js.
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

/**
 * Componente interno que gerencia a lógica do mapa, como centralização e localização do usuário.
 * @param {object} props - Propriedades do componente.
 * @returns {null} Este componente não renderiza nada diretamente, apenas interage com o mapa.
 */
const MapaPontosContent = ({ pontos, onUserLocation, onError }: { pontos: PontoDoacao[], onUserLocation: (coords: [number, number]) => void, onError: (error: string) => void }) => {
  const map = useLeafletMap() // Obtém a instância do mapa.
  const pontosRef = useRef<L.LatLngTuple[]>([])
  const isInitialMount = useRef(true)

  // Efeito para localizar o usuário e centralizar o mapa.
  useEffect(() => {
    if (!map) return
    
    const handleLocationFound = (e: L.LocationEvent) => {
      const { lat, lng } = e.latlng
      onUserLocation([lat, lng])
      map.flyTo(e.latlng, 15) // Anima o mapa para a localização do usuário.
    }

    const handleLocationError = (e: L.ErrorEvent) => {
      onError(e.message || 'Não foi possível obter sua localização')
    }

    map.locate({ setView: false, maxZoom: 16, timeout: 10000, enableHighAccuracy: true })
       .on('locationfound', handleLocationFound)
       .on('locationerror', handleLocationError)

    return () => {
      if (map) {
        map.off('locationfound', handleLocationFound).off('locationerror', handleLocationError)
      }
    }
  }, [map, onUserLocation, onError])

  // Efeito para ajustar o zoom do mapa para incluir todos os pontos de doação.
  useEffect(() => {
    if (!map) return
    
    const coordenadas = pontos.map(p => p.coordenadas as LatLngTuple)
    
    if (isInitialMount.current || JSON.stringify(pontosRef.current) !== JSON.stringify(coordenadas)) {
      if (coordenadas.length > 0) {
        try {
          const bounds = L.latLngBounds(coordenadas)
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
        } catch { onError('Erro ao ajustar o mapa aos pontos') }
      }
      pontosRef.current = coordenadas
      isInitialMount.current = false
    }
  }, [map, pontos, onError])

  return null
}

interface MapaPontosProps {
  pontos: PontoDoacao[]
  className?: string
}

/**
 * Componente principal do mapa, renderizado apenas no cliente.
 */
function ClientMapaPontos({ pontos, className }: MapaPontosProps) {
  const [mapState, setMapState] = useState<MapState>('idle')
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const { toast } = useToast()

  // Calcula o centro do mapa com base na média das coordenadas dos pontos.
  const centroMapa = useMemo<[number, number]>(() => {
    return pontos.length > 0
      ? [ pontos.reduce((s, p) => s + p.coordenadas[0], 0) / pontos.length, pontos.reduce((s, p) => s + p.coordenadas[1], 0) / pontos.length ]
      : [-23.5505, -46.6333] // Fallback para o centro de São Paulo.
  }, [pontos])

  // Função para centralizar o mapa na localização do usuário.
  const handleCenterOnUser = () => {
    if (!userLocation) {
      toast({ title: 'Localização não disponível', variant: 'destructive' })
      return
    }
    if (mapState === 'loading') return
    setMapState('loading')
    setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && (window as any).map) {
          (window as any).map.flyTo(userLocation, 15)
        }
        setMapState('success')
      } catch (err) {
        setMapState('error')
        toast({ title: 'Erro ao centralizar', variant: 'destructive' })
      } finally {
        setTimeout(() => setMapState('idle'), 1000)
      }
    }, 500)
  }

  return (
    <div className={cn('h-[600px] w-full relative', className)} role="region" aria-label="Mapa de pontos de doação">
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button onClick={handleCenterOnUser} size="icon" variant="outline" disabled={mapState === 'loading'} aria-label="Centralizar no meu local">
          {mapState === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <LocateFixed className="h-5 w-5" />}
        </Button>
      </div>
      
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        <MapContainer center={centroMapa} zoom={12} style={{ height: '100%', width: '100%', zIndex: 0 }} scrollWheelZoom={true} className="rounded-lg border">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          <MapaPontosContent pontos={pontos} onUserLocation={setUserLocation} onError={(error) => toast({ title: 'Erro no mapa', description: error, variant: 'destructive' })} />
          {pontos.map((ponto) => (
            <Marker key={ponto.id} position={ponto.coordenadas} icon={DefaultIcon}>
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
                      <Badge key={necessidade} variant="secondary" className="text-xs">{necessidade}</Badge>
                    ))}
                  </div>
                  {ponto.site && <a href={ponto.site.startsWith('http') ? ponto.site : `https://${ponto.site}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-primary hover:underline">Visitar site</a>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Suspense>
    </div>
  )
}

/**
 * Componente wrapper que garante que o mapa só seja renderizado no lado do cliente.
 * Exibe um skeleton enquanto o componente não está montado no navegador.
 */
function MapaPontos({ pontos, className }: MapaPontosProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('h-[600px] w-full', className)}>
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  return <ClientMapaPontos pontos={pontos} className={className} />
}

export default MapaPontos
