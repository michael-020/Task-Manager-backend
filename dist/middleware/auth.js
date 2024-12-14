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
exports.authUser = authUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma_1 = __importDefault(require("../prisma"));
function authUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                res.status(500).json({
                    msg: "token not found"
                });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            if (!decoded) {
                res.status(401).json({
                    msg: "unauthorized user"
                });
                return;
            }
            const user = yield prisma_1.default.user.findFirst({
                omit: {
                    password: true
                },
                where: {
                    id: decoded.userId
                }
            });
            if (!user) {
                res.status(401).json({
                    msg: "user not found"
                });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
        }
    });
}
