import pool from '../db.js';

export default class PontoDoacao {
  static async listarTodos() {
    const { rows } = await pool.query('SELECT * FROM pontos_de_doacao ORDER BY id');
    return rows;
  }

  static async buscarPorId(id) {
    const { rows } = await pool.query('SELECT * FROM pontos_de_doacao WHERE id = $1', [id]);
    return rows[0];
  }

  static async buscarPorCidade(cidade) {
    const { rows } = await pool.query('SELECT * FROM pontos_de_doacao WHERE LOWER(cidade) = LOWER($1)', [cidade]);
    return rows;
  }

  static async criar(ponto) {
    const { nome, endereco, cidade, tipoDoacoes, itensUrgentes, horario, contato, latitude, longitude } = ponto;
    const { rows } = await pool.query(
      `INSERT INTO pontos_de_doacao (nome, endereco, cidade, tipoDoacoes, itensUrgentes, horario, contato, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [nome, endereco, cidade, tipoDoacoes, itensUrgentes, horario, contato, latitude, longitude]
    );
    return rows[0];
  }

  static async atualizar(id, ponto) {
    const { nome, endereco, cidade, tipoDoacoes, itensUrgentes, horario, contato, latitude, longitude } = ponto;
    const { rows } = await pool.query(
      `UPDATE pontos_de_doacao SET nome=$1, endereco=$2, cidade=$3, tipoDoacoes=$4, itensUrgentes=$5, horario=$6, contato=$7, latitude=$8, longitude=$9 WHERE id=$10 RETURNING *`,
      [nome, endereco, cidade, tipoDoacoes, itensUrgentes, horario, contato, latitude, longitude, id]
    );
    return rows[0];
  }

  static async remover(id) {
    await pool.query('DELETE FROM pontos_de_doacao WHERE id = $1', [id]);
    return true;
  }
}
