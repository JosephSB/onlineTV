const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];

        jwt.verify(bearerToken, config.JWT.SECRET, (error, data) => {
            if (error || typeof data === "string") {
                res.status(400).json({ message: "Invalid token" });
            } else {
                req.user = {...data}
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = verifyToken