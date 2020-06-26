import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockData } from '../../injectables/stockdata';
import { Chart } from 'chart.js';

@Component({
    templateUrl:'./cryptoDetails.html'
})
export class CryptoDetailsComponent {
    public returnedStock: any
    crypto:any
    chart = [];
    chart2 =[];
    constructor( private stockSearch: StockData,
        private route:ActivatedRoute) {

    }
    ngOnInit() {
        this.crypto = (this.route.snapshot.params['name'])
        this.cryptoInfo(this.crypto)
    } 
    cryptoInfo (searchValue){
        
    }
}