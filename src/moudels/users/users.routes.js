import { Router } from "express";
import { errorHandler } from "../../middlewares/error-handling.middleware.js";
import * as usersControllers from "./users.controllers.js"

const usersRouter = Router();

usersRouter.post('/add',
    errorHandler(usersControllers.addUser)
)
usersRouter.post('/login',
    errorHandler(usersControllers.signIn)
)

 
export default usersRouter