import express from 'express';
import {
  createUser,
  getUser
} from '../controllers/userController.js';
import validate from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/',
  validate('createUser'),
  createUser
);

router.get('/:id',
  validate('getUser'),
  getUser
);

export default router;