import express from "express"
import router from "./routers"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { protect } from "./modules/auth"
import { createNewUser, deleteUser, getPreview, getUser, signin, updateUser,updateImage } from "./handlers/user"
import cors from "cors"
import { validateInput } from "./modules/middleware"
import { body } from "express-validator"
import config from "./config"



dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)
app.get('/preview/:name',getPreview)
app.get('/user/:id',getUser)
app.put('/user/image/:id',updateImage)

app.delete('/user/:id',deleteUser)

app.put('/user/:id', 
body('name').exists().isString(),
body('email').exists().isString(),
validateInput,updateUser)


app.use((err,req,res,next)=>{
    if(err.type === 'auth'){
        res.status(401).json({message:"unauthorized"})
    }else if(err.type === 'input'){
        res.status(400).json({message:"Email is already exists"})
    }else{
        console.log(err)
        res.status(500).json({message:"Ooops there was an error"})
    }
})

app.listen(config.port,()=>{
    console.log(`Server is running on http://localhost:${config.port}`)
})