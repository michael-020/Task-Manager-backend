import dotenv from "dotenv"
import express, { Express } from "express"
import userRouter from "./user"
import projectRouter from "./project"
import taskRouter from "./task"
import { JWT_SECRET } from "./config"

dotenv.config()

console.log(JWT_SECRET)

const app: Express = express()

app.use(express.json())

app.use("/user", userRouter)
app.use("/project", projectRouter)
app.use("/task", taskRouter)

app.listen(3000)