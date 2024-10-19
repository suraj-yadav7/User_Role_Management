import express from 'express'
import { roleCreation, roleDelete, roleFetchById, rolesFetch, roleUpdate } from "../controllers/role.controller.js";

const RoleRouter = express.Router()

RoleRouter.post('/creation',          roleCreation)
RoleRouter.get('/fetch',              rolesFetch)
RoleRouter.get('/fetch/:roleID',      roleFetchById)
RoleRouter.put('/update/:roleID',     roleUpdate)
RoleRouter.delete('/delete/:roleID',  roleDelete)

export default RoleRouter;