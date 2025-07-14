'use client';

import { Search, Filter, X } from "lucide-react"

// Define os tipos de doação disponíveis para filtro.
const TIPOS_DOACAO = [
  { id: "alimentos", label: "Alimentos" },
  { id: "roupas", label: "Roupas" },
  { id: "higiene", label: "Itens de Higiene" },
  { id: "brinquedos", label: "Brinquedos" },
  { id: "moveis", label: "Móveis" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "outros", label: "Outros" },
] as const;

interface FiltroPontosProps {
  busca: string;
  setBuscaAction: (busca: string) => void;
  filtros: string[];
  setFiltrosAction: (filtros: string[]) => void;
}

export function FiltroPontos({ busca, setBuscaAction, filtros, setFiltrosAction }: FiltroPontosProps) {
  const toggleFiltro = (tipo: string) => {
    setFiltrosAction(
      filtros.includes(tipo)
        ? filtros.filter((f) => f !== tipo)
        : [...filtros, tipo]
    );
  };

  const limparFiltros = () => {
    setBuscaAction('');
    setFiltrosAction([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Campo de busca por texto */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou endereço..."
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={busca}
            onChange={(e) => setBuscaAction(e.target.value)}
          />
          {(busca || filtros.length > 0) && (
            <button 
              onClick={limparFiltros}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Limpar filtros"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Botão para mostrar/ocultar filtros */}
        <button 
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => {}}
        >
          <Filter className="h-4 w-4" />
          Filtrar
          {filtros.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {filtros.length}
            </span>
          )}
        </button>
      </div>

      {/* Seção de filtros por tipo de doação */}
      <div className="border rounded-lg p-4 bg-muted/10">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filtrar por tipo de doação:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {TIPOS_DOACAO.map((tipo) => {
            const isActive = filtros.includes(tipo.id);
            return (
              <button
                key={tipo.id}
                type="button"
                onClick={() => toggleFiltro(tipo.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-background border border-input hover:bg-accent hover:text-accent-foreground'
                }`}
                aria-pressed={isActive}
              >
                {tipo.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtros ativos como badges */}
      {filtros.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {filtros.map((filtro) => {
            const tipo = TIPOS_DOACAO.find((t) => t.id === filtro);
            if (!tipo) return null;
            
            return (
              <span 
                key={filtro} 
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-foreground text-sm"
              >
                {tipo.label}
                <button 
                  type="button" 
                  onClick={() => toggleFiltro(filtro)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Remover filtro ${tipo.label}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            );
          })}
          <button 
            type="button" 
            onClick={limparFiltros}
            className="text-sm text-muted-foreground hover:text-foreground ml-2"
          >
            Limpar todos
          </button>
        </div>
      )}
    </div>
  );
}
