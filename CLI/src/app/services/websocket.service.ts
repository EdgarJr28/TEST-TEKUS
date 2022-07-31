import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RouterModule, Routes, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public socketStatus = false;
    constructor(
        private socket: Socket,
        private router: Router

    ) {
        this.checkStatus();
    }
    
    checkStatus() {
        this.socket.on('connect', () => {
            console.log(`conectado al servidor`)
            this.socketStatus = true;
        })


        this.socket.on('disconnect', () => {
            console.log(`desconectado del servidor`)
            this.socketStatus = false;
        })
    }

    emit(evento: string, payload?: any, callback?: Function) {
        this.socket.emit(evento, payload, callback)
    }

    listen(evento: string) {
        return this.socket.fromEvent(evento);
    }

}
