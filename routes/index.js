const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

router.use("/tasks", taskApi);
// "/tasks" 경로가 불리어지면 >> taskApi를 쓴다 >> task.api.js로 넘어간다
router.use("/user", userApi);

module.exports = router;
