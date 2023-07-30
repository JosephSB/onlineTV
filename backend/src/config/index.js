const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const ROOT =  path.join(__dirname, '../../');;

const config = {
    PORT: process.env.PORT || 4000,
    ffmpeg: path.join(ROOT, "../" ,"/ffmpeg-6.0-full_build/bin/ffmpeg"),
    JWT: {
        SECRET: process.env.JWT_SECRET || "secreto",
    },
    RTMP:{
        PORT: process.env.RTMP_PORT || 5000,
        API: {
            pass: process.env.RTMP_API_PASS || "123456",
            user: process.env.RTMP_API_USER || "admin"
        }
    },
    DB: {
        HOST: process.env.DB_HOST || "localhost",
        USER: process.env.DB_USER || "root",
        PASSWORD: process.env.DB_PASS || "",
        NAME: process.env.DB_NAME || "onlinetv",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
}

module.exports = config