import {Router} from 'express';
import * as controller from './user.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './user.role.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router();

router.get('/',auth(endPoints.getUsers),asyncHandler(controller.getUsers));
router.get('/userData',auth(endPoints.userData),asyncHandler(controller.getUserData));
export default router;
