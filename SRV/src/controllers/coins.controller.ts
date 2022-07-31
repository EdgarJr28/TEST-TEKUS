import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import { apiCoins } from '../config/serverCoins';
import Server from '../config/serverSockets';
import { errorValidation, errorValidationSockets } from '../libs/errorValidation';

// funcion para obtener el valor de las monedas.
export async function getPricesMoney(req: Request, res: Response): Promise<Response | void> {
    try {

        getPriceForMinut()
        setInterval(() => getPriceForMinut(), 60000)
        res.status(200).json({ conectado: true, message: "Escuchando socket." })

    } catch (e: any) {
        errorValidation(e, res);
    }
}


function getPriceForMinut() {
    const server = Server.instance;
    const moneys = ["USD", "EUR", "COP"]
    const data: any = [];
    let temp: number = 1;
    moneys.map(async function (x) {
        try {
            await apiCoins.get(`prices/BTC-${x}/sell`).catch((err) => {
                console.error(err.message);
            }).then((result: any) => {
                const fullData = result.data.data
                data.push(fullData);
                if (temp >= moneys.length) {
                    const payload = { data }
                    server.io.emit('getPrices', payload)
                }
                temp++;
            })
        } catch (e: any) {
            errorValidationSockets(e);
        }
    });
}