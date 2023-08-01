import prisma from "../../db";
import { comparepassword, createJWT, hashpassword } from "../modules/auth";

export const createNewUser = async (req,res,next) => {
    try {
        let user = await prisma.user.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                password:await hashpassword(req.body.password)
            }
        })
    
        const token = createJWT(user)
        res.json({token,user})
    } catch (error) {
        error.type = "input"
        next(error)
    }


}

export const updateUser = async (req,res) => {
    const updatedUser = await prisma.user.update({
        where:{
            id:req.params.id
        },
        data:{
            name:req.body.name,
            email:req.body.email
        }
    })
    res.json({data:updatedUser})
}

export const getUser = async (req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            id:req.params.id
        }
    })
    res.json({data:user})
}

export const deleteUser = async (req,res) => {
    const deleteduser = await prisma.user.delete({
        where:{
            id:req.params.id
        }
    })
    res.json({data:deleteduser})
}


export const signin = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })

    if(!user){
        res.status(401)
        res.json({message:"Email is not exists"})
        return
    }

    const payload = await comparepassword(req.body.password,user.password)

    if(!payload){
        res.status(401)
        res.json({message:"Wrong password"})
        return
    }

    const token = createJWT(user)
    res.json({token,user})

} 