const Task = require("../model/Task");

const taskController = {};

//할일 추가하기 (CRUD 중 C에 해당)
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userID } = req;
    const newTask = new Task({ task, isComplete, author: userID });
    await newTask.save();
    res.status(200).json({ status: "success!", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "failed :(", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "success!", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "failed :(", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );
    res.status(200).json({ status: "success!", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "failed :(", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "success!", message: "Task deleted!" });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err });
  }
};

module.exports = taskController;
