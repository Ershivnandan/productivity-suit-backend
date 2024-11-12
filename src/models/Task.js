import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'progress', 'completed'], default: 'todo' },
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  goals: [GoalSchema]
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
