import {Router} from 'express';
import * as controller from './category.controller.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
const router =Router();


router.post('/',auth(),fileUpload(fileType.image).single('image'),controller.create);
router.get('/',controller.getAll );
router.get('/active',controller.getActive);
router.get('/:id',controller.getDetails);
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),controller.update);
router.delete('/:id',auth(),controller.destroy);
export default router;