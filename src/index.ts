import dotenv from "dotenv"
import express, { Express } from "express"
import userRouter from "./user"
import projectRouter from "./project"
import taskRouter from "./task"
import { authUser } from "./middleware/auth"
import cookieParser from "cookie-parser"

dotenv.config()

const app: Express = express()

app.use(cookieParser())
app.use(express.json())

app.use("/user", userRouter)
app.use("/project", authUser, projectRouter)
app.use("/task", authUser, taskRouter)

app.listen(3000)