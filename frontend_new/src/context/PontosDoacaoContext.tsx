// Diretiva que marca este componente como um Componente de Cliente no Next.js.
// Isso é necessário porque ele usa hooks do React (createContext, useContext).
'use client';

// Importa as dependências necessárias do React.
import React, { createContext, useContext, ReactNode } from 'react';
// Importa os tipos de dados da API para garantir a consistência dos dados.
import { PontoDoacao, CriarPontoData, AtualizarPontoData } from '@/types/api';
// Importa o hook usePontos, que contém a lógica de negócio para interagir com a API de pontos de doação.
import { usePontos } from '@/hooks/usePontos';

// Define a interface para o tipo de valor que o contexto de pontos de doação irá fornecer.
interface PontosDoacaoContextType {
  pontos: PontoDoacao[]; // Array de pontos de doação.
  loading: boolean; // Estado de carregamento para operações assíncronas.
  error: Error | null; // Armazena erros que possam ocorrer durante as operações.
  carregarPontos: () => Promise<PontoDoacao[]>; // Função para carregar todos os pontos de doação.
  criarPonto: (ponto: CriarPontoData) => Promise<PontoDoacao>; // Função para criar um novo ponto de doação.
  atualizarPonto: (id: number, dados: AtualizarPontoData) => Promise<PontoDoacao>; // Função para atualizar um ponto existente.
  removerPonto: (id: number) => Promise<void>; // Função para remover um ponto de doação.
  buscarPorCidade: (cidade: string) => Promise<PontoDoacao[]>; // Função para buscar pontos de doação por cidade.
  obterEstatisticas: () => Promise<{ // Função para obter estatísticas sobre os pontos de doação.
    totalPontos: number;
    totalCidades: number;
    tiposMaisComuns: [string, number][];
    itensMaisUrgentes: [string, number][];
    cidades: string[];
  }>;
  listarNecessidades: () => Promise<Array<{ item: string; total: number }>>; // Função para listar as necessidades de doação.
}

// Cria o contexto do React com um valor inicial indefinido.
// Este contexto irá fornecer os dados e funções relacionados aos pontos de doação para os componentes filhos.
export const PontosDoacaoContext = createContext<PontosDoacaoContextType | undefined>(undefined);

/**
 * PontosDoacaoProvider é um componente que atua como provedor do contexto de pontos de doação.
 * Ele utiliza o hook usePontos para obter os dados e a lógica, e os disponibiliza para a árvore de componentes abaixo dele.
 * @param {object} props - As propriedades do componente.
 * @param {ReactNode} props.children - Os componentes filhos que terão acesso ao contexto.
 * @returns {JSX.Element} O provedor de contexto envolvendo os componentes filhos.
 */
export const PontosDoacaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Utiliza o hook usePontos para obter o estado e as funções de manipulação dos pontos de doação.
  const {
    pontos,
    loading,
    error,
    carregarPontos,
    criarPonto,
    atualizarPonto,
    removerPonto,
    buscarPorCidade,
    obterEstatisticas,
    listarNecessidades,
  } = usePontos();

  // Retorna o componente Provider do contexto, passando o valor (dados e funções) para os componentes filhos.
  return (
    <PontosDoacaoContext.Provider
      value={{
        pontos,
        loading,
        error,
        criarPonto,
        atualizarPonto,
        removerPonto,
        carregarPontos,
        buscarPorCidade,
        obterEstatisticas,
        listarNecessidades,
      }}
    >
      {children}
    </PontosDoacaoContext.Provider>
  );
};

/**
 * usePontosDoacao é um hook customizado que simplifica o uso do PontosDoacaoContext.
 * Ele garante que o contexto seja consumido apenas dentro de um PontosDoacaoProvider.
 * @returns {PontosDoacaoContextType} O valor do contexto, contendo o estado e as funções.
 * @throws {Error} Lança um erro se o hook for usado fora do PontosDoacaoProvider.
 */
export const usePontosDoacao = (): PontosDoacaoContextType => {
  // Acessa o valor do contexto usando o hook useContext.
  const context = useContext(PontosDoacaoContext);
  // Verifica se o contexto está indefinido, o que significa que o hook foi usado fora do provedor.
  if (context === undefined) {
    throw new Error('usePontosDoacao deve ser usado dentro de um PontosDoacaoProvider');
  }
  // Retorna o valor do contexto.
  return context;
};
