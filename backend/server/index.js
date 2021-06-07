const express = require("express");
const db = require("../database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.static("backend/server/images"));

app.get("/api/cards", (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM cards`, (err, rows) => {
      if (err) {
        return res.status(404).json({ err });
      } else {
        return res.status(200).json(rows);
      }
    });
  });
  // db.close();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
