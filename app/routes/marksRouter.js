const express = require("express");
const marksController = require("../controllers/marksController");
const marksRouter = express.Router();

marksRouter.get("/", marksController.getAllMarks);

module.exports = marksRouter;