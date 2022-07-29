import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import { apiCoins } from '../config/serverCoins';
import { errorValidation } from '../libs/errorValidation';

// funcion para obtener el valor de las monedas.
export async function getPricesMoney(req: Request, res: Response): Promise<Response | void> {
    try {
        const moneys = ["USD", "EUR", "COP"]
        const data: any = [];
        let temp: number = 1;

        moneys.map(async function (x) {
            try {
                await apiCoins.get(`prices/BTC-${x}/sell`).catch((err) => {
                    console.error(err);
                }).then((result: any) => {
                    const fullData = result.data.data
                    data.push(fullData);

                    if (temp >= moneys.length) {
                        return res.status(200).json({ ok: true, data })
                    }
                    temp++;
                })
            } catch (e: any) {
                errorValidation(e, res);
            }
        });
    } catch (e: any) {
        errorValidation(e, res);
    }
}