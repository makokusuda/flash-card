const db = require("./db");

db.run(`CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY,
  front TEXT,
  back TEXT,
  image VARCHAR,
  created_datetime TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime'))
  )`);

db.close();
