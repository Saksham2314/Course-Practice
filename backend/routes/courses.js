import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  enrollCourse,
} from '../controllers/courseController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, createCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);
router.post('/:id/enroll', protect, enrollCourse);

export default router;
