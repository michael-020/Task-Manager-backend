import prisma from "./prisma";
import { Router, Request, Response } from "express";
import { generateToken } from "./utils/generateToken";

const userRouter = Router()

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const user = await prisma.user.create({
            data : {username, email, password}
        })

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            username,
            email,
            createdAt: user.createdAt
        })

    } catch (error) {
        console.error("Error while signin up", error)
        res.status(500).json({
            msg: "error while signing up",
            error: error
        })
    }
})

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        
        const user = await prisma.user.findFirst({
            where: {
                username,
                email,
                password
            }
        })
        if(!user){
            res.status(401).json({
                msg: "user not found"
            })
            return
        }

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            username,
            email,
            createdAt: user.createdAt
        })

    } catch (error) {
        console.error("Error while signin in", error)
        res.status(500).json({
            msg: "error while signing in",
            error: error
        })
    }
})

userRouter.post("/logout", (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})

        res.status(200).json({
            msg: "Logged out successfully"
        })
    } catch (error) {
        console.error("Error while logging out", error)
        res.status(500).json({
            msg: "error while logging out",
            error: error
        })
    }
})

export default userRouter;