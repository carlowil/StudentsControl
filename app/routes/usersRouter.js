const express = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.put("/chg/:id", usersController.updateUser);
usersRouter.put("/chg/switchmarks/:id", usersController.updateSwitchMark);
usersRouter.put("/chg/switchexams/:id", usersController.updateSwitchExam);

module.exports = usersRouter;