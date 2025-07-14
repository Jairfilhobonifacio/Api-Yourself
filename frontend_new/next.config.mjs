/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      // Adicione outros domínios de imagem conforme necessário
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configuração de rewrites para redirecionar as requisições da API e rotas não-API
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log('Configurando proxy para a API:', apiUrl);
    
    return [
      // Para rotas da API
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      // Para rotas não-API
      {
        source: '/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
  // Configuração de CORS para permitir requisições da origem local
  async headers() {
    return [
      {
        // Aplica essas configurações para todas as rotas da API
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}

export default nextConfig
