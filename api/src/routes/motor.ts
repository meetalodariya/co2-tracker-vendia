import { Router } from 'express';
import { getAllMotorsController } from '../actions/get-all-motors';
import { updateMotorController } from '../actions/put-motor';
import { addMotorController } from '../actions/post-motor';

const router = Router();

import isAuth from '../middlewares/is-auth';

router.get('/motor', isAuth, getAllMotorsController);
router.put('/motor', isAuth, updateMotorController);
router.post('/motor', isAuth, addMotorController);

export default router;
