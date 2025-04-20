import express from 'express';
import {
  createDesign,
  getUserDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
  provideFeedback,
} from '../controllers/designController.js';

const router = express.Router();

router.route('/')
  .post(createDesign)
  .get(getUserDesigns);

router.route('/:id')
  .get(getDesignById)
  .put(updateDesign)
  .delete(deleteDesign);

router.route('/:id/feedback')
  .post(provideFeedback);

export default router;
