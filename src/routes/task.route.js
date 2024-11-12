import express from 'express';
import {
  getTasks,
  createTask,
  addContributorToGoal,
  updateGoalStatus,
  deleteTask
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getTasks);  
router.post('/createTask', protect, createTask);  
router.post('/:taskId/goals/:goalId/contributors', protect, addContributorToGoal);  
router.patch('/:taskId/goals/:goalId/status', protect, updateGoalStatus); 
router.delete('/:id', protect, deleteTask);

export default router;
