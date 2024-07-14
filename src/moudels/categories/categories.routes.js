import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { errorHandler } from "../../middlewares/error-handling.middleware.js";
import * as categoriesControllers from "./categories.controllers.js"

const categoriesRouter = Router();

categoriesRouter.post('/create',
    errorHandler(authenticate),
   errorHandler(categoriesControllers.createCategory)   
)

categoriesRouter.get('/get',
    errorHandler(authenticate),
    errorHandler(categoriesControllers.getCategories)
)

categoriesRouter.put('/update/:id',
    errorHandler(authenticate),
    errorHandler(categoriesControllers.updateCategory)
)

categoriesRouter.delete('/delete/:id',
    errorHandler(authenticate),
   errorHandler(categoriesControllers.deleteCategory)
)

export default categoriesRouter