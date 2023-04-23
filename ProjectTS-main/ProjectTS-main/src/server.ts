import express, { Application, Request, Response} from 'express';
import {connect} from 'mongoose';
import {getAllUsers, getUserById, addUser, deleteUserById, updateUserById} from "./handlers/User";
import {addTask, getTaskById, getAllTasks, deleteTaskById, updateTaskById} from "./handlers/Tasks";

const port : number = 8080;
//const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Routes pour users
app.get('/users',  getAllUsers );
app.get('/users/:id', getUserById);
app.delete('/user/del/:id', deleteUserById);
app.post('/user/update/:id', updateUserById);
app.post('/users', addUser);

//Routes pour tasks
app.get('/tasks',  getAllTasks );
app.get('/tasks/:id', getTaskById);
app.delete('/tasks/del/:id', deleteTaskById);
app.put('/tasks/update/:id', updateTaskById);
app.post('/tasks', addTask);


const dbConnect = async ():Promise<void> =>{
    const uri : string = "mongodb+srv://thomasvessillertv:0qbiIRxzBMTMHCsV@cluster0.6avpr2z.mongodb.net/?retryWrites=true&w=majority"
    try {
        const cnx = await connect(uri);
        console.log('Mongo connecté')
    } catch (error){
        console.log(error);
    }
}


//Start server
app.listen(port,() => {
    //Connection base
    dbConnect();
    console.log('server listening on port', port);

});