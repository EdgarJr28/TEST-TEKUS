import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(public http: HttpClient) { }

    server = environment.wsUrl


    getPrices() {
        console.log("la esta pidiendo")
        return this.http.get(`${this.server}/api/coins/`);
    }


}