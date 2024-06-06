const db = require('../db.js')

class marksController {
    async getAllMarks(req, res) {
        await db.query('SELECT * FROM marks ORDER BY id;', {type: db.QueryTypes.RAW}).then((marks) => {
            console.log(marks[0])
            res.status(200).json({ marks: marks[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }
}

module.exports = new marksController();