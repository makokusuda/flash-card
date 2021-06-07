const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./backend/database/card.db");

module.exports = db;
