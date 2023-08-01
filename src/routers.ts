import {Router} from "express";
import {body} from "express-validator"
import { validateInput } from "./modules/middleware";
import { createLink, deleteLink, getAllLinks, updateLink } from "./handlers/link";
import { deleteUser, getUser, updateUser } from "./handlers/user";

const router = Router()



router.get('/links',getAllLinks)

router.post('/links',
    body('platform').exists().isString(),
    body('url').optional().isString(),
    validateInput,
    createLink)

router.put('/links/:id',
    body('platform').exists().isString(),
    body('url').exists().isString(),
    validateInput,
updateLink)

router.delete('/links/:id',deleteLink)



export default router