/**
 * Hook personalizado para gerenciar notificações toast na aplicação.
 * 
 * @module use-custom-toast
 * @description 
 * Este hook fornece um sistema completo de notificações toast personalizáveis,
 * com suporte a diferentes estilos, posicionamentos e ações. Ele gerencia o estado
 * das notificações de forma eficiente, limitando o número de toasts exibidos
 * simultaneamente e fornecendo uma API simples para interação.
 * 
 * Principais recursos:
 * - Suporte a múltiplos toasts simultâneos (com limite configurável)
 * - Diferentes variantes de estilo (default, destructive)
 * - Posicionamento flexível na tela
 * - Ações personalizáveis
 * - Animações de entrada/saída
 * - API simples e intuitiva
 * 
 * @example
 * // Exemplo básico de uso
 * import { useToast } from './use-custom-toast';
 * 
 * function MeuComponente() {
 *   const { toast } = useToast();
 *   
 *   const handleClick = () => {
 *     toast({
 *       title: 'Sucesso!',
 *       description: 'Operação concluída com sucesso.',
 *       variant: 'default',
 *     });
 *   };
 *   
 *   return <button onClick={handleClick}>Mostrar Toast</button>;
 * }
 * 
 * @example
 * // Exemplo com ação personalizada
 * const { toast } = useToast();
 * 
 * toast({
 *   title: 'Arquivo enviado',
 *   description: 'O arquivo foi enviado com sucesso.',
 *   action: {
 *     label: 'Desfazer',
 *     onClick: () => console.log('Ação de desfazer acionada'),
 *   },
 * });
 * 
 * @example
 * // Exemplo com posicionamento personalizado
 * const { toast } = useToast();
 * 
 * toast({
 *   title: 'Notificação',
 *   description: 'Esta é uma notificação posicionada no topo esquerdo',
 *   position: 'top-left',
 * });
 */

import * as React from 'react'
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription } from './custom-toast'

/**
 * Configurações globais do sistema de toasts
 */

/**
 * Número máximo de toasts que podem ser exibidos simultaneamente.
 * @constant {number}
 */
const TOAST_LIMIT = 5;

/**
 * Tempo em milissegundos antes de remover um toast após ser dispensado.
 * Isso permite que as animações de saída sejam concluídas.
 * @constant {number}
 */
const TOAST_REMOVE_DELAY = 1000;

/**
 * Define a estrutura de uma ação que pode ser executada a partir de um toast.
 * 
 * @interface ToastAction
 * @property {string} label - Texto exibido no botão de ação
 * @property {() => void} onClick - Função chamada quando o botão de ação é clicado
 * 
 * @example
 * const action = {
 *   label: 'Desfazer',
 *   onClick: () => {
 *     console.log('Ação de desfazer acionada');
 *     // Lógica para desfazer a ação
 *   }
 * };
 */
interface ToastAction {
  label: string;
  onClick: () => void;
}

/**
 * Tipos de variantes de toast disponíveis.
 * 
 * @typedef {'default' | 'destructive'} ToastVariant
 * @property {string} default - Estilo padrão para mensagens informativas (fundo azul)
 * @property {string} destructive - Estilo para mensagens de erro ou alerta (fundo vermelho)
 * 
 * @example
 * // Exemplo de uso das variantes
 * const variant: ToastVariant = 'destructive'; // ou 'default'
 */
type ToastVariant = 'default' | 'destructive';

/**
 * Define a estrutura de um toast.
 * 
 * @interface ToasterToast
 * @property {string} id - Identificador único do toast (gerado automaticamente se não fornecido)
 * @property {React.ReactNode} [title] - Título opcional do toast (pode ser string ou ReactNode)
 * @property {React.ReactNode} [description] - Descrição opcional do toast (pode ser string ou ReactNode)
 * @property {ToastVariant} [variant='default'] - Variante de estilo do toast
 * @property {ToastAction} [action] - Ação opcional que pode ser executada a partir do toast
 * @property {() => void} [onDismiss] - Callback chamado quando o toast é fechado
 * @property {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} [position='bottom-right'] - Posição na tela onde o toast será exibido
 * @property {boolean} [open=true] - Define se o toast está aberto (usado para animações)
 * 
 * @example
 * // Exemplo de criação de um toast
 * const meuToast: ToasterToast = {
 *   id: 'toast-1',
 *   title: 'Sucesso!',
 *   description: 'Operação concluída com sucesso.',
 *   variant: 'default',
 *   position: 'top-right',
 *   onDismiss: () => console.log('Toast fechado'),
 *   action: {
 *     label: 'Desfazer',
 *     onClick: () => console.log('Ação de desfazer')
 *   }
 * };
 */
interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  action?: ToastAction;
  onDismiss?: () => void;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  open?: boolean;
}

/**
 * Tipos de ações que podem ser despachadas para o reducer.
 * Cada ação modifica o estado dos toasts de alguma forma.
 * 
 * @typedef {Object} ActionType
 * @property {'ADD_TOAST'} ADD_TOAST - Adiciona um novo toast ao estado
 * @property {'UPDATE_TOAST'} UPDATE_TOAST - Atualiza um toast existente
 * @property {'DISMISS_TOAST'} DISMISS_TOAST - Marca um toast para ser removido (com animação)
 * @property {'REMOVE_TOAST'} REMOVE_TOAST - Remove completamente um toast do estado
 * 
 * @example
 * // Exemplo de ação para adicionar um toast
 * const addAction = {
 *   type: 'ADD_TOAST',
 *   toast: { id: '1', title: 'Novo toast' }
 * };
 */
type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  UPDATE_TOAST: 'UPDATE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
};

/**
 * Contador global para gerar IDs únicos para cada toast.
 * @private
 */
let count = 0;

/**
 * Gera um ID único para um novo toast.
 * O ID é baseado em um contador global que incrementa a cada chamada.
 * 
 * @function
 * @returns {string} Uma string única no formato 'toast-N' onde N é um número sequencial
 * 
 * @example
 * const id1 = genId(); // Retorna algo como 'toast-1'
 * const id2 = genId(); // Retorna algo como 'toast-2'
 */
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return `toast-${count}`;
}


/**
 * Tipos de ações que podem ser despachadas para o reducer.
 * Cada ação modifica o estado dos toasts de alguma forma.
 * 
 * @typedef {Object} Action
 * @property {ActionType['ADD_TOAST']} type - Tipo da ação
 * @property {ToasterToast} toast - O toast a ser adicionado
 * 
 * @typedef {Object} UpdateToastAction
 * @property {ActionType['UPDATE_TOAST']} type - Tipo da ação
 * @property {Partial<ToasterToast> & { id: string }} toast - As atualizações a serem aplicadas ao toast
 * 
 * @typedef {Object} DismissToastAction
 * @property {ActionType['DISMISS_TOAST']} type - Tipo da ação
 * @property {string} [toastId] - ID do toast a ser removido (opcional, remove todos se não especificado)
 * 
 * @typedef {Object} RemoveToastAction
 * @property {ActionType['REMOVE_TOAST']} type - Tipo da ação
 * @property {string} [toastId] - ID do toast a ser removido (opcional, remove todos se não especificado)
 * 
 * @type {Action | UpdateToastAction | DismissToastAction | RemoveToastAction}
 * 
 * @example
 * // Exemplo de ação para adicionar um toast
 * const addAction = {
 *   type: 'ADD_TOAST',
 *   toast: { id: '1', title: 'Novo toast' }
 * };
 * 
 * // Exemplo de ação para atualizar um toast
 * const updateAction = {
 *   type: 'UPDATE_TOAST',
 *   toast: { id: '1', title: 'Título atualizado' }
 * };
 * 
 * // Exemplo de ação para remover um toast com animação
 * const dismissAction = {
 *   type: 'DISMISS_TOAST',
 *   toastId: '1'
 * };
 * 
 * // Exemplo de ação para remover um toast imediatamente
 * const removeAction = {
 *   type: 'REMOVE_TOAST',
 *   toastId: '1'
 * };
 */
type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast> & { id: string };
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

/**
 * Interface que representa o estado global dos toasts.
 * 
 * @interface State
 * @property {ToasterToast[]} toasts - Lista de todos os toasts ativos no momento
 * 
 * @example
 * const state: State = {
 *   toasts: [
 *     { id: '1', title: 'Notificação', description: 'Mensagem de exemplo' },
 *     { id: '2', title: 'Erro', description: 'Algo deu errado', variant: 'destructive' }
 *   ]
 * };
 */
interface State {
  toasts: ToasterToast[];
}

/**
 * Mapa que armazena os timeouts para remoção automática de toasts.
 * As chaves são os IDs dos toasts e os valores são os identificadores dos timeouts.
 * 
 * @type {Map<string, ReturnType<typeof setTimeout>>}
 * @private
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adiciona um toast à fila de remoção.
 * Esta função agenda a remoção do toast após um atraso definido por `TOAST_REMOVE_DELAY`.
 * 
 * @function addToRemoveQueue
 * @param {string} toastId - ID do toast a ser removido
 * 
 * @example
 * // Agenda a remoção do toast com ID 'toast-123' após o delay padrão
 * addToRemoveQueue('toast-123');
 */
const addToRemoveQueue = (toastId: string): void => {
  // Se já houver um timeout para este toast, não faz nada
  if (toastTimeouts.has(toastId)) {
    return;
  }

  // Cria um timeout para remover o toast após o tempo definido
  const timeout = setTimeout(() => {
    // Remove o timeout do mapa
    toastTimeouts.delete(toastId);
    // Despacha a ação para remover o toast
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  // Armazena o timeout no mapa para possível cancelamento
  toastTimeouts.set(toastId, timeout);
};

/**
 * Reducer que gerencia o estado dos toasts com base nas ações despachadas.
 * 
 * @function reducer
 * @param {State} state - Estado atual dos toasts
 * @param {Action} action - Ação a ser processada
 * @returns {State} Novo estado após processar a ação
 * 
 * @example
 * // Estado inicial
 * const initialState = { toasts: [] };
 * 
 * // Ação para adicionar um toast
 * const action = {
 *   type: 'ADD_TOAST',
 *   toast: { id: '1', title: 'Novo toast' }
 * };
 * 
 * // Aplicando o reducer
 * const newState = reducer(initialState, action);
 * // Retorna: { toasts: [{ id: '1', title: 'Novo toast' }] }
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Adiciona um novo toast ao início da lista
    // Mantém apenas o número máximo de toasts definido em TOAST_LIMIT
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    // Atualiza um toast existente com base no ID
    // Mantém as propriedades existentes e sobrescreve com as novas
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    // Marca um ou todos os toasts para serem removidos
    // Adiciona um atraso antes da remoção para permitir animações
    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // Se um ID específico foi fornecido, adiciona apenas ele à fila de remoção
      // Caso contrário, adiciona todos os toasts à fila
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Atualiza o estado para marcar o(s) toast(s) como fechado(s)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Marca como fechado para permitir animação de saída
              }
            : t
        ),
      };
    }
    
    // Remove completamente um ou todos os toasts do estado
    case 'REMOVE_TOAST':
      // Se nenhum ID foi fornecido, remove todos os toasts
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      // Remove apenas o toast com o ID especificado
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    // Por padrão, retorna o estado inalterado
    default:
      return state;
  }
};

/**
 * Lista de listeners que serão notificados quando o estado mudar.
 * 
 * @type {Array<(state: State) => void>}
 * @private
 */
const listeners: Array<(state: State) => void> = [];

/**
 * Estado global na memória.
 * 
 * @type {State}
 * @private
 */
let memoryState: State = { toasts: [] };

/**
 * Função para despachar ações para o reducer.
 * 
 * @function dispatch
 * @param {Action} action - Ação a ser processada
 * @private
 * 
 * @example
 * // Despachando uma ação para adicionar um toast
 * dispatch({
 *   type: 'ADD_TOAST',
 *   toast: { id: '1', title: 'Novo toast' }
 * });
 */
function dispatch(action: Action): void {
  // Atualiza o estado na memória
  memoryState = reducer(memoryState, action);
  
  // Notifica todos os listeners sobre a mudança de estado
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Tipo que representa um novo toast (sem o ID, que será gerado automaticamente)
 * @typedef {Omit<ToasterToast, 'id'>} Toast
 */
type Toast = Omit<ToasterToast, 'id'>

/**
 * Função para exibir um novo toast
 * @param {Toast} props - Propriedades do toast
 * @returns {Object} Métodos para controlar o toast
 */
function toast({ ...props }: Toast) {
  // Gera um ID único para o novo toast
  const id = genId()

  // Função para dispensar o toast
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  // Despacha a ação para adicionar o toast
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id, // Adiciona o ID gerado ao toast
    },
  })

  // Retorna métodos para controlar o toast
  return {
    id: id,
    dismiss, // Método para dispensar o toast
    // Método para atualizar as propriedades do toast
    update: (props: ToasterToast) =>
      dispatch({
        type: 'UPDATE_TOAST',
        toast: { ...props, id },
      }),
  }
}

/**
 * Hook para acessar e controlar os toasts
 * @returns {Object} Estado atual e métodos para controlar os toasts
 */
function useToast() {
  // Estado local que será atualizado sempre que o estado global mudar
  const [state, setState] = React.useState<State>(memoryState)

  // Efeito para se inscrever nas atualizações de estado
  React.useEffect(() => {
    // Adiciona setState à lista de listeners
    listeners.push(setState);
    
    // Função de limpeza que remove o listener quando o componente é desmontado
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []) // Removido state das dependências para evitar loop infinito

  // Retorna o estado atual e métodos úteis
  return {
    ...state, // Espalha o estado atual (toasts)
    toast,    // Função para adicionar um novo toast
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }), // Função para dispensar um toast específico ou todos
  }
}

/**
 * Componente que renderiza todos os toasts ativos
 * Gerencia a exibição e posicionamento dos toasts na tela
 */

/**
 * Tipo que define as posições possíveis para exibição dos toasts na tela
 * @typedef {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} ToastPosition
 */
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/**
 * Componente que renderiza todos os toasts ativos
 * @param {Object} props - Propriedades do componente
 * @param {ToastPosition} [props.position='bottom-right'] - Posição dos toasts na tela
 * @returns {JSX.Element} Elemento React que renderiza os toasts
 */
export function Toaster({ position = 'bottom-right' }: { position?: ToastPosition } = {}) {
  // Obtém a lista de toasts ativos
  const { toasts } = useToast()

  // Usa React.createElement em vez de JSX para evitar problemas de importação
  return React.createElement(React.Fragment, null,
    // Provider que envolve todos os toasts
    React.createElement(ToastProvider, null,
      // Mapeia cada toast para um componente Toast
      toasts.map((toast) =>
        React.createElement(
          Toast,
          {
            key: toast.id,
            variant: toast.variant || 'default',
            position: position,
            duration: 5000, // 5 segundos de duração
            showCloseButton: true, // Mostrar botão de fechar por padrão
            // Função chamada quando o toast é fechado
            onDismiss: () => {
              // Chama o callback onDismiss se existir
              if (toast.onDismiss) toast.onDismiss()
              // Despacha a ação para remover o toast
              dispatch({ type: 'DISMISS_TOAST', toastId: toast.id })
            }
          },
          // Conteúdo do toast
          React.createElement(
            'div',
            { className: 'flex flex-col gap-1' },
            // Título do toast (opcional)
            toast.title && React.createElement(ToastTitle, null, toast.title),
            // Descrição do toast (opcional)
            toast.description && React.createElement(ToastDescription, null, toast.description),
            // Ação do toast (opcional)
            toast.action &&
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: (e: React.MouseEvent) => {
                    e.stopPropagation() // Evita que o evento de clique se propague
                    // Executa a ação definida
                    if (toast.action) toast.action.onClick()
                    // Fecha o toast após clicar na ação
                    dispatch({ type: 'DISMISS_TOAST', toastId: toast.id })
                  },
                  className: 'mt-2 self-start text-sm font-medium text-blue-600 hover:text-blue-800'
                },
                toast.action?.label
              )
          )
        )
      ),
      // Viewport que define a área onde os toasts serão renderizados
      React.createElement(ToastViewport, { position })
    )
  )
}

// Exporta as funções principais para uso em outros componentes
export { toast, useToast }
