# API de Doação Comunitária

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Uma plataforma moderna para conectar doadores a pontos de coleta, desenvolvida com Next.js 14 (App Router), TypeScript e Tailwind CSS no frontend, e Node.js/Express com PostgreSQL no backend.

<img width="1770" height="966" alt="image" src="https://github.com/user-attachments/assets/f13ddd93-a0d5-493a-a4d2-4f066ac95ab6" />



## Destaques

- **Aplicação Full-Stack** com Next.js 14 e App Router
- **Tipagem Forte** com TypeScript em todo o projeto
- **UI Moderna e Responsiva** com Tailwind CSS 
- **Mapa Interativo** com React Leaflet
- **Dashboard de Estatísticas** com Recharts
- **Tema Claro/Escuro** com suporte a preferência do sistema
- **API RESTful** documentada

## Tecnologias

### Frontend (Next.js 15)
- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **Estilização**: 
  - Tailwind CSS com suporte a temas
  - Tailwind CSS Animate para animações
  - Tailwind Merge para combinação de classes
- **UI/UX**:
  - Radix UI para componentes acessíveis
  - Lucide React para ícones
  - Sonner para notificações toast
- **Gerenciamento de Estado**:
  - React Hooks (useState, useEffect, useContext)
  - React Query para gerenciamento de dados assíncronos
- **Mapas**:
  - React Leaflet v5
  - Leaflet para renderização de mapas
- **Gráficos**:
  - Recharts para visualização de dados
- **Formulários**:
  - React Hook Form para validação
  - Zod para esquemas de validação
- **Temas**:
  - next-themes para suporte a tema claro/escuro

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: pg (PostgreSQL client for Node.js)
- **Segurança**:
  - CORS para requisições seguras
  - dotenv para gerenciamento de variáveis de ambiente
- **Desenvolvimento**:
  - Nodemon para reinicialização automática em desenvolvimento TypeScript

## Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou pnpm
- Git

## Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Jairfilhobonifacio/Api-Yourself.git
   cd Api-Yourself
   ```

2. **Configure o backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure as variáveis de ambiente no arquivo .env
   ```

3. **Configure o frontend**
   ```bash
   cd ../frontend_new
   npm install
   cp .env.example .env
   # Configure a URL da API no arquivo .env
   ```

4. **Inicie os servidores de desenvolvimento**
   ```bash
   # No diretório backend
   npm run dev
   
   # Em outro terminal, no diretório frontend_new
   npm run dev
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## Estrutura do Projeto

```
Api-Yourself/
├── backend/                 # Backend Node.js/Express
│   ├── src/
│   │   ├── config/        # Configurações do banco de dados
│   │   ├── controllers/   # Lógica dos controladores
│   │   ├── middlewares/   # Middlewares do Express
│   │   ├── models/        # Modelos do Prisma
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Lógica de negócios
│   │   ├── utils/         # Utilitários
│   │   └── app.ts         # Aplicação principal
│   └── prisma/           # Migrações e schema do Prisma
│
└── frontend_new/           # Frontend Next.js
    ├── public/            # Arquivos estáticos
    ├── src/
    │   ├── app/           # Rotas da aplicação (App Router)
    │   ├── components/    # Componentes reutilizáveis
    │   ├── context/       # Contextos do React
    │   ├── hooks/         # Custom hooks
    │   ├── lib/           # Configurações e utilitários
    │   ├── types/         # Tipos TypeScript
    │   └── styles/        # Estilos globais
    └── tailwind.config.ts # Configuração do Tailwind CSS
```

## Documentação da API

A documentação interativa da API está disponível em `/api-docs` quando o servidor estiver em execução.

### Principais Endpoints

- `GET /api/pontos` - Lista todos os pontos de doação
- `GET /api/pontos/estatisticas` - Estatísticas dos pontos de doação
- `GET /api/pontos/:id` - Busca um ponto específico
- `POST /api/pontos` - Cria um novo ponto de doação
- `PUT /api/pontos/:id` - Atualiza um ponto existente
- `DELETE /api/pontos/:id` - Remove um ponto de doação

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça o push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Jair Filho** - [GitHub](https://github.com/Jairfilhobonifacio) | [LinkedIn](#)

## Agradecimentos

- À comunidade de código aberto por todas as ferramentas incríveis
- Aos contribuidores que ajudaram no desenvolvimento
- A todos que acreditam no poder da solidariedade e da tecnologia para o bem

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/Jairfilhobonifacio">Jair Filho</a>
</div>
