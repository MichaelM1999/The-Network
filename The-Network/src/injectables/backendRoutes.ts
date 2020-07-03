import { Injectable } from '@angular/core';
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
}