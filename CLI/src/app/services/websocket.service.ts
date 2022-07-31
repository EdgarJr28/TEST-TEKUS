import { Injectable } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io, Manager } from "socket.io-client";





@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public socketStatus = false;
    private socket = io(environment.wsUrl, {
        reconnectionDelayMax: 10000,
        extraHeaders: {
            "my-custom-header": "CLI"
        }
    });
    constructor(
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
        return this.socket.on(evento, (res: any) => {
            return res;
        });
    }

    on(evento: string) {
        this.socket.on(evento, (res: any) => {
            return res;
        })
    }
}
