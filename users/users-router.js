// const express = require("express")
// const Users = require("./users-model")
// // add {} to destructure function
// const { restrict } = require("../auth/authenticate-middleware")

// const router = express.Router()

// router.get("/", restrict(), async (req, res, next) => {
// 	try {
// 		res.json(await Users.find())
// 	} catch(err) {
// 		next(err)
// 	}
// })

// module.exports = router