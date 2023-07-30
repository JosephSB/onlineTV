const { uuid } = require('uuidv4');
const bcrypt = require("bcryptjs");
const ValidateUtil = require("../utils/validate.utils");
const db = require("../libs/sequelize.lib");
const ExecuteRawQuery = db.sequelize;
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthController = () => { }

AuthController.Register = async (req, res) => {
    try {
        const data = req.body;

        if (!data.fullname || data.fullname === "") throw new Error("Invalid fullname")
        if (!data.password || data.password === "") throw new Error("Invalid password")
        if (!ValidateUtil.isEmail(data.email)) throw new Error("Invalid Email")

        const newUser = {
            user_id: uuid(),
            fullname: data.fullname ? data.fullname : "",
            email: data.email ? data.email : "",
            password: data.password ? data.password : ""
        }

        const hashedPassword = await bcrypt.hash(newUser.password, 8);
        newUser.password = hashedPassword;

        const query = `
            INSERT INTO users (user_id,fullname,email,password) 
            VALUES ($1,$2,$3,$4); 
        `

        await ExecuteRawQuery.query(query, {
            bind: [newUser.user_id, newUser.fullname, newUser.email, newUser.password],
        });

        res.status(200).send({
            message: `USER WITH ID ${newUser.user_id} CREATED`,
            data: newUser
        })
    } catch (error) {
        console.error(error)
        res.status(404).send({
            message: "error"
        })
    }
}

AuthController.Login = async (req, res) => {
    try {
        const data = req.body;

        const query = `
            SELECT * FROM users WHERE email = $1 AND delete_time IS NULL
        `

        const resp = await ExecuteRawQuery.query(query, {
            bind: [data.email],
        });

        if (resp[0].length <= 0) throw new Error("Email not exist");
        const user = resp[0][0];

        const isTruePassword = await bcrypt.compare(data.password, user.password);
        if (!isTruePassword) throw new Error("Invalid user");

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, config.JWT.SECRET, { expiresIn: '7d' });

        res.status(200).send({
            message: "ok",
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(404).send({
            message: "error"
        })
    }
}

module.exports = AuthController