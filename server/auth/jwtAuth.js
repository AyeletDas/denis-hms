// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => { // next- continues to the next path if validation is successful
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // If token exists

  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)  => {
    if (err)
     {
      console.log(err)
      return res.sendStatus(403)
     } 

    req.user = user
    next() // Only if the token is valid, the user will be able to access the path content.
  })
}

module.exports = jwtAuth;


