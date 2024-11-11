import express from 'express';
import { getTasks, createTask, deleteTask } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.moddleware.js';

const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.delete('/:id', protect, deleteTask);

export default router;
