const Users = require("../models/Users")
const db = require('../db.js')

class usersController {
    async getAllUsers(req, res) {
        await db.query(`SELECT id, username, role, can_see_marks, can_see_exams FROM users;`, {type: db.QueryTypes.RAW}).then((users) => {
            console.log(users[0])
            res.status(200).json({ users: users[0] })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }

    async updateUser(req,res) {
        const id = req.params.id;
        const newUser = req.body;

    }

    async updateSwitchMark(req, res) {
        const id = req.params.id;
        const mark_sw = req.body.can_see_marks;
        console.log(mark_sw);
        if (mark_sw == 'true') {
            await db.query(`UPDATE public.users SET can_see_marks='true' WHERE id=${id};`, {type: db.QueryTypes.RAW}).then(async (rep) => {
                console.log(rep)
                await db.query(`GRANT SELECT ON TABLE public.marks TO "student:${id}";`);
                await db.query(`GRANT SELECT ON SEQUENCE public.marks_id_seq TO "student:${id}";`);
                res.status(200).json({ message: "Update successful!" })
            }).catch(err =>
                res.status(401).json({ message: "Update not successful", error: err.message })
              )
        } else {
            await db.query(`UPDATE public.users SET can_see_marks='false' WHERE id=${id};`, {type: db.QueryTypes.RAW}).then(async (rep) => {
                console.log(rep)
                await db.query(`REVOKE ALL ON TABLE public.marks FROM "student:${id}";`);
                await db.query(`REVOKE ALL ON SEQUENCE public.marks_id_seq FROM "student:${id}";`);
                res.status(200).json({ message: "Update successful!" })
            }).catch(err =>
                res.status(401).json({ message: "Update not successful", error: err.message })
              )
        }
    }

    async updateSwitchExam(req, res) {
        const id = req.params.id;
        const exam_sw = req.body.can_see_exams;
        console.log(exam_sw);
        if (exam_sw == 'true') {
            await db.query(`UPDATE public.users SET can_see_exams='true' WHERE id=${id};`, {type: db.QueryTypes.RAW}).then(async (rep) => {
                console.log(rep);
                await db.query(`GRANT SELECT ON TABLE public.exams TO "student:${id}";`);
                await db.query(`GRANT SELECT ON SEQUENCE public.exams_id_seq TO "student:${id}";`);
                res.status(200).json({ message: "Update successful!" });
            }).catch(err =>
                res.status(401).json({ message: "Update not successful", error: err.message })
              )
        } else {
            await db.query(`UPDATE public.users SET can_see_exams='false' WHERE id=${id};`, {type: db.QueryTypes.RAW}).then(async (rep) => {
                console.log(rep);
                await db.query(`REVOKE ALL ON TABLE public.exams FROM "student:${id}";`);
                await db.query(`REVOKE ALL ON SEQUENCE public.exams_id_seq FROM "student:${id}";`);
                res.status(200).json({ message: "Update successful!" });
            }).catch(err =>
                res.status(401).json({ message: "Update not successful", error: err.message })
              )
        }
    }
}

module.exports = new usersController();