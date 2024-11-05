//express, mongoose, body-parser 사용하기위해 불러오기
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("MongoURI", MONGODB_URI_PROD);

app.use(bodyParser.json()); //json형태의 파일을 읽어라 라는 뜻
app.use(cors());
app.use("/api", indexRouter); // "/api"경로가 불리면 >> indexRouter 즉, index.js에서 모든걸 처리하겠다 라는뜻
// const mongoURI = `mongodb://localhost:27017/todo-demo`; 로컬주소
const mongoURI = MONGODB_URI_PROD;

//mongoose setting
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected!");
  })
  .catch((err) => {
    console.log("DB connected failed :(", err);
  });

//app listener setting
app.listen(4000, () => {
  console.log("server on 4000!");
});
