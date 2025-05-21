import { PGlite } from '@electric-sql/pglite';

console.log('[DB] Starting database initialization...');

// Initialize PGlite with version 0.1.0 configuration
const db = new PGlite('idb://patients.db');

console.log('[DB] PGlite instance created');

const initDB = async () => {
  try {
    console.log('[DB] Executing CREATE TABLE statement...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT
      );
    `);
    console.log('[DB] Table created successfully');
  } catch (error) {
    console.error('[DB] Error initializing database:', error);
    throw error;
  }
};

export { db, initDB };
