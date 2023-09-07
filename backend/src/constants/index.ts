import { config } from 'dotenv'
config()


module.exports = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    SERVER_URL: process.env.SERVER_URL,
    SECRET: process.env.SECRET,


    EMAIL_HOST: process.env.EMAIL_HOST,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    SERVICE: process.env.SERVICE,
    APP_PASSWORD: process.env.APP_PASSWORD,
}