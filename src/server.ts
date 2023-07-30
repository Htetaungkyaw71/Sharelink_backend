import express from "express"
import router from "./routers"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.status(200)
    res.json({message:"hello world"})
})

app.use('/api',router)

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
})