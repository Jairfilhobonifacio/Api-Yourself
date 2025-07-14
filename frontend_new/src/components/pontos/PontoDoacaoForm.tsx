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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Ponto</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formValues.nome}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            errors.nome ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Centro de Doações Comunitário"
        />
        {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={formValues.endereco}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            errors.endereco ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Rua das Doações, 123"
        />
        {errors.endereco && <p className="mt-1 text-sm text-red-600">{errors.endereco}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={formValues.cidade}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            errors.cidade ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: São Paulo"
        />
        {errors.cidade && <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="horario" className="block text-sm font-medium text-gray-700">Horário de Funcionamento</label>
        <input
          type="text"
          id="horario"
          name="horario"
          value={formValues.horario || ''}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Ex: Segunda a Sexta, das 9h às 18h"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contato" className="block text-sm font-medium text-gray-700">Contato (Telefone/WhatsApp)</label>
        <input
          type="text"
          id="contato"
          name="contato"
          value={formValues.contato || ''}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Ex: (11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email || ''}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: contato@exemplo.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="site" className="block text-sm font-medium text-gray-700">Site (opcional)</label>
        <input
          type="url"
          id="site"
          name="site"
          value={formValues.site || ''}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
            errors.site ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: https://www.exemplo.com"
        />
        {errors.site && <p className="mt-1 text-sm text-red-600">{errors.site}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Tipos de Doação Aceitos</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tipoInput}
            onChange={(e) => setTipoInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarTipo())}
            className="flex-1 min-w-0 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Digite e pressione Enter"
          />
          <button 
            type="button" 
            onClick={adicionarTipo}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tipoDoacoes.map((tipo) => (
            <span key={tipo} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {tipo}
              <button 
                type="button" 
                onClick={() => removerTipo(tipo)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none focus:bg-primary-200 focus:text-primary-500"
                aria-label={`Remover ${tipo}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Itens Mais Necessitados (opcional)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={itemUrgenteInput}
            onChange={(e) => setItemUrgenteInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarItemUrgente())}
            className="flex-1 min-w-0 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Digite e pressione Enter"
          />
          <button 
            type="button" 
            onClick={adicionarItemUrgente}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {itensUrgentes.map((item) => (
            <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              {item}
              <button 
                type="button" 
                onClick={() => removerItemUrgente(item)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-amber-400 hover:bg-amber-200 hover:text-amber-500 focus:outline-none focus:bg-amber-200 focus:text-amber-500"
                aria-label={`Remover ${item}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button 
          type="button" 
          onClick={onCancelAction}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {pontoInicial ? 'Atualizar' : 'Cadastrar'} Ponto
        </button>
      </div>
    </form>
  );
}

export default PontoDoacaoForm;
