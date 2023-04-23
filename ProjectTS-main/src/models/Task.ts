import {Schema , Model , model} from "mongoose";

interface ITask{
    id : string;
    name : string;
    status : string;
}

const TaskSchema = new Schema<ITask>({
    name : {
        type : String
    },
    id : {
        type : String
    },
    status : {
        type : String
    }
});

const Task : Model<ITask> = model('Task',TaskSchema);

export {Task, ITask}