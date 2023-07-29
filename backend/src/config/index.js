const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const ROOT =  path.join(__dirname, '../../');;

const config = {
    PORT: process.env.PORT || 5000,
    ffmpeg: path.join(ROOT, "../" ,"/ffmpeg-6.0-full_build/bin/ffmpeg")
}

module.exports = config