const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://adm:password27@ds027491.mlab.com:27491/sbertest";

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("Подключено к базе"));
db.on("error", console.error.bind(console, "Проблема с соединением MongoDB:"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

let checkExisting = login => {
  Data.find({ login }, (err, docs) => {
    return docs.length !== 0;
  });
};

//Берет всех юзеров в базе
router.get("/user", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
//Берет конкретного юзера
router.get("/user/:id", (req, res) => {
  Data.findById(req.params.id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
//Добавляет юзера
router.post("/user", (req, res) => {
  let data = new Data();
  const { name, login } = req.body;
  let exist = checkExisting(login);
  if (!name || !login) {
    return res.json({
      success: false,
      error: "Недостаточно данных"
    });
  }
  Data.find({ login }, (err, docs) => {
    if (docs.length !== 0){
      return res.json({
        success: false,
        error: "Пользователь с таким логином уже существует"
      });
    }
    else {
      data.name = name;
      data.login = login;
      data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, id: data._id});
      });
    }
  });
});
//Редактирует юзера
router.put("/user/:id", (req, res) => {
  const { name, login } = req.body;
  let exist = checkExisting(login);
  if (exist) {
    return res.json({
      success: false,
      error: "Пользователь с таким логином уже существует"
    });
  }
  Data.findById(req.params.id, (err, doc) => {
    if (err) return res.json({ success: false, error: err });
    if(login)
      doc.login = login;
    if(name)
      doc.name = name;
    doc.save();
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`Слушаем порт ${API_PORT}`));
