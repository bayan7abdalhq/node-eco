import {Router} from 'express';
import * as controller from './auth.controller.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router();


router.post('/register',checkEmail,asyncHandler(controller.register));
router.post('/login',asyncHandler(controller.login));
router.patch('/sendCode',asyncHandler(controller.sendCode));
router.patch('/forgetPassword',asyncHandler(controller.forgetPassword));
router.get('/confirmEmail/:token',asyncHandler(controller.confirmEmail));


export default router;