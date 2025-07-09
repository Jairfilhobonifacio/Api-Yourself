# 🎗️ API de Doação Comunitária

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

Uma plataforma completa para conectar doadores a pontos de coleta, desenvolvida com React no frontend e Node.js/Express no backend, utilizando banco de dados MySQL.

## 🌟 Destaques

- **Interface moderna e responsiva** com React
- **Backend robusto** com Node.js e Express
- **Banco de dados relacional** MySQL para armazenamento seguro
- **Mapa interativo** para localização de pontos de doação
- **Painel administrativo** para gerenciamento de pontos
- **Sistema de autenticação** seguro

## 🚀 Tecnologias

### Frontend
- React 18
- React Router DOM
- Axios para requisições HTTP
- Leaflet para mapas interativos
- Chart.js para visualização de dados
- Styled Components para estilização

### Backend
- Node.js
- Express.js
- MySQL (com Sequelize ORM)
- JWT para autenticação
- Bcrypt para criptografia de senhas
- CORS para segurança

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- MySQL (v8.0 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/jair/api-doacao-comunitaria.git
   cd api-doacao-comunitaria
   ```

2. **Configure o backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais do MySQL
   ```

3. **Configure o frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Configure a URL da API no arquivo .env
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   # No diretório backend
   npm run dev
   
   # Em outro terminal, no diretório frontend
   npm start
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 🏗️ Estrutura do Projeto

```
api-doacao-comunitaria/
├── backend/               # Código do servidor
│   ├── config/           # Configurações do banco de dados
│   ├── controllers/      # Lógica dos controladores
│   ├── middlewares/      # Middlewares do Express
│   ├── models/           # Modelos do Sequelize
│   ├── routes/           # Rotas da API
│   ├── services/         # Lógica de negócios
│   ├── utils/            # Utilitários
│   └── app.js            # Aplicação principal
│
└── frontend/             # Aplicação React
    ├── public/           # Arquivos estáticos
    └── src/
        ├── assets/       # Imagens, ícones, etc.
        ├── components/   # Componentes reutilizáveis
        ├── context/      # Contextos do React
        ├── hooks/        # Custom hooks
        ├── pages/        # Páginas da aplicação
        ├── services/     # Serviços de API
        ├── styles/       # Estilos globais
        ├── utils/        # Utilitários
        └── App.js        # Componente raiz
```

## 📚 Documentação da API

A documentação completa da API está disponível em [API_DOCS.md](API_DOCS.md).

### Principais Endpoints

- `GET /api/pontos` - Lista todos os pontos de doação
- `GET /api/pontos/cidade/:cidade` - Busca pontos por cidade
- `POST /api/pontos` - Cria um novo ponto de doação
- `PUT /api/pontos/:id` - Atualiza um ponto existente
- `DELETE /api/pontos/:id` - Remove um ponto de doação

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça o push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Jair Filho** - [GitHub](https://github.com/Jairfilhobonifacio) | [LinkedIn](#)

## 🙏 Agradecimentos

- À comunidade de desenvolvedores por todo o suporte
- Aos contribuidores que ajudaram no desenvolvimento
- A todos que acreditam no poder da solidariedade

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/Jairfilhobonifacio">Jair Filho</a>
</div>
