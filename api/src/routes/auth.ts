import { Router } from 'express';
const router = Router();

import { signInUserController } from '../actions/post-user-signin';

router.post('/user/signin', signInUserController);

export default router;
