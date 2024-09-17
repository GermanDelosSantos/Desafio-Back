import 'dotenv/config'

export default {
    MONGO_URL: process.env.MONGO_URL ,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    PERSISTENCE: process.env.PERSISTENCE,
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT,
}