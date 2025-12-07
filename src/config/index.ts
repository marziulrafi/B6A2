import dotenv from "dotenv"

dotenv.config()

const config = {
    connection_string: process.env.CONNECTION,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET
}

export default config