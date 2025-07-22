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
  
  const { itensUrgentes } = formValues;

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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/50 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {pontoInicial ? 'Editar Ponto de Doação' : 'Novo Ponto de Doação'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {pontoInicial 
            ? 'Atualize as informações do ponto de doação' 
            : 'Preencha os dados para cadastrar um novo ponto de doação'}
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome do Ponto <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            className={`block w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700/30 border ${
              errors.nome 
                ? 'border-red-300 focus:ring-1 focus:ring-red-200 dark:border-red-500/70' 
                : 'border-gray-200 dark:border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 dark:focus:border-blue-400/80 dark:focus:ring-blue-500/20'
            } transition-colors duration-150`}
            placeholder="Ex: Centro de Doações Comunitário"
          />
          {errors.nome && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.nome && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.nome}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Endereço <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formValues.endereco}
            onChange={handleChange}
            className={`block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border ${
              errors.endereco 
                ? 'border-red-400 focus:ring-red-300 dark:border-red-500' 
                : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 dark:focus:border-blue-400'
            } focus:ring-2 focus:ring-opacity-20 transition-all duration-200 shadow-sm`}
            placeholder="Ex: Rua das Doações, 123"
          />
          {errors.endereco && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.endereco && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.endereco}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cidade <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formValues.cidade}
              onChange={handleChange}
              className={`block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border ${
                errors.cidade 
                  ? 'border-red-400 focus:ring-red-300 dark:border-red-500' 
                  : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 dark:focus:border-blue-400'
              } focus:ring-2 focus:ring-opacity-20 transition-all duration-200 shadow-sm`}
              placeholder="Ex: São Paulo"
            />
            {errors.cidade && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.cidade && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.cidade}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contato" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contato (Telefone/WhatsApp)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="text"
              id="contato"
              name="contato"
              value={formValues.contato || ''}
              onChange={handleChange}
              className="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-20 dark:focus:border-blue-400 transition-all duration-200 shadow-sm"
              placeholder="Ex: (11) 99999-9999"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="horario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Horário de Funcionamento
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="horario"
              name="horario"
              value={formValues.horario || ''}
              onChange={handleChange}
              className="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-20 dark:focus:border-blue-400 transition-all duration-200 shadow-sm"
              placeholder="Ex: Segunda a Sexta, 9h-18h"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email || ''}
              onChange={handleChange}
              className={`block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-300 dark:border-red-500' 
                  : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 dark:focus:border-blue-400'
              } focus:ring-2 focus:ring-opacity-20 transition-all duration-200 shadow-sm`}
              placeholder="Ex: contato@exemplo.com"
            />
            {errors.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="site" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Site (opcional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <input
            type="url"
            id="site"
            name="site"
            value={formValues.site || ''}
            onChange={handleChange}
            className={`block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border ${
              errors.site 
                ? 'border-red-400 focus:ring-red-300 dark:border-red-500' 
                : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 dark:focus:border-blue-400'
            } focus:ring-2 focus:ring-opacity-20 transition-all duration-200 shadow-sm`}
            placeholder="Ex: https://www.exemplo.com"
          />
          {errors.site && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.site && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.site}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Itens Mais Necessitados (opcional)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <input
              type="text"
              value={itemUrgenteInput}
              onChange={(e) => setItemUrgenteInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarItemUrgente())}
              className="block w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-100 dark:focus:border-amber-400/80 dark:focus:ring-amber-500/20 transition-colors duration-150"
              placeholder="Digite e pressione Enter"
            />
          </div>
          <button 
            type="button" 
            onClick={adicionarItemUrgente}
            className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:ring-offset-1 transition-colors duration-150 rounded-lg"
          >
            <span className="hidden sm:inline">Adicionar</span>
            <svg className="h-5 w-5 sm:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {itensUrgentes.map((item) => (
            <span key={item} className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200 border border-amber-100 dark:border-amber-800/40">
              {item}
              <button 
                type="button" 
                onClick={() => removerItemUrgente(item)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-amber-500 hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400 focus:outline-none transition-colors duration-150"
                aria-label={`Remover ${item}`}
              >
                <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
        <button 
          type="button" 
          onClick={onCancelAction}
          className="inline-flex justify-center items-center px-4 py-2.5 sm:px-5 text-base font-medium text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-150 border border-blue-200 dark:border-blue-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600"
          aria-label="Cancelar e voltar"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancelar</span>
        </button>
        <button 
          type="submit" 
          className="inline-flex justify-center items-center px-4 py-2.5 sm:px-5 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 rounded-lg shadow-sm"
          aria-label={pontoInicial ? 'Atualizar ponto de doação' : 'Cadastrar novo ponto de doação'}
        >
          <svg className="h-5 w-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{pontoInicial ? 'Atualizar Ponto' : 'Cadastrar Ponto'}</span>
        </button>
      </div>
    </form>
  );
}

export default PontoDoacaoForm;
