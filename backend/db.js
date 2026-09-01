const Database = require("better-sqlite3");
const db = new Database("shifts.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT
  )
`);

module.exports = db;