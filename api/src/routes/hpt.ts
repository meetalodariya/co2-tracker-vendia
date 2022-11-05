import { Router } from 'express';
const router = Router();

import { getHptBySerialNumberController } from '../actions/get-hpt-by-serial';
import isAuth from '../middlewares/is-auth';

router.get('/hpt/:serialNum', isAuth, getHptBySerialNumberController);

export default router;
