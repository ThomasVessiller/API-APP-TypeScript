// create Task
import {Request, Response} from "express";
import {ITask, Task} from "../models/Task";

const addTask = async (req: Request, res: Response):Promise<void>=> {
    console.log('BODY --- ', req.body);
    const task = new Task(req.body);
    try{
        await task.save();
    }catch (e){
        res.status(500).send("error")
    }

res.json(task);
}

// gerTaskById

const getTaskById = async (req: Request, res: Response):Promise<void> => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        task ? res.json(Task) : res.status(404).send
    } catch (e){
        res.status(500).send('error server');
    }

}

// deleteTaskById

const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id);
        task ? res.json(Task) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// updateTaskById

const updateTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const update = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, update, {new: true});
        task ? res.json(Task) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// getAllTasks

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (e) {
        res.status(500).send('error server');
    }
};

export {addTask, getTaskById, getAllTasks,deleteTaskById,updateTaskById}