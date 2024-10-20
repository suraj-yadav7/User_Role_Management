import express from 'express'
import { userCreation, userDelete, userFetch, userLogin, userUpdate } from '../controllers/user.controller.js';


const UserRouter = express.Router()

UserRouter.post('/create',           userCreation)
UserRouter.post('/login',              userLogin)
UserRouter.get('/fetch/:userID',       userFetch)
UserRouter.put('/update/:userID',      userUpdate)
UserRouter.delete('/delete/:userID',   userDelete)


export default UserRouter;
