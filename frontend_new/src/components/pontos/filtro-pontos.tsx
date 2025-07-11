// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Necessário para o uso de estado (useState) e interatividade.
'use client';

// Importa ícones e componentes de UI personalizados.
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Define os tipos de doação disponíveis para filtro.
const TIPOS_DOACAO = [
  { id: "alimentos", label: "Alimentos" },
  { id: "roupas", label: "Roupas" },
  { id: "higiene", label: "Itens de Higiene" },
  { id: "brinquedos", label: "Brinquedos" },
  { id: "moveis", label: "Móveis" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "outros", label: "Outros" },
]

// Define a interface para as propriedades do componente.
interface FiltroPontosProps {
  busca: string // O termo de busca atual.
  setBuscaAction: (busca: string) => void // Função para atualizar o termo de busca.
  filtros: string[] // O array de filtros de tipo de doação ativos.
  setFiltrosAction: (filtros: string[]) => void // Função para atualizar os filtros.
}

/**
 * FiltroPontos é um componente que fornece a UI para buscar e filtrar os pontos de doação.
 * @param {FiltroPontosProps} props - As propriedades para controlar o estado do filtro.
 * @returns {JSX.Element} O elemento JSX que representa a barra de filtros.
 */
export function FiltroPontos({ busca, setBuscaAction, filtros, setFiltrosAction }: FiltroPontosProps) {
  /**
   * Alterna a seleção de um filtro de tipo de doação.
   * @param {string} tipo - O ID do tipo de doação a ser adicionado ou removido.
   */
  const toggleFiltro = (tipo: string) => {
    setFiltrosAction(
      filtros.includes(tipo)
        ? filtros.filter((f) => f !== tipo) // Remove o filtro se já estiver selecionado.
        : [...filtros, tipo] // Adiciona o filtro se não estiver selecionado.
    )
  }

  /**
   * Limpa todos os filtros e o termo de busca.
   */
  const limparFiltros = () => {
    setBuscaAction('')
    setFiltrosAction([])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Campo de busca por texto. */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou endereço..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBuscaAction(e.target.value)}
          />
        </div>
        
        {/* Popover que contém as opções de filtro por tipo de doação. */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
              {/* Exibe um badge com o número de filtros ativos. */}
              {filtros.length > 0 && (
                <Badge variant="secondary" className="px-1.5">
                  {filtros.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtrar por tipo de doação</h4>
                {filtros.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={limparFiltros} className="h-8 px-2 text-xs text-muted-foreground">
                    Limpar
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Mapeia os tipos de doação para criar checkboxes de filtro. */}
                {TIPOS_DOACAO.map((tipo) => (
                  <div key={tipo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={tipo.id}
                      checked={filtros.includes(tipo.id)}
                      onCheckedChange={() => toggleFiltro(tipo.id)}
                    />
                    <Label htmlFor={tipo.id} className="text-sm font-normal">
                      {tipo.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Exibe os filtros ativos como badges abaixo da barra de busca. */}
      {filtros.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filtros.map((filtro) => (
            <Badge key={filtro} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
              {TIPOS_DOACAO.find((t) => t.id === filtro)?.label || filtro}
              {/* Botão para remover um filtro individualmente. */}
              <button type="button" onClick={() => toggleFiltro(filtro)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Remover filtro</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
