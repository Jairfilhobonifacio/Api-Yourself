// Tipos genéricos para evitar o uso explícito de 'any'
type StringRecord = Record<string, string>;
type UnknownRecord = Record<string, unknown>;

declare module 'axios' {
  // Adicionando a definição do método create
  export function create(config?: AxiosRequestConfig): AxiosInstance;
  
  export interface AxiosRequestConfig<T = unknown> {
    _retry?: boolean;
    url?: string;
    method?: 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';
    baseURL?: string;
    headers?: StringRecord;
    params?: UnknownRecord;
    data?: T;
    timeout?: number;
    withCredentials?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  }

  export interface AxiosResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: StringRecord;
    config: AxiosRequestConfig<T>;
    request?: XMLHttpRequest;
  }

  export interface AxiosError<T = unknown> extends Error {
    config: AxiosRequestConfig<T>;
    code?: string;
    request?: XMLHttpRequest;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => UnknownRecord;
  }

  export interface AxiosInterceptorManager<V> {
    use(
      onFulfilled?: (value: V) => V | Promise<V>, 
      onRejected?: (error: AxiosError) => unknown
    ): number;
    eject(id: number): void;
  }

  export interface AxiosDefaults extends Omit<AxiosRequestConfig, 'headers'> {
    headers: StringRecord;
  }

  export interface AxiosInstance {
    <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    
    defaults: AxiosDefaults;
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse>;
    };
    
    getUri(config?: AxiosRequestConfig): string;
    request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
    get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    
    post<T = unknown, R = AxiosResponse<T>>(
      url: string, 
      data?: T, 
      config?: AxiosRequestConfig
    ): Promise<R>;
    
    put<T = unknown, R = AxiosResponse<T>>(
      url: string, 
      data?: T, 
      config?: AxiosRequestConfig
    ): Promise<R>;
    
    patch<T = unknown, R = AxiosResponse<T>>(
      url: string, 
      data?: T, 
      config?: AxiosRequestConfig
    ): Promise<R>;
  }
}
