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
        return this.wsService.listen('getPrices');
    }

    connect() {
        return this.wsService.on("connect")
    }

}   
