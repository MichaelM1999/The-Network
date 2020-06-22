import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ()

export class CrytoData {
    constructor(private http: HttpClient){

    }

    getCrypto(searchItem): Observable<object>{
        var today = new Date();
        today.toISOString().substring(0, 10);
        const BASEURL = "https://api.nomics.com/v1/currencies/sparkline?key=";
        const BASEURL2 = "&ids=";
        const STARTDATE = today + "T00%3A00%3A00Z";
        const APIKEY = "f93f4af9f98fe883e5fbac5d4d8de8b2";
        let query = BASEURL + APIKEY + BASEURL2 + searchItem.searchInput + "&start=" + STARTDATE;
         return this.http.get(query);   
    }
}


// /fetch("&ids=BTC,ETH,XRP&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z")
// .then(response => response.json())
// .then(data => console.log(data))