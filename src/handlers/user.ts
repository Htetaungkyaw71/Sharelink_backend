import prisma from "../db";
import { comparepassword, createJWT, hashpassword } from "../modules/auth";

const receiveImage = require('../modules/multerMiddleware');
const { uploadImage } = require('../modules/cloudinaryUtils')


export const createNewUser = async (req,res,next) => {

    try {
        let name = await prisma.user.findFirst({
            where:{
                name:req.body.name
            }
        })
        if(name){
            res.status(400)
            res.json({message:"Name is already exists"})
            return
        }
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


export const updateUser = async (req,res,next) => {
    try {
        let name = await prisma.user.findFirst({
            where:{
                name:req.body.name
            }
        })
        if(name){
            res.status(400)
            res.json({message:"Name is already exists"})
            return
        }
       

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
    } catch (error) {
        error.type = "input"
        next(error)
    }
    
}


export const updateImage = (req,res)=>{
    receiveImage(req, res, async (err) => {
        if (err) {
            return res.json({ error: err.message });
        }

        try {
            const imageStream = req.file.buffer;
            const imageName = new Date().getTime().toString();
    
            const uploadResult = await uploadImage(imageStream, imageName);
    
            const uploadedUrl = uploadResult.url;
            const updatedImg = await prisma.user.update({
                where:{
                    id:req.params.id
                },
                data:{
                    img_url:uploadedUrl
                }
            })
            res.json({data:updatedImg})
        } catch (error) {
            console.log("Backend Error:", error)
            return res.json({ error: 'Failed to upload' });
        }
        
    })
   

}


export const getUser = async (req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            id:req.params.id
        }
    })
    res.json({data:user})
}


export const getPreview = async(req,res)=>{
    const user = await prisma.user.findFirst({
        where:{
            name:req.params.name,
        },
        include:{
            links:true
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