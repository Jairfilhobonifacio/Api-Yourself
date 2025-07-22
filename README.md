<div align="center">
  <h1 class="flex items-center justify-center space-x-2">
    <span class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Api</span>
    <span class="text-4xl font-bold text-pink-500">❤️</span>
    <span class="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Yourself</span>
  </h1>
  <p class="mt-2 text-lg text-gray-600">Plataforma para conectar doadores a pontos de coleta em sua comunidade</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ![GitHub last commit](https://img.shields.io/github/last-commit/jairfilhobonifacio/Api-Yourself)
</div>

## 📋 Visão Geral

A API de Doação Comunitária é uma plataforma que conecta doadores a pontos de coleta em suas comunidades. O objetivo é facilitar a doação de itens essenciais, tornando o processo mais acessível e transparente.

### 🎯 Objetivos

- Conectar doadores a pontos de coleta próximos
- Fornecer informações claras sobre itens necessários
- Promover a solidariedade e ajuda mútua nas comunidades
- Oferecer uma plataforma intuitiva e fácil de usar

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - Next.js 14.1.0
  - React 18.2.0
  - TypeScript 5.0.0
  - Tailwind CSS 3.3.0
  - Lucide Icons 0.284.0
  - Axios 1.6.0
  - React Hook Form 7.49.0
  - Zod 3.22.4

- **Ferramentas de Desenvolvimento:**
  - Node.js 18.0.0+
  - npm 9.0.0+ ou Yarn 1.22.0+
  - Git 2.25.0+

## 📦 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou Yarn
- Git

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/jairfilhobonifacio/Api-Yourself.git
   cd Api-Yourself/frontend_new
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📚 Documentação da API

A API utilizada neste projeto está disponível em:
[Repositório da API](https://github.com/jairfilhobonifacio/Api-Yourself)

### Principais Endpoints

- `GET /api/pontos` - Lista todos os pontos de doação
- `GET /api/pontos/cidade/:cidade` - Busca pontos por cidade
- `GET /api/estatisticas` - Obtém estatísticas de doações

## 🖼️ Screenshots

<div align="center">
  <<img width="1770" height="966" alt="image" src="https://github.com/user-attachments/assets/33db29ff-8fae-48b7-a072-f3a825a500e7" />>
  <<<img width="1779" height="948" alt="Api yourself tema branco" src="https://github.com/user-attachments/assets/6a2d47f8-c90d-4977-be6d-d8c748ef7a10" />
 width="1611" height="937" alt="image" src="https://github.com/user-attachments/assets/c7d2a225-2be9-4e1d-8e6e-19bf5f249406" />
 alt="Modo Escuro" width="45%">
  <img src="/public/screenshots/mobile.png" alt="Versão Mobile" width="30%">
</div>

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas alterações (`git add .`)
4. Comite suas alterações (`git commit -m 'Add some AmazingFeature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  Desenvolvido com ❤️ por <a href="https://github.com/jairfilhobonifacio">Jair Filho</a>
</div>
