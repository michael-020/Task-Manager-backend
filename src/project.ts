import { Router, Request, Response } from "express";
import prisma from "./prisma";

const projectRouter = Router()

// Create a new project with title and description
projectRouter.post("/", async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        const ownerId = req.user.id

        const owner = await prisma.user.findFirst({
            where: {
                id: ownerId
            }
        })

        if(!owner){
            res.status(400).json({
                "msg": "owner not found"
            })
            return
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                ownerId: ownerId
            }
        })

        res.status(200).json(project)

    } catch (error) {
        console.error("Error while creating a project", error)
        res.status(500).json({
            msg: "Error while creating a project"
        })
    }
})

// get all projects
projectRouter.get("/", async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                ownerId: req.user.id
            }
        })

        if(!projects){
            res.status(401).json({
                msg: "Projects not found"
            })
        }

        res.status(200).json(projects)

    } catch (error) {
        console.error("Error while getting projects", error)
        res.status(500).json({
            msg: "Error while getting projects"
        })
    }
})

// update title or description of project
projectRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const projectId = req.params.id
        const { title, description } = req.body

        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(projectId)
            }
        })

        if(!project){
            res.status(400).json({
                msg: "project not found"
            })
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: parseInt(projectId)
            },
            data: {
                title,
                description
            }
        })

        res.status(200).json(updatedProject)

    } catch (error) {
        console.error("Error while updating projects", error)
        res.status(500).json({
            msg: "Error while updating projects"
        })
    }
})

// Delete a project and all its associated tasks
projectRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const projectId = req.params.id

        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(projectId)
            }
        })

        if(!project){
            res.status(400).json({
                msg: "project not found"
            })
        }

        await prisma.project.delete({
            where: {
                id: parseInt(projectId)
            }
        })

        res.status(200).json({
            msg: "project deleted successfully"
        })
        
    } catch (error) {
        console.error("Error while deleting projects", error)
        res.status(500).json({
            msg: "Error while deleting projects"
        })
    }
})

export default projectRouter;