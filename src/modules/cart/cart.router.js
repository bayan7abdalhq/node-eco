import {Router} from 'express';
import * as controller from './cart.controller.js';
import { auth } from '../../middleware/auth.js';
import { endPoints } from './cart.role.js';
const router =Router();


router.post('/',auth(endPoints.create),controller.create);
router.put('/clear',auth(endPoints.delete),controller.clearCart);
router.put('/:productId',auth(endPoints.delete),controller.remove);
router.get('/',auth(endPoints.create),controller.get);
router.put('/updateQuantity/:productId',auth(endPoints.create),controller.updateQuantity);




 export default router;