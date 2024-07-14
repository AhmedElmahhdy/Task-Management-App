import express from "express";
import connectDB from "./db/dbconnection.js";
import categoriesRouter from "./src/moudels/categories/categories.routes.js";
import taskRouter from "./src/moudels/tasks/tasks.routes.js";
import usersRouter from "./src/moudels/users/users.routes.js";
import { globaleResponse } from "./src/middlewares/error-handling.middleware.js";

const app = express();
const port = 3000;

connectDB() 

app.use(express.json());

app.use("/categories",categoriesRouter)
app.use("/tasks",taskRouter)
app.use("/user",usersRouter)


app.use(globaleResponse)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})