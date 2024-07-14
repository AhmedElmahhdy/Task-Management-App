import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { errorHandler } from "../../middlewares/error-handling.middleware.js";
import * as categoriesControllers from "./categories.controllers.js"

const categoriesRouter = Router();

categoriesRouter.post('/create',
   authenticate,
   errorHandler(categoriesControllers.createCategory)   
)

categoriesRouter.get('/get',
    authenticate,
    errorHandler(categoriesControllers.getCategories)
)

categoriesRouter.put('/update/:id',
    authenticate,
    errorHandler(categoriesControllers.updateCategory)
)

categoriesRouter.delete('/delete/:id',
    authenticate,
   errorHandler(categoriesControllers.deleteCategory)
)

export default categoriesRouter