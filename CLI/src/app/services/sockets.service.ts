import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { io, Manager } from "socket.io-client";


const manager = new Manager("localhost:3000", {
    reconnectionDelayMax: 10000,
    query: {
        "my-key": "my-value"
    }
});

const socket = io("http://localhost:3000", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": ""
    }
});

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    messages?: Subject<any>;

    constructor(public wsService: WebsocketService) { }


    emitirUsuariosActivos() {
        return this.wsService.emit('obtener-usuarios');
    }
    obtenerPrecios() {
        return this.wsService.listen('getPrices');
    }

    connect() {
        return socket.on("connect", () => {
            console.log(socket.connected); // true
        });
    }

}   
