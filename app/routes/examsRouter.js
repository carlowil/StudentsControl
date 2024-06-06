const express = require("express");
const examsController = require("../controllers/examsController");
const examsRouter = express.Router();

examsRouter.get("/", examsController.getAllExams);

module.exports = examsRouter;