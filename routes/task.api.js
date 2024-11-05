//라우터 정의를 위해 express에서 제공하는 Router를 쓰기위해 불러오는 작업
const express = require("express");
const taskController = require("../controller/task.controller");
const router = express.Router();

//라우터의 경로를 정의하고, 특정 경로로 요청이 들어왔을때 어떻게 처리할지 알려주는 코드
router.post("/", taskController.createTask);

router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
