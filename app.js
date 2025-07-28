const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("MongoURI", MONGODB_URI_PROD);

app.use(bodyParser.json()); 
app.use(cors());
app.use("/api", indexRouter);
const mongoURI = `mongodb://localhost:27017/todo-demo`; //로컬 작업할때 활성화 시키기
// const mongoURI = MONGODB_URI_PROD; //배포 작업할떄 활성화 시키기

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
//중요!!!! heroku 배포할때 이 부분을 아래 const PORT로 바꿔야함
// app.listen(4000, () => {
//   console.log("server on 4000!");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
