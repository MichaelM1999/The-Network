import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class StockData {
    constructor(private http: HttpClient){

    }
    getStock(searchItem): Observable<object>{
        const BASEURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
        const BASEURL2 = "&outputsize=compact&apikey=";
        const APIKEY = "ZQ01F2MEZJSX8EYJ";
        let query = BASEURL + searchItem.searchInput + BASEURL2 + APIKEY;
        console.log(searchItem);
         return this.http.get(query);   
    }
    getStockAuto(searchItem): Observable<object>{
        const BASEURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
        const BASEURL2 = "&outputsize=compact&apikey=";
        const APIKEY = "ZQ01F2MEZJSX8EYJ";
        let query = BASEURL + searchItem + BASEURL2 + APIKEY;
         return this.http.get(query)
    }
}