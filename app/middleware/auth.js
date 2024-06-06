const jwt = require("jsonwebtoken")
const jwtSecret = 'c0b28f95dc7ae195437b83f13b1a98c13a9126c0272bc0de3d1a3933cbf670914377cf'
const db = require('../db.js')

exports.adminAuth = async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.redirect('/login')
        // return res.status(401).json({
        //   status: 401,
        //   message: "Not authorized" 
        // })
      } else {
        if (decodedToken.role !== "professor") {
          return res.redirect('/login')
          // return res.status(401).json({
          //   status: 401,
          //   message: "Not authorized"
          //  })
        } else {
          await db.query(`SET ROLE 'professor:${decodedToken.id}';`);
          next()
        }
      }
    })
  } else {
      res.redirect("/login");
    // return res
    //   .status(401)
    //   .json({ 
    //     status: 401,
    //     message: "Not authorized, token not available" 
    //   })
  }
}

exports.userAuth = async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decodedToken) => {
        if (err) {
          res.redirect("/login");
          // return res.status(401).json({ 
          //   status: 401,
          //   message: "Not authorized" 
          // })
        } else {
          if (decodedToken.role !== "student") {
            res.redirect("/login");
            // return res.status(401).json({ 
            //   status: 401,
            //   message: "Not authorized" 
            // })
          } else {
            await db.query(`SET ROLE 'student:${decodedToken.id}';`);
            next()
          }
        }
      })
    } else {
      res.redirect("/login");
      // return res
      //   .status(401)
      //   .json({ 
      //     status: 401,
      //     message: "Not authorized, token not available"
      //    })
    }
  }