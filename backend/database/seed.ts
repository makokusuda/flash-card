export {};
const db = require("./db");

db.run(
  `INSERT INTO cards (front, back) VALUES ('apple', 'りんご'), ('strawberry', 'いちご')`
);

db.close();
