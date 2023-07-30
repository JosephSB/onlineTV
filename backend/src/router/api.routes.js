const express = require('express');
const AuthController = require('../controllers/auth.controller');
const StreamController = require('../controllers/stream.controller');
const verifyToken = require('../middlewares/jwtverify.middleware');
const ApiRouter = express.Router();

//* -------------------AUTH-ROUTES----------------------- */
ApiRouter.post("/auth/register", AuthController.Register)
ApiRouter.post("/auth/login", AuthController.Login)

//* -------------------STREAM-ROUTES----------------------- */
ApiRouter.get("/live/start",verifyToken, StreamController.Start)
//8e98-jaq8-q69c-er7s-bkgs
ApiRouter.get("/live/listLives", StreamController.ListLives)

module.exports = ApiRouter