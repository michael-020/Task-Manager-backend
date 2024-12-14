"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const express_1 = require("express");
const generateToken_1 = require("./utils/generateToken");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield prisma_1.default.user.create({
            data: { username, email, password }
        });
        (0, generateToken_1.generateToken)(user.id, res);
        res.status(200).json({
            id: user.id,
            username,
            email,
            createdAt: user.createdAt
        });
    }
    catch (error) {
        console.error("Error while signin up", error);
        res.status(500).json({
            msg: "error while signing up",
            error: error
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield prisma_1.default.user.findFirst({
            where: {
                username,
                email,
                password
            }
        });
        if (!user) {
            res.status(401).json({
                msg: "user not found"
            });
            return;
        }
        (0, generateToken_1.generateToken)(user.id, res);
        res.status(200).json({
            id: user.id,
            username,
            email,
            createdAt: user.createdAt
        });
    }
    catch (error) {
        console.error("Error while signin in", error);
        res.status(500).json({
            msg: "error while signing in",
            error: error
        });
    }
}));
userRouter.post("/logout", (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            msg: "Logged out successfully"
        });
    }
    catch (error) {
        console.error("Error while logging out", error);
        res.status(500).json({
            msg: "error while logging out",
            error: error
        });
    }
});
exports.default = userRouter;
