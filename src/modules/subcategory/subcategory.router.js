import {Router} from 'express';
import * as controller  from './subcategory.controller.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utls/catchError.js';
const router =Router({mergeParams:true});

router.post('/',auth(['Admin']),fileUpload(fileType.image).single('image'),asyncHandler(controller.create));
router.get('/',asyncHandler(controller.getAll));
router.get('/active',asyncHandler(controller.getActive));
router.get('/:id',asyncHandler(controller.getDetails));
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),asyncHandler(controller.update));
router.delete('/:id',auth(),asyncHandler(controller.destroy));

export default router;