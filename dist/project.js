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
const projectRouter = (0, express_1.Router)();
// Create a new project with title and description
projectRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const ownerId = req.user.id;
        const owner = yield prisma_1.default.user.findFirst({
            where: {
                id: ownerId
            }
        });
        if (!owner) {
            res.status(400).json({
                "msg": "owner not found"
            });
            return;
        }
        const project = yield prisma_1.default.project.create({
            data: {
                title,
                description,
                ownerId: ownerId
            }
        });
        res.status(200).json(project);
    }
    catch (error) {
        console.error("Error while creating a project", error);
        res.status(500).json({
            msg: "Error while creating a project"
        });
    }
}));
// get all projects
projectRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.project.findMany({
            where: {
                ownerId: req.user.id
            }
        });
        if (!projects) {
            res.status(401).json({
                msg: "Projects not found"
            });
        }
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Error while getting projects", error);
        res.status(500).json({
            msg: "Error while getting projects"
        });
    }
}));
// update title or description of project
projectRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const { title, description } = req.body;
        const project = yield prisma_1.default.project.findFirst({
            where: {
                id: parseInt(projectId)
            }
        });
        if (!project) {
            res.status(400).json({
                msg: "project not found"
            });
        }
        const updatedProject = yield prisma_1.default.project.update({
            where: {
                id: parseInt(projectId)
            },
            data: {
                title,
                description
            }
        });
        res.status(200).json(updatedProject);
    }
    catch (error) {
        console.error("Error while updating projects", error);
        res.status(500).json({
            msg: "Error while updating projects"
        });
    }
}));
// Delete a project and all its associated tasks
projectRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        }
        yield prisma_1.default.project.delete({
            where: {
                id: parseInt(projectId)
            }
        });
        res.status(200).json({
            msg: "project deleted successfully"
        });
    }
    catch (error) {
        console.error("Error while deleting projects", error);
        res.status(500).json({
            msg: "Error while deleting projects"
        });
    }
}));
exports.default = projectRouter;
