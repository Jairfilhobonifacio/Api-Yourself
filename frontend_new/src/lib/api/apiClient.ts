// Importa o axios e o tipo AxiosError para lidar com requisições HTTP e seus erros.
import axios, { type AxiosError } from 'axios';
// Importa as configurações da aplicação, como timeout e headers padrão.
import { config } from '@/lib/config';

// Define a interface para o formato de erro esperado da API.
// Isso ajuda a padronizar o tratamento de erros vindos do backend.
interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
  [key: string]: unknown; // Permite outras propriedades no objeto de erro.
}

// Define uma interface para o tipo de erro personalizado que será lançado pelos interceptors.
// Estende a classe Error padrão com informações de status e dados da resposta.
interface CustomError extends Error {
  status?: number;
  data?: unknown;
}

/**
 * Determina a URL base da API com base no ambiente (desenvolvimento ou produção).
 * @returns {string} A URL base para as requisições da API.
 */
const getApiBaseUrl = (): string => {
  // Em ambiente de desenvolvimento, retorna uma string vazia para usar o proxy configurado no next.config.mjs.
  // Isso evita problemas com CORS durante o desenvolvimento local.
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  // Em produção, utiliza a URL definida na variável de ambiente ou assume o mesmo domínio da aplicação frontend.
  return process.env.NEXT_PUBLIC_API_URL || '';
};

// Cria uma instância do Axios com configurações base para todas as requisições.
const apiClient = axios.create({
  baseURL: getApiBaseUrl(), // Define a URL base para todas as chamadas.
  timeout: config.requestTimeout, // Define um tempo limite para as requisições.
  headers: config.headers, // Define cabeçalhos padrão.
  withCredentials: false, // Desativa o envio automático de cookies, comum em APIs stateless.
});

// Adiciona um interceptor que é executado antes de cada requisição ser enviada.
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] Fazendo requisição para: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Adiciona um timestamp como parâmetro de query para evitar que o navegador use respostas em cache.
    if (config.params) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    } else {
      config.params = { _t: Date.now() };
    }

    // Adiciona cabeçalhos para desativar o cache de forma explícita.
    config.headers = {
      ...config.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    };

    return config; // Retorna a configuração modificada para que a requisição prossiga.
  },
  (error: AxiosError) => {
    // Se ocorrer um erro na configuração da requisição, ele é logado e a promessa é rejeitada.
    console.error('Erro na configuração da requisição:', error);
    return Promise.reject(error);
  }
);

// Adiciona um interceptor que é executado após cada resposta ser recebida.
apiClient.interceptors.response.use(
  (response) => {
    // Loga informações da resposta para fins de depuração.
    console.log('[API] Resposta recebida:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response; // Retorna a resposta para que o código que fez a chamada possa processá-la.
  },
  (error: unknown) => {
    // Em ambiente de desenvolvimento, loga informações detalhadas do erro para facilitar a depuração.
    if (process.env.NODE_ENV === 'development') {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ERR_NETWORK') {
          console.error('[API] Erro de conexão. Verifique sua conexão com a internet.');
        }
        
        const errorInfo = {
          message: 'Erro na requisição',
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          request: axiosError.request ? 'Request feito, mas sem resposta' : 'Erro ao fazer a requisição',
        };

        console.error('[API] Erro na requisição:', errorInfo);
      } else {
        console.error('[API] Erro desconhecido:', error);
      }
    }

    // Padroniza a mensagem de erro para ser exibida ao usuário ou tratada pela aplicação.
    let errorMessage = 'Ocorreu um erro inesperado';
    let statusCode = 500;
    let errorData: unknown = undefined;

    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as ApiErrorResponse | undefined;
      
      errorMessage = responseData?.message || axiosError.message || errorMessage;
      statusCode = axiosError.response?.status || statusCode;
      errorData = responseData || axiosError.response?.data;
      
      // Personaliza mensagens de erro para códigos de status HTTP comuns.
      if (statusCode === 401) {
        errorMessage = 'Não autorizado. Por favor, faça login novamente.';
      } else if (statusCode === 403) {
        errorMessage = 'Você não tem permissão para acessar este recurso.';
      } else if (statusCode === 404) {
        errorMessage = 'Recurso não encontrado.';
      } else if (statusCode >= 500) {
        errorMessage = 'Erro no servidor. Por favor, tente novamente mais tarde.';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Cria um erro personalizado com a mensagem padronizada e os dados adicionais.
    const customError = new Error(errorMessage) as CustomError;
    customError.status = statusCode;
    customError.data = errorData;
    
    // Rejeita a promessa com o erro personalizado, para que ele possa ser capturado por um bloco .catch().
    return Promise.reject(customError);
  }
);

export default apiClient;
