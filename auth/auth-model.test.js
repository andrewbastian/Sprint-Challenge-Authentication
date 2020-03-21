const authModel = require("./auth-model")
const db = require('../database/dbConfig')
const supertest = require("supertest")

test("add", async () => {
	const res = await authModel.add({ username: "duder1", password: "crud" })
	expect(res.username).toBe("duder1")
})

test("findById", async () => {
	const res = await authModel.findById(1)
	expect(res.username).toBe("and")
})
