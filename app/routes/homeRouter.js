const express = require("express");
const homeController = require("../controllers/homeController");
const { adminAuth, userAuth } = require("../middleware/auth");
const homeRouter = express.Router();

homeRouter.get("/login", homeController.login);
homeRouter.get("/registration", homeController.registration);
homeRouter.get("/professor-panel/tasks", adminAuth, homeController.professorPanel);
homeRouter.get("/professor-panel/tasks/add", adminAuth, homeController.addTask);
homeRouter.get("/professor-panel/students", adminAuth, homeController.studentsPanel);
homeRouter.get("/home", userAuth, homeController.home);
homeRouter.get("/exams", userAuth, homeController.exams);
homeRouter.get("/logout", homeController.logout);

module.exports = homeRouter;

