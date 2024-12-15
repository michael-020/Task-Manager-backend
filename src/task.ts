import { Router, Request, Response } from "express";
import prisma from "./prisma";

const taskRouter = Router()

// Create a new task with title, description, and dueDate
taskRouter.post("/:id", async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate } = req.body

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
            return
        }

        const task = await prisma.task.create({
            data: {
                title, 
                description,
                dueDate,
                projectId: project.id
            }
        })

        res.status(200).json(task)

    } catch (error) {
        console.error("Error while creating a task", error)
        res.status(500).json({
            msg: "Error while creating a task"
        })
    }
})

// Fetch details of a single task, including its project and assignee
taskRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id 

        const task = await prisma.task.findFirst({
            where: {
                id: parseInt(taskId)
            }
        })

        if(!task){
            res.status(401).json({
                msg: "task not found"
            })
            return
        }

        const project = await prisma.project.findFirst({
            where: {
                id: task.projectId
            }
        })
        if(!project){
            res.status(400).json({
                msg: "project not found"
            })
            return
        }

        const owner = await prisma.user.findFirst({
            where:{
                id: project.ownerId
            }
        })
        if(!owner){
            res.status(401).json({
                msg: "owner not found"
            })
            return
        }

        res.status(400).json({
            task: task.title,
            description: task.description,
            project: project.title,
            assignee: owner.username
        })

    } catch (error) {
        console.error("Error while getting a task", error)
        res.status(500).json({
            msg: "Error while getting a task"
        })
    }
})

// Update the task’s title, description, status, or dueDate
taskRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error("Error while updating a task", error)
        res.status(500).json({
            msg: "Error while updating a task"
        })
    }
})

// Delete a task
taskRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error("Error while deleting a task", error)
        res.status(500).json({
            msg: "Error while deleting a task"
        })
    }
})

export default taskRouter;