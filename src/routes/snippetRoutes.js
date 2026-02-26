import express from 'express';
import {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
} from '../controllers/snippetController.js';
import { snippetValidator } from '../validators/snippetValidators.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
//proteccion de rutas
router.use(protect);

router
  .route('/')
  .post(snippetValidator, createSnippet)
  .get(getSnippets);

router
  .route('/:id')
  .put(snippetValidator, updateSnippet)
  .delete(deleteSnippet);

export default router;
