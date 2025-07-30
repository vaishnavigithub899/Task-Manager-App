const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
const taskRouter = require('./Routes/taskRouter.js');
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res)=>{
    res.send('Hello From server');
})

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})