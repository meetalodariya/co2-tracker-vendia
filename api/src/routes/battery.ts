import { Router } from 'express';
import { getAllBatteriesController } from '../actions/get-all-battries';
import { updateBatteryController } from '../actions/put-battery';
import { addBatteryController } from '../actions/post-battery';

const router = Router();

import isAuth from '../middlewares/is-auth';

router.get('/battery', isAuth, getAllBatteriesController);
router.put('/battery', isAuth, updateBatteryController);
router.post('/battery', isAuth, addBatteryController);


export default router;
