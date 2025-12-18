const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    anoDiagnostico TEXT,
    tipoEM TEXT,
    historia TEXT,
    approved INTEGER DEFAULT 0,
    createdAt TEXT
  )
`).run();

module.exports = db;
