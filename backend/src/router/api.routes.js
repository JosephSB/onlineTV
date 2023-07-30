const express = require('express');
const AuthController = require('../controllers/auth.controller');
const ApiRouter = express.Router();

//* -------------------AUTH-ROUTES----------------------- */
ApiRouter.post("/register", AuthController.Register)
ApiRouter.post("/login", AuthController.Login)

module.exports = ApiRouter