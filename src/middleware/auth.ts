import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import prisma from "../prisma";

interface customDecodedInterface{
    userId: number
}

export async function authUser (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.jwt

        if(!token){
            res.status(500).json({
                msg: "token not found"
            })
            return
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        if(!decoded) {
            res.status(401).json({
                msg: "unauthorized user"
            })
            return
        }

        const user = await prisma.user.findFirst({
            omit: {
                password: true
            },
            where: {
                id: (decoded as customDecodedInterface).userId
            }
        })

        if(!user){
            res.status(401).json({
                msg: "user not found"
            })
            return
        }

        req.user = user

        next()
    } catch (error) {
        
    }
}