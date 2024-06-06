const Users = require("../models/Users")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret = 'c0b28f95dc7ae195437b83f13b1a98c13a9126c0272bc0de3d1a3933cbf670914377cf'
const db = require('../db.js')

class loginController {
    async register(req, res, next) {
        const { username, password } = req.body
        if (password.length < 6) {
          return res.status(400).json({ 
            status: 400,
            message: "Password less than 6 characters" 
          })
        }
        bcrypt.hash(password, 10).then(async (hash) => {
            await Users.create({
              username: username,
              password: hash
            })
              .then(async (user) =>  {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: user.id, username: username, role: user.role },
                  jwtSecret,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                );
                await db.query(`CREATE USER "student:${user.id}" WITH PASSWORD '${password}';`);
                await db.query(`GRANT CONNECT ON DATABASE app TO "student:${user.id}";`);
                await db.query(`GRANT SELECT ON TABLE public.users TO "student:${user.id}";`);
                await db.query(`GRANT SELECT ON SEQUENCE public.tasks_id_seq TO "student:${user.id}";`);
                await db.query(`GRANT SELECT ON SEQUENCE public.users_id_seq TO "student:${user.id}";`);
                await db.query(`GRANT SELECT, UPDATE ON TABLE public.tasks TO "student:${user.id}";`);
                await db.query(`SET ROLE 'student:${user.id}';`);
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                  status: 200,
                  message: "User successfully created",
                  user: user.id,
                  role: user.role
                });
              })
              .catch((error) =>
                res.status(400).json({
                  status: 400,
                  message: "User not successful created",
                  error: error,
                })
              );
          });
    }

    async login(req, res) {
        const { username, password } = req.body
        // Check if username and password is provided
        if (!username || !password) {
          return res.status(400).json({
            status: 400,
            message: "Username or Password not present"
          })
        }

        try {
            Users.findOne({ where:{username: username}, raw: true })
            .then((user) => {
              if (!user) {
                res.status(400).json({
                  status: 400,
                  message: "Login not successful",
                  error: "User not found",
                })
              } else {
                  bcrypt.compare(password, user.password).then( async function (result) {
                      if (result) {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                          { id: user.id, username: username, role: user.role },
                          jwtSecret,
                          {
                            expiresIn: maxAge, // 3hrs in sec
                          }
                        );
                        console.log(user.role);
                        if (user.role !== 'student') {
                          await db.query(`SET ROLE 'professor:${user.id}'`);
                        } else {
                          await db.query(`SET ROLE 'student:${user.id}'`);
                        }
                        res.cookie("jwt", token, {
                          httpOnly: true,
                          maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        res.status(201).json({
                          status: 200,
                          message: "User successfully Logged in",
                          user: user.id,
                          role: user.role
                        });
                      } else {
                        res.status(400).json({ 
                          status: 400,
                          message: "Login not succesful" 
                        });
                      }
                    });
                  }
            })
          } catch (error) {
            res.status(400).json({
              status: 400,
              message: "An error occurred",
              error: error.message
            })
          }
    }
}

module.exports = new loginController();