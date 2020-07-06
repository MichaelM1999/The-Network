import { Component, OnInit } from '@angular/core';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'Stocks',
    templateUrl: './stocks.html',
    styleUrls: ['./stocks.scss']
})
export class Stocks implements OnInit{
    constructor(private API:backendRoutes){

    }
    Stocks:any
    User:any
    Defined: boolean
    ngOnInit(){
        this.User = sessionStorage.getItem('username');  
        this.API.getFollowedStocks("getting Followed Stocks").subscribe((res => {
            let results = res
            if ( results[0] === undefined){
                this.Defined = false
            } else {
                this.Stocks = res;
                this.Defined = true
            }
        }))
    }
}