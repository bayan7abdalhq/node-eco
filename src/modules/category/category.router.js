import {Router} from 'express';
import * as controller from './category.controller.js';
import subcategoriesRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './category.role.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router();

router.use('/:id/subcategory',subcategoriesRouter);
router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),asyncHandler(controller.create));
router.get('/',auth(endPoints.get),asyncHandler(controller.getAll));
router.get('/active',auth(endPoints.active),asyncHandler(controller.getActive));
router.get('/:id',auth(endPoints.get),asyncHandler(controller.getDetails));
router.patch('/:id',auth(endPoints.create),fileUpload(fileType.image).single('image'),asyncHandler(controller.update));
router.delete('/:id',auth(endPoints.delete),asyncHandler(controller.destroy));
export default router;