import type { Map } from 'leaflet'

// Extensão da interface Window para incluir a referência do mapa
declare global {
  interface Window {
    map: Map | null;
  }
}

export {};
