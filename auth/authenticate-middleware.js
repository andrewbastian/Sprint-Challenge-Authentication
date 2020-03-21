/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const sessions ={}

function restrict() {
	const authError = {
		message: "U shall not pass",
	}
	
	return async (req, res, next) => {
		console.log(req.headers)
		try {
			   if (!req.sessions || !req.session.user){
			   	return res.status(401).json(authError)
			   }

			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
	sessions,
}