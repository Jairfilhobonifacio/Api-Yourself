# Backend - API Doação Comunitária

## Como rodar

1. Copie o arquivo `.env.example` para `.env` e preencha com sua string de conexão do Neon.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode a aplicação:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3001`.

## Rotas principais
- `GET /api/pontos` — Lista todos os pontos
- `GET /api/pontos/id/:id` — Busca ponto por ID
- `GET /api/pontos/cidade/:nome` — Busca pontos por cidade
- `POST /api/pontos` — Cria novo ponto
- `PUT /api/pontos/:id` — Atualiza ponto
- `DELETE /api/pontos/:id` — Remove ponto
