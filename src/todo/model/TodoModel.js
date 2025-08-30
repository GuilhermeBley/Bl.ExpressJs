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

  static async create(title) {
    const result = await db.query(
      'INSERT INTO Todo (Title) VALUES ($1) RETURNING *',
      [title]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const { title, finishedAt } = updates;
    const result = await db.query(
      'UPDATE Todo SET Title = $1, FinishedAt = $2 WHERE Id = $3 RETURNING *',
      [title, finishedAt, id]
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