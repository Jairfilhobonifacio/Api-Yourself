import '@testing-library/jest-dom';
import React from 'react';

// Mock para o next/dynamic
jest.mock('next/dynamic', () => (dynamicImport: () => React.ComponentType<unknown>) => {
  const DynamicComponent = (props: Record<string, unknown>) => {
    const Component = dynamicImport();
    return React.createElement(Component, props);
  };
  return DynamicComponent;
});

// Mock para o Leaflet
jest.mock('leaflet', () => {
  return {
    __esModule: true,
    default: {
      icon: jest.fn(),
      latLngBounds: jest.fn().mockReturnValue({
        extend: jest.fn()
      })
    }
  };
});

// Mock para o react-leaflet
jest.mock('react-leaflet', () => {
  interface LeafletComponentProps {
    children?: React.ReactNode;
    [key: string]: unknown;
  }
  
  const MapContainer = ({ children, ...props }: LeafletComponentProps) => {
    return React.createElement('div', { 
      role: 'region', 
      'aria-label': 'mapa',
      ...props 
    }, children);
  };

  const TileLayer = () => React.createElement('div', { 'data-testid': 'tile-layer' });
  
  const Marker = ({ children, ...props }: LeafletComponentProps) => {
    return React.createElement('div', { 'data-testid': 'marker', ...props }, children);
  };
  
  const Popup = ({ children }: { children?: React.ReactNode }) => {
    return React.createElement('div', { 'data-testid': 'popup' }, children);
  };

  return {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap: () => ({
      fitBounds: jest.fn()
    })
  };
});

// Mock para o next/image
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
      return React.createElement('img', { ...props });
    },
  };
});
