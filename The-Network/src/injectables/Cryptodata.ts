import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ()

export class CrytoData {
    constructor(private http: HttpClient){

    }
         ISODateString(d){
        function pad(n){return n<10 ? '0'+n : n}
        return d.getUTCFullYear()+'-'
             + pad(d.getUTCMonth()+1)+'-'
             + pad(d.getUTCDate())+'T'
             + pad(d.getUTCHours())+':'
             + pad(d.getUTCMinutes())+':'
             + pad(d.getUTCSeconds())+'Z'}
       
       
       
    getCryptoWeek(searchItem): Observable<object>{
        var d = new Date();
        var FiftyDaysAgo = new Date();
        FiftyDaysAgo.setDate(FiftyDaysAgo.getDate() - 40);
        const BASEURL = "https://api.nomics.com/v1/currencies/sparkline?key=";
        const BASEURL2 = "&ids=";
        const TODAYSDATE = this.ISODateString(d);
        const STARTDATE = this.ISODateString(FiftyDaysAgo);
        console.log(STARTDATE);
        const APIKEY = "f93f4af9f98fe883e5fbac5d4d8de8b2";
        let query = BASEURL + APIKEY + BASEURL2 + searchItem.searchInput.toUpperCase( ) + "&start=" + STARTDATE + "&end=" + TODAYSDATE;
         return this.http.get(query);   
    }
}
//


// /fetch("&ids=BTC,ETH,XRP&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z")
// .then(response => response.json())
// .then(data => console.log(data))