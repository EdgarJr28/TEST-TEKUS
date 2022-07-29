import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import { errorValidation } from '../libs/errorValidation';

// funcion para prueba de que la api esta en funcionamiento.
export function indexWelcome(req: Request, res: Response): Response | void {
  try {
    console.log("Entro")
    return res.status(200).json({ ok: true, message: 'Welcome to the Api ;)' });
  } catch (e: any) {
    errorValidation(e, res);
  }

}


// funcion para detenr la api (por si hay problemas para detenerla en el servidor).
export async function stopProcess(req: Request, res: Response): Promise<Response | void> {
  try {
    const app = req.body.app;
    if (app.toLowerCase() == "close") console.log(`---- STOPED PROCESS ----`), process.exit(0); else res.json({ ok: false })
  } catch (e: any) {
    errorValidation(e, res);
  }
}