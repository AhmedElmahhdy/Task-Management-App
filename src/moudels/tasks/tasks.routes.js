import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { errorHandler } from "../../middlewares/error-handling.middleware.js";
import * as tasksControllers from "./tasks.controllers.js"

const taskRouter = Router();

taskRouter.post('/create/:id',
    authenticate,
    errorHandler(tasksControllers.createTask)
)

taskRouter.get('/get',
    authenticate,
    errorHandler(tasksControllers.getPrivateTasks)
)

taskRouter.delete('/delete/:id',
    authenticate,
   errorHandler(tasksControllers.deleteTask)
)
taskRouter.put('/update/:id',
    authenticate,
    errorHandler(tasksControllers.updateTask)
)

taskRouter.get("/filter",
    authenticate,
 
    errorHandler(tasksControllers.filterTasks)
)

export default taskRouter