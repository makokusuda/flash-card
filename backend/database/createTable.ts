export {};
const db = require("./db");

db.run(`CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY,
  front TEXT NOT NULL,
  back TEXT NOTE NULL,
  image VARCHAR,
  file_name VARCHAR,
  created_datetime TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime'))
  )`);

db.close();
