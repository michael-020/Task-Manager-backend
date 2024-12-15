import { Router, Request, Response } from "express";

const taskRouter = Router()

// Create a new task with title, description, status, and dueDate
taskRouter.post("/tasks", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
})

// Fetch details of a single task, including its project and assignee
taskRouter.get("/tasks/:id", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
})

// Update the task’s title, description, status, or dueDate
taskRouter.put("/tasks/:id", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
})

// Delete a task
taskRouter.delete("/tasks/:id", async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
})

export default taskRouter;