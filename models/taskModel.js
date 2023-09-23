const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress',
  },
  dueDate: Date,
  userId: {
    type: objectId,
    required: true,
    ref: "user",
    trim: true,
  },
},{timestamps:true});

module.exports = mongoose.model('Task', taskSchema);


