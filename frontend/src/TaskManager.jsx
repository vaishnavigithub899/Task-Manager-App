import React, { useEffect, useState } from 'react';
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from 'react-icons/fa';
import {ToastContainer} from 'react-toastify';
import { notify } from './utils';
import { createTask, getAllTasks, deleteTaskById, updateTaskById } from './api';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTask, setCopyTask] = useState([])
    const [updateTask, setUpdateTask] = useState(null)

    const handleTask = (e)=>{
        e.preventDefault();
        if(updateTask && input){
            // update api call
            console.log('Update API call')
            const obj = {
                taskName : input, 
                isDone : updateTask.isDone,
                _id : updateTask._id
            }
            handleUpdateItem(obj);
        }else if(updateTask === null && input){
            //create api call
            console.log('create api call')
            handleAddTask()
        }
        setInput('')
    }

    useEffect(()=>{
        if(updateTask){
            setInput(updateTask.taskName);
        }
    },[updateTask])

    const handleAddTask = async()=>{
        const obj = {
            taskName: input, 
            isDone: false
        }
        try {
            const {success, message} = await createTask(obj);
            if(success){
                // show success toast msg
                notify(message, 'success')
            }else{
                notify(message, 'error')
            }
            fetchAllTask()
        } catch (error) {
            console.log(error);
            notify('Failed to create task', 'error')
        }
    }

    const fetchAllTask = async()=>{
        try {
            const {data} = await getAllTasks();
            setTasks(data);
            setCopyTask(data);
        } catch (error) {
            console.log(error);
            notify('Failed to create task', 'error')
        }
    }

    useEffect(()=>{
        fetchAllTask()
    },[])

    const handleDeleteTask = async(id)=>{
        try {
            const {success, message} = await deleteTaskById(id);
            if(success){
                // show success toast msg
                notify(message, 'success')
            }else{
                notify(message, 'error')
            }
            fetchAllTask()
        } catch (error) {
            console.log(error);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async(item)=>{
        const {_id, isDone, taskName} = item;
        const obj = {
            taskName, 
            isDone: !isDone
        }
        try {
            const {success, message} = await updateTaskById(_id, obj);
            if(success){
                // show success toast msg
                notify(message, 'success')
            }else{
                notify(message, 'error')
            }
            fetchAllTask()
        } catch (error) {
            console.log(error);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async(item)=>{
        const {_id, isDone, taskName} = item;
        const obj = {
            taskName, 
            isDone: isDone
        }
        try {
            const {success, message} = await updateTaskById(_id, obj);
            if(success){
                // show success toast msg
                notify(message, 'success')
            }else{
                notify(message, 'error')
            }
            setUpdateTask(null); 
            fetchAllTask()
        } catch (error) {
            console.log(error);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e)=>{
        const term = e.target.value.toLowerCase();
        const oldTask = [...copyTask];
        const result = oldTask.filter((item)=> item.taskName.toLowerCase().includes(term));
        setTasks(result);
    }

  return (
    <div className='container py-5'>
  <div className='row justify-content-center'>
    <div className='col-md-8 col-lg-6'>

      <div className='card shadow-lg rounded-4 border-0'>
        <div className='card-body'>

          <h2 className='text-center mb-4 text-primary fw-bold'>
            <FaPlus className='me-2' /> Task Manager
          </h2>

          {/* Input and Search */}
          <form onSubmit={handleTask} className='mb-4'>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control rounded-start-pill'
                placeholder='Add your task'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type='submit'
                className={`btn ${updateTask ? 'btn-warning' : 'btn-primary'} rounded-end-pill px-4`}>
                {updateTask ? 'Update' : 'Add'}
              </button>
            </div>

            <div className='input-group'>
              <span className='input-group-text bg-white border-end-0'>
                <FaSearch />
              </span>
              <input
                type='text'
                className='form-control border-start-0'
                placeholder='Search tasks...'
                onChange={handleSearch}
              />
            </div>
          </form>

          {/* Task List */}
          <div className='list-group'>
            {
              tasks.length === 0 ? (
                <p className='text-muted text-center'>No tasks found 🥺</p>
              ) : (
                tasks.map((item) => (
                  <div key={item._id}
                    className='list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm'>

                    <span className={`fw-medium ${item.isDone ? 'text-decoration-line-through text-secondary' : ''}`}>
                      {item.taskName}
                    </span>

                    <div className='btn-group'>
                      <button
                        onClick={() => handleCheckAndUncheck(item)}
                        className='btn btn-outline-success btn-sm'
                        title='Mark as done'>
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setUpdateTask(item)}
                        className='btn btn-outline-warning btn-sm'
                        title='Edit'>
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(item._id)}
                        className='btn btn-outline-danger btn-sm'
                        title='Delete'>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )
            }
          </div>

        </div>
      </div>

    </div>
  </div>

  <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
</div>
  )
}

export default TaskManager;