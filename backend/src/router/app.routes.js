const express = require('express');
const ApiRouter = require('./api.routes');
const router = express.Router();

router.get("/", (req,res) => {
    res.send("API ONLINETV")
})
router.use("/api", ApiRouter)

module.exports = router