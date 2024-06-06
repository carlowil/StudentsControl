const Tasks = require("../models/Tasks")
const db = require('../db.js')

class tasksController {
    async getAllTasks(req, res) {
        await db.query('SELECT * FROM tasks', {type: db.QueryTypes.RAW}).then((tasks) => {
            console.log(tasks[0])
            res.status(200).json({ tasks: tasks[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }

    async getTasksWithMarksById(req, res) {
        const id = req.params.id;
        await db.query(`SELECT ts.title, mr.mark, mr.comment FROM tasks ts JOIN marks mr ON ts.mark_id = mr.id WHERE ts.id = ${id}`, {type: db.QueryTypes.RAW}).then((task) => {
            console.log(task[0])
            res.status(200).json({ task: task[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }

    async updateTaskReadyMark(req, res) {
        const id = req.params.id;
        const req_body = req.body;

        await db.query(`UPDATE public.tasks SET ready=${req_body.ready}, mark_id=${req_body.mark} WHERE id = ${id};`, {type: db.QueryTypes.RAW}).then((rep) => {
            console.log(rep[0])
            res.status(200).json({ message: rep[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )

    }

    async getTask(req, res) {

    }

    async deleteTask(req, res) {
        
    }
    async changeTask(req, res) {
        
    }
    async addTask(req, res) {
        const req_body = req.body;
        console.log(req_body);
        await db.query(`INSERT INTO public.tasks (title, body, user_id) VALUES ('${req_body.title}', '${req_body.text}', '${req_body.id}');`, {type: db.QueryTypes.RAW}).then((rep) => {
            console.log(rep[0])
            res.status(200).json({ message: rep[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }
}

module.exports = new tasksController();