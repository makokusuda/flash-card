const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("backend/server/images"));

const fsWriteFile = (image_extension, image, fileName) => {
  fs.writeFile(
    path.join(__dirname, `./images/${fileName}.${image_extension}`),
    image,
    "base64",
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("done");
      }
    }
  );
};

app.get("/api/cards", (req, res) => {
  console.log(req.params, req.query);
  const { limit, page } = req.query;
  const offset = limit * (page - 1);
  const sql =
    "SELECT *, (SELECT count (*) FROM cards) AS count FROM cards ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const params = [limit, offset];
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(404).json({ err });
    } else {
      return res.status(200).json(rows);
    }
  });
});

app.post("/api/cards", (req, res) => {
  const { front, back, image, image_extension, file_name } = req.body;
  let params;
  if (req.body.image) {
    const fileName = `${file_name}.${new Date().getTime()}`;
    fsWriteFile(image_extension, image, fileName);
    params = [front, back, `${fileName}.${image_extension}`, file_name];
  } else {
    params = [front, back, null, null];
  }
  const sql =
    "INSERT INTO cards (front, back, image, file_name) VALUES (?, ?, ?, ?)";
  db.run(sql, params, (err, rows) => {
    if (err) {
      return res.status(400).json({ err });
    } else {
      return res.status(201).json({ message: "Success" });
    }
  });
});

app.put("/api/cards/:id", (req, res) => {
  const { front, back, image, image_extension, file_name } = req.body;
  const id = req.params.id;
  let params;
  if (req.body.image) {
    const fileName = `${file_name}.${new Date().getTime()}`;
    fsWriteFile(image_extension, image, fileName);
    params = [front, back, `${fileName}.${image_extension}`, file_name, id];
  } else {
    params = [front, back, null, null, id];
  }
  const sql =
    "UPDATE cards SET front=?, back=?, image=?, file_name=? WHERE id=?";
  db.run(sql, params, (err, rows) => {
    if (err) {
      return res.status(404).json({ err });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  });
});

app.delete("/api/cards/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cards WHERE id=?";
  const params = [id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      return res.status(404).json({ err });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
