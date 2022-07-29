import { Router } from 'express';
import { getPricesMoney } from '../controllers/coins.controller';

export var DEBUG: any = true;
const router = Router();


router.get('/api/coins/', getPricesMoney);

export default router;  