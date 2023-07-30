import prisma from "../../db";
import { comparepassword, createJWT, hashpassword } from "../modules/auth";

export const createNewUser = async (req,res) => {
    let user = await prisma.user.create({
        data:{
            name:req.body.name,
            email:req.body.email,
            password:await hashpassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})

}


export const signin = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })

    const payload = await comparepassword(req.body.password,user.password)

    if(!payload){
        res.status(401)
        res.json({message:"Wrong password"})
        return
    }

    const token = createJWT(user)
    res.json({token})

} 