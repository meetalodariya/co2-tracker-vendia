import { Router } from 'express';
const router = Router();

import { getHptBySerialNumberController } from '../actions/get-hpt-by-serial';
import { addHptController } from '../actions/post-hpt';
import isAuth from '../middlewares/is-auth';

router.get('/hpt/:serialNum', isAuth, getHptBySerialNumberController);
router.post('/hpt', isAuth, addHptController);

export default router;
