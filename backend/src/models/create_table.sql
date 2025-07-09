-- Script para criar a tabela no Neon/PostgreSQL
CREATE TABLE IF NOT EXISTS pontos_de_doacao (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  tipoDoacoes TEXT[],
  itensUrgentes TEXT[],
  horario TEXT,
  contato TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION
);
