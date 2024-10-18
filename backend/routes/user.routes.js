import express from 'express'
import { userCreation, userDelete, userFetch, userLogin, userUpdate } from '../controllers.js/user.controller';


const UserRouter = express.Router()

UserRouter.post('/user-creation',           userCreation)
UserRouter.post('/user-login',              userLogin)
UserRouter.get('/user-fetch/:userID',       userFetch)
UserRouter.put('/user-update/:userID',      userUpdate)
UserRouter.delete('/user-delete/:userID',   userDelete)


export default UserRouter;
