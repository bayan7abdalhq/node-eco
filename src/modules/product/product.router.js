import {Router} from 'express';
import * as controller from './product.controller.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './product.role.js';
import reviewRouter from './../review/review.router.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router();

router.use('/:productId/review',reviewRouter)
router.post('/',auth(endPoints.create),fileUpload(fileType.image).fields([
    {name:'mainImage', maxCount:1},
    {name:'subImages', maxCount:5},
]),asyncHandler(controller.create));

router.get('/',asyncHandler(controller.getProducts));
export default router;