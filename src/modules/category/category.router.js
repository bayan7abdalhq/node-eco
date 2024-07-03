import {Router} from 'express';
import * as controller from './category.controller.js';
import subcategoriesRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './category.role.js';
import { asyncHandler } from '../../utls/catchError.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './category.validation.js';

const router =Router();

router.use('/:id/subcategory',subcategoriesRouter);
router.post('/',fileUpload(fileType.image).single('img'),validation(schema.createCategorySchema),auth(endPoints.create),asyncHandler(controller.create));
router.get('/',auth(endPoints.get),asyncHandler(controller.getAll));
router.get('/active',auth(endPoints.active),asyncHandler(controller.getActive));
router.get('/:id',validation(schema.getDetailsSchema),auth(endPoints.get),asyncHandler(controller.getDetails));
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(schema.updateSchema),auth(endPoints.create),asyncHandler(controller.update));
router.delete('/:id',auth(endPoints.delete),validation(schema.deleteCategorySchema),asyncHandler(controller.destroy));
export default router;