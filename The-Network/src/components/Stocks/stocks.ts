import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'Stocks',
    templateUrl: './stocks.html',
    styleUrls: ['./stocks.scss']
})
export class Stocks implements OnInit{
    Stocks:any
    User:any
    Defined: boolean
    ngOnInit(){
        this.User = sessionStorage.getItem('username');  
        this.Stocks = [
            {
                symbol: 'NNA',
                price:"3.45",
                notes:'very good for dividends'
            },
            {
                symbol: 'CEI',
                price:".42",
                notes:'big mistake'
            },
            {
                symbol: 'F',
                price:"5.56",
                notes:'very good for dividends protected by government'
            },
        ]
        this.Defined === true;
        console.log(this.Stocks);
    }
}