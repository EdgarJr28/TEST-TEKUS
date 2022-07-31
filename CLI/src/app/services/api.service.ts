import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(public http: HttpClient) { }

    server = "http://localhost:3000"


    getDates(id: any) {
        return this.http.get(`${this.server}/venta/${id}`);
    }


}