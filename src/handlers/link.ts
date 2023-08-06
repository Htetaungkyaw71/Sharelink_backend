import prisma from "../../db";


// get All
export const getAllLinks = async(req,res)=>{
    const links = await prisma.user.findUnique({
        where:{
            id:req.user.id,
        },
        include:{
            links:true
        }
    })
    res.json({data:links})
}


// create link
export const createLink = async(req,res,next)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.id
            }
        })
        if(!user){
            res.status(400)
            res.json({messgae:"user is not found"})
        }
        const link = await prisma.link.create({
            data:{
                platform:req.body.platform,
                url:req.body.url,
                belongToId:user.id
            }
        })
        res.json({data:link})
    } catch (error) {
        next(error)
    }
   
}

// update link
export const updateLink = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })

    if(!user){
        res.status(400)
        res.json({messgae:"user is not found"})
    }

    const updatedlink = await prisma.link.update({
        where:{
            id_belongToId :{
                id:req.params.id,
                belongToId:user.id
            }   
        },
        data:{
            platform:req.body.platform,
            url:req.body.url,
        }
    })
    res.json({data:updatedlink})
}

// delete link
export const deleteLink = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })

    if(!user){
        res.status(400)
        res.json({messgae:"user is not found"})
    }
    const deletedlink = await prisma.link.delete({
        where:{
            id_belongToId :{
                id:req.params.id,
                belongToId:user.id
            }   
        },
    })
    res.json({data:deletedlink})
}