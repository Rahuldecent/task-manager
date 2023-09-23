const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://rahulkumar:A8K4HFFnpjfeY3Pl@cluster0.pchlfj0.mongodb.net/task_Management',{useNewUrlParser:true}).then(() => console.log('Mongodb is Connected')).catch((err) => console.log(err));
app.use('/',routes);
app.listen(3000,()=> {
    console.log("Express app running on port 3000")
});
