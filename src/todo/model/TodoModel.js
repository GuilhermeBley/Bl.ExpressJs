import db from '../config/database'

class TodoModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM Todo ORDER BY CreatedAt DESC');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Todo WHERE Id = $1', [id]);
    return result.rows[0];
  }

  static async create(name) {
    const result = await db.query(
      'INSERT INTO Todo (Name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const { name, finishedAt } = updates;
    const result = await db.query(
      'UPDATE Todo SET Name = $1, FinishedAt = $2 WHERE Id = $3 RETURNING *',
      [name, finishedAt, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM Todo WHERE Id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async markAsFinished(id) {
    const result = await db.query(
      'UPDATE Todo SET FinishedAt = CURRENT_DATE WHERE Id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = TodoModel;