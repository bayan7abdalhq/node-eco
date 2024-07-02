import {Router} from 'express';
import * as controller from './auth.controller.js';
import { checkEmail } from '../../middleware/checkEmail.js';
const router =Router();


router.post('/register',checkEmail,controller.register);
router.post('/login',controller.login);
router.patch('/sendCode',controller.sendCode);
router.patch('/forgetPassword',controller.forgetPassword);
router.get('/confirmEmail/:token',controller.confirmEmail);


export default router;