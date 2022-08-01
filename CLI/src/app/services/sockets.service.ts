import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';

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
        console.log(this.wsService.on("obtenerPrecios"))
        return this.wsService.on("obtenerPrecios")
    }

    connect() {
        //return this.wsService.on("connect")
    }

}   
