import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ()

export class backendRoutes {
    uri = "http://localhost:4202"

    constructor(private http: HttpClient){

    }
    helloroute(input){
        return this.http.post(this.uri + `/api/user/hello`, input);
    }
    loginRoute(user) {
        return this.http.post(this.uri + `/api/user/login`, user);
    }
    getFollowedStocks(info) {
        return this.http.post(this.uri + `/api/stocks/find`, info);
    }
    followStock(Stock) {
        console.log(Stock);
        return this.http.post(this.uri + `/api/stocks/add`, Stock);
    }
    followCrypto(CRYPTO) {
        console.log(CRYPTO);
        return this.http.post(this.uri + `/api/crypto/add`, CRYPTO);
    }
}