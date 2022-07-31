import { Router } from 'express';
import { getPricesMoney, getPricesMoneySocket } from '../controllers/coins.controller';

export var DEBUG: any = true;
const router = Router();


router.get('/api/socket/coins/', getPricesMoneySocket) // endpoint para emitir la data a todos los clientes mediante socket.
router.get('/api/coins/', getPricesMoney); // endpoint para resivir respuesta del servidor con la data.

export default router;  