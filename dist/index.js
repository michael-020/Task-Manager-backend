"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const project_1 = __importDefault(require("./project"));
const task_1 = __importDefault(require("./task"));
const config_1 = require("./config");
dotenv_1.default.config();
console.log(config_1.JWT_SECRET);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_1.default);
app.use("/project", project_1.default);
app.use("/task", task_1.default);
app.listen(3000);
