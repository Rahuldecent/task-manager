const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const { isValid, isValidRequestBody, isValidObjectId } = require('../validator/validate');

//===============================task creation=============================================
exports.createTask = async (req, res) => {
    try {
        const data = req.body;
        let { title, description, status, dueDate, userId } = data
        if (isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide task Details" });
        }
        if (!isValid(title)) {
            return res.status(400).send({
                status: false,
                message: "Please provide a Title or a Valid title",
            });
        }
        const findTask = await taskModel.findOne({title})
        if(findTask) {
            return res.status(400).send({status:false,msg:"Task already exist"})
        }
        if(!description)
            return res.status(400).send({
                status: false,
                message: "Please provide a descriptionor a Valid description",
            });
        
        if (!isValid(status)) {
            return res.status(400).send({
                status: false,
                message: "Please provide a status or a Valid status",
            });
        }
        if (!isValid(dueDate)) {
            return res.status(400).send({
                status: false,
                message: "Please provide dueDate",
            });
        }
        const task = await taskModel.create(data)
        return res.status(201).send({ status: true, msg: "task successfully created", data: task })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
        console.log(err)
    }
}


// =======================================get task by id ===============================

exports.getTask = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({ status: false, msg: 'please enter userId' })
        }
        if (!isValidObjectId(id)) {
            return res.status(400).send({ status: false, Msg: "please enter valid id" })
        }

        const task = await taskModel.find({ userId: id })
        if (!task) {
            return res.status(404).send({ status: false, msg: "task not found " })
        }
        return res.status(200).send({ status: true, msg: "success", data: task });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

// ==================================update task========================================= 
exports.updatetask = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let { title, description, status, dueDate } = data
        if (!id) {
            return res.status(404).send({ status: false, msg: 'please enter Id' })
        }

        if (!isValidObjectId(id)) {
            return res.status(400).send({ status: false, Msg: "please enter valid id" })
        }
        const findTaskId = await taskModel.findOne({ _id: id })
        if (!findTaskId) {
            return res.status(400).send({ status: false, msg: "task is not found" })
        }
        const task = await taskModel.findOneAndUpdate({ _id: id }, {
            $set: {
                title: data.title,
                description: data.description,
                status: data.status,
                dueDate: data.dueDate
            },
        }, { new: true });
        return res.status(200).send({ status: true, msg: "successfully updated", data: task })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

// =====================================delete task=====================================

exports.deleteTask = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(404).send({ status: false, msg: 'please enter Id' })
    }
    const findTask = await taskModel.findOne({ _id: id })
    if (!findTask) {
        return res.status(400).send({ status: false, msg: "task already deleted" })
    }
    if (!isValidObjectId(id)) {
        return res.status(400).send({ status: false, Msg: "please enter valid id" })
    }
    const taskDelete = await taskModel.findOneAndDelete({ _id: id })
    return res.status(200).send({ status: true, msg: "task successfully deleted" ,data:taskDelete})

}
