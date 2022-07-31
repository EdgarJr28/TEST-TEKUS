import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import { apiCoins } from '../config/serverCoins';
import Server from '../config/serverSockets';
import { errorValidation, errorValidationSockets } from '../libs/errorValidation';

// funcion para obtener el valor de las monedas y emitirla con socket.
export async function getPricesMoneySocket(res: Response): Promise<Response | void> {
    try {

        getPriceForMinut(true, res)
        // intervalo para emitir la data cada minuto.
        setInterval(() => getPriceForMinut(true, res), 60000)
        res.status(200).json({ conectado: true, message: "Escuchando socket." })

    } catch (e: any) {
        errorValidation(e, res);
    }
}

// funcion para obtener el valor de las monedas y enviarla al cliente con express.
export async function getPricesMoney(req: Request, res: Response): Promise<Response | void> {
    try {
        await getPriceForMinut(false, res);
    } catch (e: any) {
        errorValidation(e, res);
    }
}


// proxy APi coinbase
async function getPriceForMinut(socket: boolean, res: Response): Promise<Response | void> {
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
                    if (socket == true) {
                        console.log("socket")
                        const payload = { data }
                        server.io.emit('getPrices', payload)
                    } else {
                        console.log("express")
                        res.status(200).json({ ok: true, data: data, serveDate: Date.now() })

                    }
                }
                temp++;
            })
        } catch (e: any) {
            errorValidationSockets(e);
        }
    });
}