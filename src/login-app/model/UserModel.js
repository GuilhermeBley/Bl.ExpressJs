import { db } from "../config/database.js";

class UserModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM User ORDER BY CreatedAt DESC');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM User WHERE Id = $1', [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const values = [
      userData.username,
      userData.email,
      userData.password_hash,
      userData.first_name,
      userData.last_name
    ];
    const result = await db.query(
      `INSERT INTO "User" (username, email, password_hash, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      values
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM User WHERE Id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async tryCreateTable(){
    try{
      await db.query(
        `
        CREATE TABLE IF NOT EXISTS User (
            id SERIAL PRIMARY KEY,
            username VARCHAR(250) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `
      )
    }
    catch(e){
      console.error('failed to create table.', e)
    }
  }
}

export default TodoModel;