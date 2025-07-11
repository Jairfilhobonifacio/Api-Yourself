'use client';

import { useState } from 'react';
// Validação simples sem Zod para evitar dependências adicionais
interface PontoFormValues {
  nome: string;
  endereco: string;
  cidade: string;
  horario?: string;
  contato?: string;
  email?: string;
  site?: string;
  tipoDoacoes: string[];
  itensUrgentes: string[];
  latitude?: number;
  longitude?: number;
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removendo importações não utilizadas
import { PontoDoacao, CriarPontoData, AtualizarPontoData } from '@/types/api';

// Validação simples sem Zod
const validateForm = (values: PontoFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!values.nome || values.nome.length < 3) {
    errors.nome = 'O nome deve ter pelo menos 3 caracteres';
  }
  
  if (!values.endereco || values.endereco.length < 5) {
    errors.endereco = 'O endereço é obrigatório';
  }
  
  if (!values.cidade || values.cidade.length < 3) {
    errors.cidade = 'A cidade é obrigatória';
  }
  
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'E-mail inválido';
  }
  
  if (values.site && values.site !== '' && !/^https?:\/\//.test(values.site)) {
    errors.site = 'URL inválida. Deve começar com http:// ou https://';
  }
  
  return errors;
};

interface PontoDoacaoFormProps {
  pontoInicial?: PontoDoacao;
  onSubmitAction: (data: CriarPontoData | AtualizarPontoData) => Promise<void>;
  onCancelAction: () => void;
}

export function PontoDoacaoForm({ 
  pontoInicial, 
  onSubmitAction, 
  onCancelAction 
}: PontoDoacaoFormProps) {
  const [tipoInput, setTipoInput] = useState('');
  const [itemUrgenteInput, setItemUrgenteInput] = useState('');
  
  const [formValues, setFormValues] = useState<PontoFormValues>({
    nome: pontoInicial?.nome || '',
    endereco: pontoInicial?.endereco || '',
    cidade: pontoInicial?.cidade || '',
    horario: pontoInicial?.horario || '',
    contato: pontoInicial?.contato || '',
    email: pontoInicial?.email || '',
    site: pontoInicial?.site || '',
    tipoDoacoes: pontoInicial?.tipoDoacoes || [],
    itensUrgentes: pontoInicial?.itensUrgentes || [],
    latitude: pontoInicial?.latitude,
    longitude: pontoInicial?.longitude,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value === '' ? undefined : Number(value)
    }));
  };

  const { tipoDoacoes, itensUrgentes } = formValues;

  const adicionarTipo = () => {
    if (tipoInput.trim() && !formValues.tipoDoacoes.includes(tipoInput.trim())) {
      setFormValues(prev => ({
        ...prev,
        tipoDoacoes: [...prev.tipoDoacoes, tipoInput.trim()]
      }));
      setTipoInput('');
    }
  };

  const removerTipo = (tipo: string) => {
    setFormValues(prev => ({
      ...prev,
      tipoDoacoes: prev.tipoDoacoes.filter(t => t !== tipo)
    }));
  };

  const adicionarItemUrgente = () => {
    if (itemUrgenteInput.trim() && !formValues.itensUrgentes.includes(itemUrgenteInput.trim())) {
      setFormValues(prev => ({
        ...prev,
        itensUrgentes: [...prev.itensUrgentes, itemUrgenteInput.trim()]
      }));
      setItemUrgenteInput('');
    }
  };

  const removerItemUrgente = (item: string) => {
    setFormValues(prev => ({
      ...prev,
      itensUrgentes: prev.itensUrgentes.filter(i => i !== item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm(formValues);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      // Se for uma atualização, inclua o ID
      const submitData = pontoInicial?.id 
        ? { ...formValues, id: pontoInicial.id } 
        : formValues;
      
      onSubmitAction(submitData as CriarPontoData | AtualizarPontoData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Local *</Label>
          <Input
            id="nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            placeholder="Ex: Centro Comunitário da Vila"
            className={errors.nome ? 'border-red-500' : ''}
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endereco">Endereço *</Label>
          <Input
            id="endereco"
            name="endereco"
            value={formValues.endereco}
            onChange={handleChange}
            placeholder="Ex: Rua das Flores, 123"
            className={errors.endereco ? 'border-red-500' : ''}
          />
          {errors.endereco && (
            <p className="text-sm text-red-500">{errors.endereco}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            name="cidade"
            value={formValues.cidade}
            onChange={handleChange}
            placeholder="Ex: São Paulo"
            className={errors.cidade ? 'border-red-500' : ''}
          />
          {errors.cidade && (
            <p className="text-sm text-red-500">{errors.cidade}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="horario">Horário de Funcionamento</Label>
          <Input
            id="horario"
            name="horario"
            value={formValues.horario}
            onChange={handleChange}
            placeholder="Ex: Seg a Sex, das 9h às 18h"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contato">Contato</Label>
          <Input
            id="contato"
            name="contato"
            value={formValues.contato}
            onChange={handleChange}
            placeholder="Ex: (11) 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Ex: contato@exemplo.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="site">Site</Label>
          <Input
            id="site"
            name="site"
            value={formValues.site}
            onChange={handleChange}
            placeholder="Ex: https://exemplo.com"
            className={errors.site ? 'border-red-500' : ''}
          />
          {errors.site && (
            <p className="text-sm text-red-500">{errors.site}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Localização (opcional)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                name="latitude"
                step="any"
                value={formValues.latitude || ''}
                onChange={handleNumberChange}
                placeholder="Latitude"
              />
            </div>
            <div>
              <Input
                type="number"
                name="longitude"
                step="any"
                value={formValues.longitude || ''}
                onChange={handleNumberChange}
                placeholder="Longitude"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Preencha apenas se souber as coordenadas exatas
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tipos de Doação Aceitos</Label>
          <div className="flex gap-2">
            <Input
              value={tipoInput}
              onChange={(e) => setTipoInput(e.target.value)}
              placeholder="Ex: Roupas, Alimentos, Brinquedos"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarTipo())}
            />
            <Button type="button" onClick={adicionarTipo}>
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tipoDoacoes.map((tipo, index) => (
              <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {tipo}
                <button
                  type="button"
                  onClick={() => removerTipo(tipo)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Itens Urgentes</Label>
          <div className="flex gap-2">
            <Input
              value={itemUrgenteInput}
              onChange={(e) => setItemUrgenteInput(e.target.value)}
              placeholder="Ex: Leite em pó, Fraldas G"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarItemUrgente())}
            />
            <Button type="button" onClick={adicionarItemUrgente}>
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {itensUrgentes.map((item, index) => (
              <div key={index} className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {item}
                <button
                  type="button"
                  onClick={() => removerItemUrgente(item)}
                  className="text-destructive/70 hover:text-destructive"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancelAction}>
          Cancelar
        </Button>
        <Button type="submit">
          {pontoInicial?.id ? 'Atualizar Ponto' : 'Adicionar Ponto'}
        </Button>
      </div>
    </form>
  );
}

export default PontoDoacaoForm;
