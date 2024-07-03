import {Router} from 'express';
import * as controller from './coupon.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './coupon.role.js';
import { asyncHandler } from '../../utls/catchError.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './coupon.validation.js';

const router =Router();

router.post('/',validation(schema.createCouponSchema),auth(endPoints.create),asyncHandler(controller.create));
export default router;