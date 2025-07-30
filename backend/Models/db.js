const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Not Connected",err);
})