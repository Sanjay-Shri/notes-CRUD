import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './db/db.js'
import authRouter from "./routes/auth.js"
import noteRouter from "./routes/note.js"


const app = express()
dotenv.config()

const PORT = process.env.PORT
// use middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)

app.listen(PORT,()=>{
    connectToDB()
    console.log(`server is running localhost:${PORT}`)
})