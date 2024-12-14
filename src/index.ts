import express, { Express } from "express"
import userRouter from "./user"
import projectRouter from "./project"
import taskRouter from "./task"

const app: Express = express()

app.use(express.json())

app.use("/user", userRouter)
app.use("/project", projectRouter)
app.use("/task", taskRouter)