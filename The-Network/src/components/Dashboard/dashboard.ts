import { Component } from '@angular/core';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'Dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
}) 
export class Dashboard {
    constructor(private API: backendRoutes ){

    }
    helloroute(input){
        this.API.helloroute(input).subscribe((res => {
            if (res['error']){
                console.log(res['error'])
            }else {
                console.log(res);
            }
        }))
    }
}