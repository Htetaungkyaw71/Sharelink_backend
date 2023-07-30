import {Router} from "express";

const router = Router()

router.get('/user/:id',(req,res)=>{})
router.delete('/user/:id',(req,res)=>{})
router.put('/user/:id',(req,res)=>{})


router.get('/links',(req,res)=>{
    res.status(200)
    res.json({message:"links"})
})
router.post('/links',(req,res)=>{})
router.put('/links/:id',(req,res)=>{})

router.get('/preview',(req,res)=>{})

export default router