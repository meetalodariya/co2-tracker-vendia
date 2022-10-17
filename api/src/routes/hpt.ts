import { Router } from 'express';
const router = Router();

import { getHptBySerialNumber } from '../actions/get-hpt-by-serial';
import isAuth from '../middlewares/is-auth';

router.get('/hpt/:serialNum', isAuth, getHptBySerialNumber);

export default router;
