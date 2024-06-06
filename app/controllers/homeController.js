const db = require('../db.js')

exports.login = function(req, res) {
    res.render('login', {});
}

exports.registration = function(req, res) {
    res.render('registration', {});
}

exports.home = async function(req, res) {
    await fetch('http://localhost:8080/api/tasks/')
    .then((res) => {
        return res.json()
    })
    .then(async (data) => {
        await fetch('http://localhost:8080/api/users/').then((rep) => {
            return rep.json()
        }).then((student) => {
            res.render('home', 
                {
                    data: data.tasks,
                    student: student.users[0]
                });
        })
    })
}

exports.exams = async function(req, res) {
    await fetch('http://localhost:8080/api/exams/')
    .then((res) => {
        return res.json()
    })
    .then(async (data) => {
        await fetch('http://localhost:8080/api/users/').then((rep) => {
            return rep.json()
        }).then((student) => {
            res.render('exams',
                {
                    data: data.exams,
                    student: student.users[0]
                });
        })
    })
}

exports.studentsPanel = async function(req, res) {
    await fetch('http://localhost:8080/api/users/')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        res.render('students', 
        {
            data: data.users
        }
    );
    })
}

exports.professorPanel = async function(req, res) {
    await fetch('http://localhost:8080/api/tasks/')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        res.render('professorPanel', 
        {
            data: data.tasks
        }
    );
    })
}

exports.logout = function(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
    db.query("RESET ROLE;");
    res.redirect("/login");
}