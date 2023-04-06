import connectionDb from "../config/database.js";
import Session from "../protocols/Session.js";
import { UserData, UserEntity } from "../protocols/User";
import { QueryResult } from "pg";

async function findByEmail(email: string): Promise<QueryResult<UserEntity>> {
  return await connectionDb.query(
  `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password }: UserData): Promise<void> {
  await connectionDb.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function createSession({ token, userId }: Session): Promise<void> {
  await connectionDb.query(
    `
      INSERT INTO sessions (token, "userId")
      VALUES ($1, $2)
    `,
    [token, userId]
  );
}

async function findSessionByToken(token: string): Promise<QueryResult<Session>> {
  return await connectionDb.query(
    `
      SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

async function findById(id: number): Promise<QueryResult<UserEntity>> {
  return await connectionDb.query(
    `    
      SELECT * FROM users WHERE id=$1
    `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
};
