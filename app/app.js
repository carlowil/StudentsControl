const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const db = require('./db.js')

const app = express();
app.use(express.json());
app.use(cookieParser());

db.authenticate()
  .catch(error => console.error(error))

const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const examsRouter = require("./routes/examsRouter");
const marksRouter = require("./routes/marksRouter");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/images')));

app.use("/", homeRouter);
app.use("/api/auth", loginRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter)
app.use("/api/exams", examsRouter);
app.use("/api/marks", marksRouter);

app.get("*", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).render('404', {});
});

const server = app.listen(8080, () => {
    console.log("server listening on port 8080");
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })

