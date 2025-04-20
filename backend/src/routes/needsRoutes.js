import express from 'express';
import {
  createNeeds,
  getUserNeeds,
  getNeedsById,
  updateNeeds,
  deleteNeeds,
} from '../controllers/needsController.js';

const router = express.Router();

router.route('/')
  .post(createNeeds)
  .get(getUserNeeds);

router.route('/:id')
  .get(getNeedsById)
  .put(updateNeeds)
  .delete(deleteNeeds);

export default router;
