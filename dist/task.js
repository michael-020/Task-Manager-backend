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
const express_1 = require("express");
const prisma_1 = __importDefault(require("./prisma"));
const taskRouter = (0, express_1.Router)();
// Create a new task with title, description, and dueDate
taskRouter.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate } = req.body;
        const projectId = req.params.id;
        const project = yield prisma_1.default.project.findFirst({
            where: {
                id: parseInt(projectId)
            }
        });
        if (!project) {
            res.status(400).json({
                msg: "project not found"
            });
            return;
        }
        const task = yield prisma_1.default.task.create({
            data: {
                title,
                description,
                dueDate,
                projectId: project.id
            }
        });
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error while creating a task", error);
        res.status(500).json({
            msg: "Error while creating a task"
        });
    }
}));
// Fetch details of a single task, including its project and assignee
taskRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield prisma_1.default.task.findFirst({
            where: {
                id: parseInt(taskId)
            }
        });
        if (!task) {
            res.status(401).json({
                msg: "task not found"
            });
            return;
        }
        const project = yield prisma_1.default.project.findFirst({
            where: {
                id: task.projectId
            }
        });
        if (!project) {
            res.status(400).json({
                msg: "project not found"
            });
            return;
        }
        const owner = yield prisma_1.default.user.findFirst({
            where: {
                id: project.ownerId
            }
        });
        if (!owner) {
            res.status(401).json({
                msg: "owner not found"
            });
            return;
        }
        res.status(400).json({
            task: task.title,
            description: task.description,
            project: project.title,
            assignee: owner.username
        });
    }
    catch (error) {
        console.error("Error while getting a task", error);
        res.status(500).json({
            msg: "Error while getting a task"
        });
    }
}));
// Update the task’s title, description, status, or dueDate
taskRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error("Error while updating a task", error);
        res.status(500).json({
            msg: "Error while updating a task"
        });
    }
}));
// Delete a task
taskRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error("Error while deleting a task", error);
        res.status(500).json({
            msg: "Error while deleting a task"
        });
    }
}));
exports.default = taskRouter;
