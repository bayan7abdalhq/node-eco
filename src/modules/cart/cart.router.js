import {Router} from 'express';
import * as controller from './cart.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './cart.role.js';
import { asyncHandler } from '../../utls/catchError.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './cart.validation.js';
const router =Router();


router.post('/',auth(endPoints.create),validation(schema.createCartSchema),asyncHandler(controller.create));
router.put('/clear',auth(endPoints.delete),asyncHandler(controller.clearCart));
router.put('/:productId',auth(endPoints.delete),asyncHandler(controller.remove));
router.get('/',auth(endPoints.create),asyncHandler(controller.get));
router.put('/updateQuantity/:productId',auth(endPoints.create),asyncHandler(controller.updateQuantity));




 export default router;