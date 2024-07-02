import {Router} from 'express';
import * as controller from './review.controller.js';
import { auth } from '../../middleware/auth.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { endPoints } from './review.role.js';
import reviewRouter from './../review/review.router.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router({mergeParams:true});

router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),asyncHandler(controller.create));
export default router;