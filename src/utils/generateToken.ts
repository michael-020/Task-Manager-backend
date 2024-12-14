import { Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export function generateToken(userId: number, res: Response){
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })

    return token;
}