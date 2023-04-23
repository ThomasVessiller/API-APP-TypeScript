// create user
import {Request, Response} from "express";
import {IUser, User} from "../models/User";

const addUser = async (req: Request, res: Response):Promise<void>=> {
    console.log('BODY --- ', req.body);
    const user = new User(req.body);
    try{
        await user.save();
    }catch (e){
        res.status(500).send("error")
    }

res.json(user);
}

// gerUserById

const getUserById = async (req: Request, res: Response):Promise<void> => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        user ? res.json(user) : res.status(404).send
    } catch (e){
        res.status(500).send('error server');
    }

}

// deleteUserById

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        user ? res.json(user) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// updateUserById

const updateUserById = async (req: Request, res: Response): Promise<void> => {
    console.log(req);
    const id = req.params.id;
    const update = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, update, {new: true});
        user ? res.json(user) : res.status(404).send();
    } catch (e) {
        console.log(e);
        res.status(500).send('error server');
    }
};

// getAllUsers

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).send('error server');
    }
};

export {addUser, getUserById, getAllUsers, deleteUserById, updateUserById}