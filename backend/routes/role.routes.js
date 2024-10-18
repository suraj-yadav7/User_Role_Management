import express from 'express'
import { roleCreation, roleDelete, roleFetchById, rolesFetch, roleUpdate } from '../controllers.js/role.controller';

const RoleRouter = express.Router()

RoleRouter.post('/role-creation',        roleCreation)
RoleRouter.post('/role-fetch',           rolesFetch)
RoleRouter.post('/role-fetch/:roleID',   roleFetchById)
RoleRouter.post('/role-update/:roleID',  roleUpdate)
RoleRouter.post('/role-delete/:roleID',  roleDelete)

export default RoleRouter;