import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const createTask = async (req, res) => {
  const { title, description, priority, dueDate, goals } = req.body;

  try {
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      user: req.user.id,
      goals,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const addContributorToGoal = async (req, res) => {
  const { taskId, goalId } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const goal = task.goals.id(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (!goal.contributor) {
      if (!task.contributors.includes(userId)) {
        task.contributors.push(userId);
      }
      goal.contributor = userId;

      await task.save();
      res.json({ message: "Contributor added to goal", goal });
    } else {
      res
        .status(400)
        .json({ message: "Goal already has a contributor assigned" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding contributor to goal", error });
  }
};

export const updateGoalStatus = async (req, res) => {
  const { taskId, goalId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const goal = task.goals.id(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (
      goal.contributor.toString() === userId ||
      task.user.toString() === userId
    ) {
      goal.status = status;
      await task.save();
      res.json({ message: "Goal status updated", goal });
    } else {
      res.status(403).json({ message: "Not authorized to update this goal" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating goal status", error });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
