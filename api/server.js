const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { restrict } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require("../users/users-router")
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const session = require('express-session')
const port = process.env.PORT || 5000
const KnexSessionStore = require('connect-session-knex')(session) //call funciton right after import
const dbConfig = require('../database/dbConfig')

server.use(session({
	name: "token", // overwrites the default cookie name, hides our stack better
	resave: false, // avoid recreating sessions that have not changes
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
	cookie: {
		httpOnly: true, // disallow javascript from reading our cookie contents
	// 	maxAge: 15 * 1000, // expire the cookie after 15 seconds
	},
	store: new KnexSessionStore({
		knex: dbConfig, // configured instance of knex
		createtable: true, // if the session table doesn't exist, create it automatically
	}),
}))

server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
})

module.exports = server;
