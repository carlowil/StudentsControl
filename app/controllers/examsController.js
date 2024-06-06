const db = require('../db.js')

class examsController {
    async getAllExams(req, res) {
        await db.query(`SELECT * FROM exams;`, {type: db.QueryTypes.RAW}).then((exams) => {
            console.log(exams[0])
            res.status(200).json({ exams: exams[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }
}

module.exports = new examsController();