import {Router} from 'express';
import * as controller from './product.controller.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './product.role.js';
import reviewRouter from './../review/review.router.js';
import { asyncHandler } from '../../utls/catchError.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './product.validation.js';
const router =Router();

router.use('/:productId/review',reviewRouter)
router.post('/',fileUpload(fileType.image).fields([
    {name:'image', maxCount:1},
    {name:'subImages', maxCount:5},
]),validation(schema.createProductSchema),auth(endPoints.create),asyncHandler(controller.create));

router.get('/',asyncHandler(controller.getProducts));
export default router;