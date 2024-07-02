import {Router} from 'express';
import * as controller from './order.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './order.role.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router();

router.post('/',auth(endPoints.create),asyncHandler(controller.create));
router.get('/all',auth(endPoints.all),asyncHandler(controller.getOrders));
router.get('/userOrders',auth(endPoints.getOrder),asyncHandler(controller.getUserOrders));
router.patch('/changeStatus/:orderId',auth(endPoints.changeStatus),asyncHandler(controller.changeStatus));
export default router;