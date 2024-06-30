import {Router} from 'express';
import * as controller from './cart.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './cart.role.js';
const router =Router();


router.post('/',auth(endPoints.create),controller.create);
 export default router;