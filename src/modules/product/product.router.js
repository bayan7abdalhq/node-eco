import {Router} from 'express';
import * as controller from './product.controller.js';
import fileUpload, { fileType } from '../../utls/multer.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './product.role.js';

const router =Router();

router.post('/',auth(endPoints.create),fileUpload(fileType.image).fields([
    {name:'mainImage', maxCount:1},
    {name:'subImages', maxCount:5},
]),controller.create);
export default router;