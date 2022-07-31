import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../models/usuario';
import { apiCoins } from '../config/serverCoins';
import { errorValidationSockets } from './errorValidation';


export const usuariosConectados = new UsuariosLista();



export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id)
    usuariosConectados.agregar(usuario)

}


export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });

}


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });

}

// Escuchar mensajes
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {


        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })

    });

}

// obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });

}

export const obtenerPrecios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtenerPrecios', () => {
        console.log("enviado a ", cliente.id)
        getPriceForMinut(io, cliente.id)
        setInterval(() => getPriceForMinut(io, cliente.id), 60000)
    });

}
export const errorConexSocket = (cliente: Socket, io: socketIO.Server) => {
    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}


function getPriceForMinut(io: socketIO.Server, id: any) {

    const moneys = ["USD", "EUR", "COP"]
    const data: any = [];
    let temp: number = 1;
    moneys.map(async function (x) {
        try {
            await apiCoins.get(`prices/BTC-${x}/sell`).catch((err: any) => {
                console.error(err.message);
            }).then((result: any) => {
                const fullData = result.data.data
                data.push(fullData);
                if (temp >= moneys.length) {
                    const payload = { data }
                    io.to(id).emit('getPrices', payload)
                }
                temp++;
            })
        } catch (e: any) {
            errorValidationSockets(e);
        }
    });
}