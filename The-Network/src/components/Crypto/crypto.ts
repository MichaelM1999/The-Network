import { Component } from '@angular/core';
import { CrytoData } from '../../injectables/Cryptodata';

@Component ({
    selector: 'Crypto',
    templateUrl: './crypto.html',
    styleUrls: ['./crypto.scss']
})
export class Crypto {
    constructor(private StockData:CrytoData){

    }
    handleSearch(searchItem){
        console.log(searchItem)
        this.StockData.getCrypto(searchItem).subscribe((res) => {
            console.log(res);
        })
    }

}