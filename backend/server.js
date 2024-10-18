import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import UserRouter from './routes/user.routes.js'
import RoleRouter from './routes/role.routes.js'
import connectDB from './config/db.js'


const app = express()
dotenv.config()

/** configuring env */
const port       = process.env.PORT || 8080
const mode       = process.env.MODE
const client_url = process.env.CLIENT_URL

/** Mongodb connection */
connectDB()
.then((val)=>{
    console.log(`Mongodb is connected ${val}`.bgGreen.white)
    app.listen(port, ()=>{
        console.log(`Server is running in ${mode} environment at ${port}`.bgCyan.white)
    });
})
.catch((err)=>{
    console.log(`Mongodb failed to connect ${err}`.bgRed.white)
})

/** Sample server */
app.get("/", (req, res)=>{
    res.send("<h1>This backend for user menu management system<h1>")
});

/** CORS options */
const option = cors({
    origin     : client_url,
    method     : ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus:200
});

/** Initializing packages */
app.use(cors(option))
app.use(express.json())
app.use(morgan("dev"))

/** Root level routes */
app.use('/api/user', UserRouter)
app.use('/api/role', RoleRouter)

