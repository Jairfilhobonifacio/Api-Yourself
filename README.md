<!-- README.md -->

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License Badge"/>
  <img src="https://img.shields.io/github/last-commit/jairfilhobonifacio/Api-Yourself" alt="Last Commit Badge"/>
</p>

<h1 align="center">
  <span style="font-weight:700;background:linear-gradient(90deg,#2563eb,#14b8a6);-webkit-background-clip:text;color:transparent;">Api</span> ❤️ 
  <span style="font-weight:700;background:linear-gradient(90deg,#14b8a6,#2563eb);-webkit-background-clip:text;color:transparent;">Yourself</span>
</h1>

<p align="center">
  Plataforma para conectar doadores a pontos de coleta em sua comunidade.
</p>

---

## 🌐 Links de Produção

| Serviço          | URL                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Frontend**     | https://api-yourself.vercel.app                                                     |
| **Backend**      | https://api-yourself.onrender.com                                                   |
| **Health Check** | https://api-yourself.onrender.com/api/health                                        |

---

## 📋 Visão Geral
A **API de Doação Comunitária** conecta doadores a pontos de coleta locais, facilitando a doação de itens essenciais de forma acessível e transparente.

---

## 🖼️ Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/33db29ff-8fae-48b7-a072-f3a825a500e7" alt="Api Yourself - Tema escuro" width="48%"/>
  <img src="https://github.com/user-attachments/assets/6a2d47f8-c90d-4977-be6d-d8c748ef7a10" alt="Api Yourself - Tema claro" width="48%"/>
</p>

---

## 🎯 Objetivos
- Conectar doadores a pontos de coleta próximos.  
- Fornecer informações claras sobre itens necessários.  
- Promover a solidariedade e ajuda mútua nas comunidades.  
- Oferecer uma plataforma intuitiva e fácil de usar.  

---

## 🚀 Tecnologias Utilizadas

### Frontend
- Next.js 14.1.0
- React 18.2.0
- TypeScript 5.0.0
- Tailwind CSS 3.3.0
- Lucide Icons 0.284.0
- Axios 1.6.0
- React Hook Form 7.49.0
- Zod 3.22.4

### Ferramentas de Desenvolvimento
- Node.js 18+
- npm 9+ ou Yarn 1.22+
- Git 2.25+

---

## 📦 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+  
- npm ou Yarn  
- Git  

### Instalação

1. Clone o repositório:
git clone https://github.com/jairfilhobonifacio/Api-Yourself.git
cd Api-Yourself/frontend_new

text

2. Instale as dependências:
npm install

ou
yarn install

text

3. Configure as variáveis de ambiente:<br>
Crie um arquivo `.env.local` na raiz do projeto:
NEXT_PUBLIC_API_URL=http://localhost:3001/api

text

4. Inicie o servidor de desenvolvimento:
npm run dev

ou
yarn dev

text

5. Acesse em seu navegador:  
http://localhost:3000

---

## 📚 Documentação da API
A API está disponível em **[Api-Yourself](https://github.com/jairfilhobonifacio/Api-Yourself)**.

### Principais Endpoints
| Método | Rota                               | Descrição                         |
| ------ | ---------------------------------- | --------------------------------- |
| GET    | `/api/pontos`                      | Lista todos os pontos de doação   |
| GET    | `/api/pontos/cidade/:cidade`       | Busca pontos por cidade           |
| GET    | `/api/estatisticas`                | Obtém estatísticas de doações     |

---

## 🤝 Como Contribuir

1. Faça um **fork** do projeto.  
2. Crie uma branch de feature:  
`git checkout -b feature/MinhaFeature`  
3. Adicione suas alterações:  
`git add .`  
4. Faça commit:  
`git commit -m "feat: minha nova feature"`  
5. Envie a branch:  
`git push origin feature/MinhaFeature`  
6. Abra um **Pull Request**.

---

## 📄 Licença
Projeto sob licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<p align="center">
Desenvolvido com ❤️ por <a href="https://github.com/jairfilhobonifacio">Jair Filho</a>
</p>
