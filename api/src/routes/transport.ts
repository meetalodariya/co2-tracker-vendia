import { Router } from 'express';
import { addTransportController } from '../actions/post-transport';
import { getAllTransportsController } from '../actions/get-all-transport';

const router = Router();

import isAuth from '../middlewares/is-auth';

router.get('/transport', isAuth, getAllTransportsController);
router.post('/transport', isAuth, addTransportController);

export default router;
