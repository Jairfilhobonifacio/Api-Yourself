# Backend - API Doação Comunitária

## Configuração Inicial

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## Opção 1: Usando NeonDB (Recomendado para Produção)

1. **Crie uma conta no [Neon](https://neon.tech/)** e crie um novo projeto
2. **Crie um banco de dados** e copie a string de conexão
3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` e adicione sua string de conexão do Neon:
   ```
   DATABASE_URL=postgres://usuario:senha@servidor/bancodedados?sslmode=require
   PORT=3001
   ```

## Opção 2: Usando PostgreSQL Local (Para Desenvolvimento)

1. **Instale o PostgreSQL**
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Crie um banco de dados:
     ```sql
     CREATE DATABASE doacao_comunitaria;
     ```

2. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env`:
   ```
   DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/doacao_comunitaria
   PORT=3001
   ```

3. **Execute o script SQL** para criar as tabelas necessárias
   ```bash
   psql -U seu_usuario -d doacao_comunitaria -f src/models/create_table.sql
   ```

## Iniciando a Aplicação

```bash
# Modo desenvolvimento (com recarregamento automático)
npm run dev

# Modo produção
npm start
```

A API estará disponível em `http://localhost:3001`

## Variáveis de Ambiente

| Variável      | Descrição                               | Exemplo                                  |
|---------------|----------------------------------------|------------------------------------------|
| DATABASE_URL  | String de conexão com o banco de dados | postgres://user:pass@host:port/db        |
| PORT          | Porta do servidor (opcional)           | 3001                                     |

## Rotas da API

### Pontos de Doação
- `GET /api/pontos` — Lista todos os pontos
- `GET /api/pontos/id/:id` — Busca ponto por ID
- `GET /api/pontos/cidade/:nome` — Busca pontos por cidade
- `POST /api/pontos` — Cria novo ponto
- `PUT /api/pontos/:id` — Atualiza ponto
- `DELETE /api/pontos/:id` — Remove ponto

## Exemplo de Uso

### Criar um novo ponto de doação
```bash
curl -X POST http://localhost:3001/api/pontos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ponto de Doação 1", "cidade": "São Paulo"}'
```

## Desenvolvimento

### Estrutura de Pastas
- `src/` - Código-fonte
  - `controllers/` - Lógica das rotas
  - `models/` - Modelos e consultas ao banco
  - `routes/` - Definição das rotas
  - `db.js` - Configuração do banco de dados

### Dependências Principais
- Express.js - Framework web
- pg - Cliente PostgreSQL
- dotenv - Gerenciamento de variáveis de ambiente
- cors - Habilita CORS

## Solução de Problemas

- **Erro de conexão com o banco de dados**: Verifique se o banco de dados está rodando e se as credenciais no `.env` estão corretas
- **Erro de porta em uso**: Mude a porta no arquivo `.env` ou encerre o processo que está usando a porta

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
