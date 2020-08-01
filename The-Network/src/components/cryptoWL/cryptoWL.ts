import { Component, OnInit } from '@angular/core';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'CryptoWL',
    templateUrl: './cryptoWL.html',
    styleUrls: ['./cryptoWL.scss'],
})
export class CryptoWL implements OnInit{
    constructor(private API:backendRoutes){

    }
    Cryptos:any
    User:any
    Defined: boolean
    ngOnInit(){
        this.User = sessionStorage.getItem('username');  
        this.API.getFollowedCrypto("getting Followed Cryptos").subscribe((res => {
            let results = res
            if ( results[0] === undefined){
                this.Defined = false
            } else {
                this.Cryptos = res;
                this.Defined = true
            }
        }))
    }
}