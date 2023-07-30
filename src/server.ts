import express from "express"
import router from "./routers"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { protect } from "./modules/auth"
import { createNewUser, signin } from "./handlers/user"

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.get("/",(req,res)=>{
    res.status(200)
    res.json({message:"hello world"})
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
})