import { request, response, Router } from 'express';
import { indexWelcome, stopProcess } from '../controllers/index.controllers';
import { body, validationResult } from 'express-validator';

// variable para habilitar por consola manejo de estados (errores y data)
export var DEBUG: any = true;
const router = Router();

router.get('/api', indexWelcome);
router.post('/api/stop/', stopProcess);

export default router;  