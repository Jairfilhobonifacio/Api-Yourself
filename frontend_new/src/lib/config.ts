// Arquivo de configurações da aplicação.

// Exporta um objeto de configuração que centraliza valores importantes utilizados em toda a aplicação.
export const config = {
  /**
   * URL base da API.
   * Utiliza a variável de ambiente NEXT_PUBLIC_API_URL se estiver definida.
   * Caso contrário, usa '/api' como padrão, que funciona com o proxy de desenvolvimento do Next.js.
   */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  /**
   * Tempo máximo de espera por uma requisição em milissegundos.
   * Se uma requisição demorar mais do que este tempo, ela será cancelada.
   */
  requestTimeout: 30000,
  
  /**
   * Cabeçalhos (headers) padrão que serão enviados em todas as requisições da API.
   * Isso garante consistência e evita a repetição de código.
   */
  headers: {
    'Content-Type': 'application/json', // Informa ao servidor que o corpo da requisição está em formato JSON.
    'Accept': 'application/json',       // Informa ao servidor que o cliente espera receber uma resposta em formato JSON.
  },
};
