import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export const createJWT = (user) =>{
    const token = jwt.sign({
        id:user.id,email:user.email
    },process.env.JWT_SECRET)
    return token
}

export const comparepassword = (password,hash) =>{
    return bcrypt.compare(password,hash)
}

export const hashpassword = (password) =>{
    return bcrypt.hash(password,4)
}

export const protect = async(req,res,next) => {
    let bearer = req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({message:"No bearer"})
        return
    }

    let [,token] = bearer.split(" ")
    if(!token){
        res.status(401)
        res.json({message:"No token"})
        return
    }

    try {
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user = user
        next() 
        return;
    } catch (error) {
        console.error(error)
        res.status(401)
        res.json({message:"Invalid token"})
        return;
    }

}