const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/taskController');

const router = require('express').Router();

// To get all the task
router.get('/',fetchAllTasks);

// To create a task
router.post('/', createTask);

// To update a task
router.put('/:id', updateTaskById);

// To delete a task
router.delete('/:id', deleteTaskById);

module.exports = router;