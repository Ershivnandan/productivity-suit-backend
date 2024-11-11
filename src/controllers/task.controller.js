import Task  from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};


export const createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = new Task({
    title,
    description,
    priority,
    dueDate,
    user: req.user.id,
  });

  await task.save();
  res.status(201).json(task);
};


export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await task.remove();
  res.json({ message: 'Task removed' });
};


