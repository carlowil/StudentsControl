const express = require("express");
const tasksController = require("../controllers/tasksController");
const tasksRouter = express.Router();

tasksRouter.get("/withMark/:id", tasksController.getTasksWithMarksById);
tasksRouter.get("/", tasksController.getAllTasks);
tasksRouter.put("/update/mark/:id", tasksController.updateTaskReadyMark);
tasksRouter.put("/chg/:id", tasksController.changeTask);
tasksRouter.delete("/del/:id", tasksController.deleteTask);
tasksRouter.post("/add", tasksController.addTask);

module.exports = tasksRouter;