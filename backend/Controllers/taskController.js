const taskModel = require("../Models/taskModel");

const createTask = async(req, res)=>{
    const data = req.body;
    try {
        const model = new taskModel(data);
        await model.save();
        res.status(201).json({message:"Task is created", success:true});
        
    } catch (error) {
        res.status(500).json({message: "Failed to execute", success: false});
    }
}

const fetchAllTasks = async(req, res)=>{
    try {
        const data = await taskModel.find({})
        res.status(200).json({message:"All tasks listed", success:true, data});
        
    } catch (error) {
        res.status(500).json({message: "Failed to display all task", success: false});
    }
}

const updateTaskById = async(req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = {$set: {...body}};
        await taskModel.findByIdAndUpdate(id, obj)
        res.status(200).json({message:"Task Updated", success:true});
        
    } catch (error) {
        res.status(500).json({message: "Failed to update task", success: false});
    }
}

const deleteTaskById = async(req, res)=>{
    try {
        const id = req.params.id;
        await taskModel.findByIdAndDelete(id);
        res.status(200).json({message:"Task deleted", success:true});
        
    } catch (error) {
        res.status(500).json({message: "Failed to delete task", success: false});
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}