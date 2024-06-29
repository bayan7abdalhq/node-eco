import {Router} from 'express';
import * as controller from './category.controller.js';
import subcategoriesRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './category.role.js';
const router =Router();

router.use('/:id/subcategory',subcategoriesRouter);
router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),controller.create);
router.get('/',auth(endPoints.get),controller.getAll );
router.get('/active',auth(endPoints.active),controller.getActive);
router.get('/:id',auth(endPoints.get),controller.getDetails);
router.patch('/:id',auth(endPoints.create),fileUpload(fileType.image).single('image'),controller.update);
router.delete('/:id',auth(endPoints.delete),controller.destroy);
export default router;