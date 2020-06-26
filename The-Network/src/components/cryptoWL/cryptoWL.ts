import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'CryptoWL',
    templateUrl: './cryptoWL.html',
    styleUrls: ['./cryptoWL.scss'],
})
export class CryptoWL implements OnInit{
    Cryptos:any
    User:any
    Defined: boolean
    ngOnInit(){
        this.User = sessionStorage.getItem('username');  
        this.Cryptos = [
            {
                symbol: 'BTC',
                price:"3.45",
                notes:'very good for dividends'
            },
            {
                symbol: 'ETH',
                price:".42",
                notes:'big mistake'
            },
            {
                symbol: 'XRP',
                price:"5.56",
                notes:'very good for dividends protected by government'
            },
        ]
        this.Defined === true;
        console.log(this.Cryptos);
    }
}